

import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IIndividualRelationshipStrategyService } from "@/modules/individual-relationship-strategy/domain/interfaces/individual-relationship-strategy-service.interface";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";

const getIndividualRelationshipStrategyService = () => resolve<IIndividualRelationshipStrategyService>(SERVICE_KEYS.IndividualRelationshipStrategyService);
const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);

export async function createStrategyHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const allStudents = await getStudentService().getAllStudents();
        const savedStrategy = await getIndividualRelationshipStrategyService().generateAndCreateStrategy(body.student, allStudents, body.language, body.focus, body.customPrompt);
        return NextResponse.json(savedStrategy);
    } catch (error: any) {
        console.error('API Error: Failed to generate individual relationship strategy', error);
        return NextResponse.json({ message: error.message || 'Failed to generate strategy' }, { status: 500 });
    }
}

export async function adjustStrategyHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
     try {
        const body = await request.json();
        const allStudents = await getStudentService().getAllStudents();
        const student = allStudents.find(s => s.id === body.existingStrategy.studentId);
        if (!student) {
             return NextResponse.json({ message: 'Student not found' }, { status: 404 });
        }
        const adjustedStrategy = await getIndividualRelationshipStrategyService().adjustStrategy(student, allStudents, body.language, body.existingStrategy, body.customPrompt);
        return NextResponse.json(adjustedStrategy);
    } catch (error: any) {
        console.error('API Error: Failed to adjust individual relationship strategy', error);
        return NextResponse.json({ message: error.message || 'Failed to adjust strategy' }, { status: 500 });
    }
}

export async function getStrategiesForStudentHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
        return NextResponse.json({ message: 'studentId parameter is required' }, { status: 400 });
    }

    try {
        const strategies = await getIndividualRelationshipStrategyService().getStrategiesForStudent(studentId);
        return NextResponse.json(strategies);
    } catch (error: any) {
        console.error(`API Error: Failed to get strategies for student ${studentId}`, error);
        return NextResponse.json({ message: error.message || 'Failed to get strategies' }, { status: 500 });
    }
}

export async function updateStrategyHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        const data = await request.json();
        const updatedStrategy = await getIndividualRelationshipStrategyService().updateStrategy(id, data);
        if (!updatedStrategy) {
            return NextResponse.json({ message: 'Strategy not found' }, { status: 404 });
        }
        return NextResponse.json(updatedStrategy);
    } catch (error: any) {
        console.error('API Error: Failed to update strategy', error);
        return NextResponse.json({ message: error.message || 'Failed to update strategy' }, { status: 500 });
    }
}

export async function updateStepHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const strategyId = params.id as string;
        const stepIndex = params.stepIndex as string;
        const details = await request.json();
        const updatedPlan = await getIndividualRelationshipStrategyService().updateStepDetails(strategyId, parseInt(stepIndex, 10), details);
        if (!updatedPlan) {
            return NextResponse.json({ message: "Strategy or step not found" }, { status: 404 });
        }
        return NextResponse.json(updatedPlan);
    } catch (error: any) {
        console.error('API Error: Failed to update strategy step', error);
        return NextResponse.json({ message: error.message || 'Failed to update step' }, { status: 500 });
    }
}


export async function deleteStrategyHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        await getIndividualRelationshipStrategyService().deleteStrategy(id);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error(`API Error: Failed to delete individual relationship strategy`, error);
        return NextResponse.json({ message: error.message || 'Failed to delete strategy' }, { status: 500 });
    }
}
