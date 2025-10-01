

import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IManualGroupActivityService } from "@/modules/manual-group-activity/domain/interfaces/manual-group-activity-service.interface";
import { adaptManualGroupActivity } from "@/modules/curriculum-activity/interfaces/controllers/http/activity-adaptation.api.controller";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";
import { generateGroupCurriculumActivities } from "@/ai/flows/generate-group-curriculum-activities";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

const getManualGroupActivityService = () => resolve<IManualGroupActivityService>(SERVICE_KEYS.ManualGroupActivityService);
const getAiConfigService = () => resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);
const getAnonymizationService = () => resolve<IAnonymizationService>(SERVICE_KEYS.AnonymizationService);

export async function createGroupHandler(request: Request) {
    try {
        const body = await request.json();
        const newGroup = await getManualGroupActivityService().createManualGroupActivity(body);
        return NextResponse.json(newGroup, { status: 201 });
    } catch (error: any) {
        console.error('API Error: Failed to create manual group', error);
        return NextResponse.json({ message: error.message || 'Failed to create manual group' }, { status: 400 });
    }
}

export async function getAllGroupsHandler(request: Request) {
    try {
        const groups = await getManualGroupActivityService().getAllManualGroupActivities();
        return NextResponse.json(groups);
    } catch (error: any) {
        console.error('API Error: Failed to get manual groups', error);
        return NextResponse.json({ message: error.message || 'Failed to get manual groups' }, { status: 500 });
    }
}

export async function updateGroupHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const body = await request.json();
        const updatedGroup = await getManualGroupActivityService().updateManualGroupActivity(params.id as string, body);
        if (!updatedGroup) {
            return NextResponse.json({ message: 'Group not found' }, { status: 404 });
        }
        return NextResponse.json(updatedGroup);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function deleteGroupHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        await getManualGroupActivityService().deleteManualGroupActivity(params.id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function adaptActivityHandler(request: NextRequest) {
    try {
        const body = await request.json();
        const { group, adaptationType, language } = body;
        return adaptManualGroupActivity(request);

    } catch (error: any) {
        console.error('API Error: Failed to adapt group activity', error);
        return NextResponse.json({ message: error.message || 'Failed to adapt group activity' }, { status: 500 });
    }
}

export async function generateGroupActivityHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const { group, language } = body;

    const updatedGroup = await getManualGroupActivityService().generateActivitiesForGroup(group.id, language);

    if (!updatedGroup) {
        return NextResponse.json({ message: 'Group not found or activity generation failed' }, { status: 404 });
    }
    
    return NextResponse.json(updatedGroup);
  } catch (error: any) {
    console.error('API Error: Failed to generate group activity', error);
    return NextResponse.json({ message: error.message || 'Failed to generate activity' }, { status: 500 });
  }
}
