

import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ICurriculumActivityService } from "@/modules/curriculum-activity/domain/interfaces/curriculum-activity-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IPersonalizedActivityService } from "@/modules/personalized-activity/domain/interfaces/personalized-activity-service.interface";

const getCurriculumActivityService = () => resolve<ICurriculumActivityService>(SERVICE_KEYS.CurriculumActivityService);
const getPersonalizedActivityService = () => resolve<IPersonalizedActivityService>(SERVICE_KEYS.PersonalizedActivityService);
const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);


export async function createActivitiesHandler(request: Request) {
    try {
        const body = await request.json();
        
        if (body.student) {
            const result = await getPersonalizedActivityService().generateAndCreatePersonalizedActivity(body);
            return NextResponse.json(result);
        } else {
             const result = await getCurriculumActivityService().generateAndCreateActivities(body);
             return NextResponse.json(result);
        }

    } catch (error: any) {
        console.error('API Error: Failed to generate or save activities', error);
        return NextResponse.json({ message: error.message || 'Failed to process activities' }, { status: 500 });
    }
}

export async function getAllActivitiesHandler(request: Request) {
    try {
        const activities = await getCurriculumActivityService().getAllCurriculumActivities();
        return NextResponse.json(activities);
    } catch (error: any) {
        console.error('API Error: Failed to get curriculum activities', error);
        return NextResponse.json({ message: error.message || 'Failed to get curriculum activities' }, { status: 500 });
    }
}

export async function addFeedbackHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        const { feedback } = await request.json();
        const updatedActivity = await getCurriculumActivityService().addFeedback(id, feedback);
        if (!updatedActivity) {
            return NextResponse.json({ message: "Activity not found" }, { status: 404 });
        }
        return NextResponse.json(updatedActivity);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}


export async function deleteActivityHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        await getCurriculumActivityService().deleteActivity(params.id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Failed to delete activity' }, { status: 500 });
    }
}
