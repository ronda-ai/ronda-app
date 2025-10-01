
import { NextResponse, type NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";

const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);

interface Params {
    publicId: string;
}

export async function getPublicStudentHandler(request: NextRequest, context: { params: Params }) {
    try {
        const student = await getStudentService().getStudentByPublicId(context.params.publicId);

        if (!student) {
            return NextResponse.json({ message: "Student not found or link has expired." }, { status: 404 });
        }

        // To display relationship names, we need the full student list.
        const allStudents = await getStudentService().getAllStudents();
        const studentMap = new Map(allStudents.map(s => [s.id, s.name]));

        // Replace IDs with names
        const enrichedStudent = {
            ...student,
            goodRelations: student.goodRelations?.map(id => studentMap.get(id)).filter(Boolean) as string[],
            badRelations: student.badRelations?.map(id => studentMap.get(id)).filter(Boolean) as string[],
        };

        return NextResponse.json(enrichedStudent);

    } catch (error: any) {
        console.error('API Error: Failed to get public student profile', error);
        return NextResponse.json({ message: error.message || 'Failed to retrieve profile' }, { status: 500 });
    }
}
