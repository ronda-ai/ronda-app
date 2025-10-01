

import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IDigitalConvivialityService } from "@/modules/digital-conviviality/domain/interfaces/digital-conviviality-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";

const getDigitalConvivialityService = () => resolve<IDigitalConvivialityService>(SERVICE_KEYS.DigitalConvivialityService);
const getAiConfigService = () => resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);

export async function createActivityHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const aiConfig = await getAiConfigService().getConfiguration();
        
        const activity = await getDigitalConvivialityService().generateAndCreateActivity({
            language: body.language,
            activityType: body.activityType,
            ageOrGrade: aiConfig?.ageOrGrade,
            classInterests: aiConfig?.classInterests,
            customPrompt: body.customPrompt
        });
        
        return NextResponse.json(activity);
    } catch (error: any) {
        console.error('API Error: Failed to generate digital conviviality activity', error);
        return NextResponse.json({ message: error.message || 'Failed to generate activity' }, { status: 500 });
    }
}

export async function getAllActivitiesHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const activities = await getDigitalConvivialityService().getAllActivities();
        return NextResponse.json(activities);
    } catch (error: any) {
        console.error('API Error: Failed to get digital conviviality activities', error);
        return NextResponse.json({ message: error.message || 'Failed to get activities' }, { status: 500 });
    }
}

export async function deleteActivityHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        if (!id) {
            return NextResponse.json({ message: 'Activity ID is missing' }, { status: 400 });
        }
        await getDigitalConvivialityService().deleteActivity(id);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete activity', error);
        return NextResponse.json({ message: error.message || 'Failed to delete activity' }, { status: 500 });
    }
}


// --- Conflict Scenarios ---

export async function generateConflictScenarioHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const aiConfig = await getAiConfigService().getConfiguration();

        const scenario = await getDigitalConvivialityService().generateAndCreateConflictScenario({
            language: body.language,
            ageOrGrade: aiConfig?.ageOrGrade,
            topics: body.topics,
        });

        return NextResponse.json(scenario);
    } catch (error: any) {
        console.error('API Error: Failed to generate digital conflict scenario', error);
        return NextResponse.json({ message: error.message || 'Failed to generate scenario' }, { status: 500 });
    }
}

export async function getAllScenariosHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const scenarios = await getDigitalConvivialityService().getAllScenarios();
        return NextResponse.json(scenarios);
    } catch (error: any) {
        console.error('API Error: Failed to get scenarios', error);
        return NextResponse.json({ message: error.message || 'Failed to get scenarios' }, { status: 500 });
    }
}

export async function deleteScenarioHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        await getDigitalConvivialityService().deleteScenario(id);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete scenario', error);
        return NextResponse.json({ message: error.message || 'Failed to delete scenario' }, { status: 500 });
    }
}

// --- Digital Pacts ---

export async function createPactHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const aiConfig = await getAiConfigService().getConfiguration();

        const pact = await getDigitalConvivialityService().generateAndCreatePact({
            language: body.language,
            studentCount: body.studentCount,
            ageOrGrade: aiConfig?.ageOrGrade,
            classInterests: aiConfig?.classInterests,
            mainConcerns: body.mainConcerns,
        });

        return NextResponse.json(pact);

    } catch (error: any) {
        console.error('API Error: Failed to generate digital pact', error);
        return NextResponse.json({ message: error.message || 'Failed to generate pact' }, { status: 500 });
    }
}

export async function getAllPactsHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const pacts = await getDigitalConvivialityService().getAllPacts();
        return NextResponse.json(pacts);
    } catch (error: any) {
        console.error('API Error: Failed to get digital pacts', error);
        return NextResponse.json({ message: error.message || 'Failed to get pacts' }, { status: 500 });
    }
}

export async function deletePactHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        await getDigitalConvivialityService().deletePact(id);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete pact', error);
        return NextResponse.json({ message: error.message || 'Failed to delete pact' }, { status: 500 });
    }
}

export async function updatePactHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        const body = await request.json();
        const updatedPact = await getDigitalConvivialityService().updatePact(id, body);
        return NextResponse.json(updatedPact);
    } catch (error: any) {
        console.error('API Error: Failed to update pact', error);
        return NextResponse.json({ message: error.message || 'Failed to update pact' }, { status: 500 });
    }
}

export async function publishPactHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        const publishedPact = await getDigitalConvivialityService().publishPact(id);
        return NextResponse.json(publishedPact);
    } catch (error: any) {
        console.error('API Error: Failed to publish pact', error);
        return NextResponse.json({ message: error.message || 'Failed to publish pact' }, { status: 500 });
    }
}
