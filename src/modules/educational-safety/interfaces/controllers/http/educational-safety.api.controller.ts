

import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { NextRequest, NextResponse } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IEducationalSafetyService } from "@/modules/educational-safety/domain/interfaces/educational-safety-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";

const getEducationalSafetyService = () => resolve<IEducationalSafetyService>(SERVICE_KEYS.EducationalSafetyService);
const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);

// --- Risk Map Handlers ---
export async function generateRiskMapHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const result = await getEducationalSafetyService().generateAndSaveRiskMap(body);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate risk map', error);
        return NextResponse.json({ message: error.message || 'Failed to generate risk map' }, { status: 500 });
    }
}

export async function getAllRiskMapsHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const results = await getEducationalSafetyService().getAllRiskMaps();
        return NextResponse.json(results);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function deleteRiskMapHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        await getEducationalSafetyService().deleteRiskMap(id);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


// --- Protocol Handlers ---
export async function generateProtocolHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const result = await getEducationalSafetyService().generateAndSaveProtocol(body);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate protocol', error);
        return NextResponse.json({ message: error.message || 'Failed to generate protocol' }, { status: 500 });
    }
}

export async function getAllProtocolsHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const results = await getEducationalSafetyService().getAllProtocols();
        return NextResponse.json(results);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function deleteProtocolHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        await getEducationalSafetyService().deleteProtocol(id);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


// --- Crisis Scenario Handlers ---

export async function generateCrisisScenarioHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const { students, ...rest } = body;
        
        let studentData = [];
        if (students && students.length > 0) {
            const studentIds = students.map((s: any) => s.id);
            const studentService = getStudentService();
            studentData = await Promise.all(studentIds.map((id: string) => studentService.getStudentById(id)));
        }

        const result = await getEducationalSafetyService().generateCrisisScenario({ ...rest, students: studentData });
        
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate crisis scenario', error);
        if (error.cause?.status === 503) {
             return NextResponse.json({ message: 'The AI model is currently overloaded. Please try again later.' }, { status: 503 });
        }
        return NextResponse.json({ message: error.message || 'Failed to generate scenario' }, { status: 500 });
    }
}

export async function getAllCrisisScenariosHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const scenarios = await getEducationalSafetyService().getAllCrisisScenarios();
        return NextResponse.json(scenarios);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function deleteCrisisScenarioHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        await getEducationalSafetyService().deleteCrisisScenario(id);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

    
