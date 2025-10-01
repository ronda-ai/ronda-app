

import { NextResponse, type NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { weightedRandomSelection } from "@/ai/flows/weighted-random-selection";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { IAnonymizationService } from '@/modules/shared/domain-types/anonymization-service.interface';

const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);
const getAnonymizationService = () => resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);


export async function getAllStudentsHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const students = await getStudentService().getAllStudents();
        return NextResponse.json(students);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function createStudentHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const newStudent = await getStudentService().createStudent(body);
        return NextResponse.json(newStudent, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function getStudentByIdHandler(request: NextRequest, authUser: AuthenticatedUserPayload, context: GenericRouteContext) {
    try {
        const studentId = context.params.id as string;
        const student = await getStudentService().getStudentById(studentId);
        if (!student) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }
        return NextResponse.json(student);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function updateStudentHandler(request: NextRequest, authUser: AuthenticatedUserPayload, context: GenericRouteContext) {
    try {
        const studentId = context.params.id as string;
        const body = await request.json();
        const updatedStudent = await getStudentService().updateStudent(studentId, body);
        if (!updatedStudent) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }
        return NextResponse.json(updatedStudent);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function deleteStudentHandler(request: NextRequest, authUser: AuthenticatedUserPayload, context: GenericRouteContext) {
    try {
        const studentId = context.params.id as string;
        await getStudentService().deleteStudent(studentId);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function shareStudentProfileHandler(request: NextRequest, authUser: AuthenticatedUserPayload, context: GenericRouteContext) {
    try {
        const studentId = context.params.id as string;
        const { duration } = await request.json();
        const publicId = await getStudentService().generatePublicId(studentId, duration);
        if (!publicId) {
            return NextResponse.json({ message: "Student not found or failed to generate ID" }, { status: 404 });
        }
        const student = await getStudentService().getStudentById(studentId);
        return NextResponse.json({ 
            publicId, 
            publicIdExpiresAt: student?.publicIdExpiresAt, 
            publicIdViewed: student?.publicIdViewed,
            isUniqueViewActive: student?.isUniqueViewActive,
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function getWeightedRandomStudentHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const { studentNames, participationCounts } = body;

        const { anonymizedData: anonymizedStudentNames, mapping } = getAnonymizationService().anonymize(studentNames, []);

        const result = await weightedRandomSelection({
            studentNames: anonymizedStudentNames,
            participationCounts: participationCounts,
        });
        
        const realName = mapping.get(result.selectedStudent);

        if (!realName) {
            console.error('AI returned an invalid alias:', result.selectedStudent);
            const fallbackStudent = studentNames[Math.floor(Math.random() * studentNames.length)];
             return NextResponse.json({ selectedStudent: fallbackStudent });
        }
        
        return NextResponse.json({ selectedStudent: realName });

    } catch (error: any) {
        console.error('API Error: Failed to get weighted random student', error);
        return NextResponse.json({ message: error.message || 'Failed to get weighted random student' }, { status: 500 });
    }
}
