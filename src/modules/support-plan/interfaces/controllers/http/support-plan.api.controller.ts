
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ISupportPlanService } from "@/modules/support-plan/domain/interfaces/support-plan-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";

const getSupportPlanService = () => resolve<ISupportPlanService>(SERVICE_KEYS.SupportPlanService);
const getAiConfigService = () => resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);

const observationLimits = {
    low: 5,
    medium: 10,
    high: 15
};

export async function generateAndCreateSupportPlanHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const config = await getAiConfigService().getConfiguration();
        const limit = observationLimits[config?.analysisLevel || 'medium'];

        const filteredObservations = (body.observations as ObservationDTO[]).slice(0, limit);
        
        const student = body.student as StudentDTO;
        if (student.challengeHistory) {
            student.challengeHistory = student.challengeHistory.slice(0, limit);
        }
        
        const newPlan = await getSupportPlanService().generateAndCreateSupportPlan({
            ...body,
            student: student,
            observations: filteredObservations,
        });
        return NextResponse.json(newPlan, { status: 201 });
    } catch (error: any) {
        console.error('API Error: Failed to generate and create support plan', error);
        return NextResponse.json({ message: error.message || 'Failed to process support plan' }, { status: 500 });
    }
}

export async function createSupportPlanHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const newPlan = await getSupportPlanService().createSupportPlan(body);
        return NextResponse.json(newPlan, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function getSupportPlansForStudentHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const plans = await getSupportPlanService().getSupportPlansForStudent(params.id as string);
        return NextResponse.json(plans);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function addFeedbackToPlanHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const body = await request.json();
        const updatedPlan = await getSupportPlanService().addFeedbackToPlan(params.id as string, body.teacherFeedback);
        if (!updatedPlan) {
            return NextResponse.json({ message: "Plan not found" }, { status: 404 });
        }
        return NextResponse.json(updatedPlan);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function deleteSupportPlanHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        await getSupportPlanService().deleteSupportPlan(params.id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function updateStepDetailsHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        const stepIndex = params.stepIndex as string;
        const details = await request.json();
        
        const updatedPlan = await getSupportPlanService().updateStepDetails(id, parseInt(stepIndex, 10), details);
        
        if (!updatedPlan) {
            return NextResponse.json({ message: "Plan or step not found" }, { status: 404 });
        }

        return NextResponse.json(updatedPlan);

    } catch (error: any) {
        console.error('API Error: Failed to update support plan step', error);
        return NextResponse.json({ message: error.message || 'Failed to update step' }, { status: 500 });
    }
}
