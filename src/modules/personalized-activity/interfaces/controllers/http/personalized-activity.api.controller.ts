
import { NextResponse } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IPersonalizedActivityService } from "@/modules/personalized-activity/domain/interfaces/personalized-activity-service.interface";
import { GenericRouteContext, AuthenticatedUserPayload } from "@/lib/middleware/withAuthorization";
import { NextRequest } from "next/server";

const getPersonalizedActivityService = () => resolve<IPersonalizedActivityService>(SERVICE_KEYS.PersonalizedActivityService);

export async function getActivitiesForStudentHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const studentId = params.id as string;
        const activities = await getPersonalizedActivityService().getPersonalizedActivitiesForStudent(studentId);
        return NextResponse.json(activities);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function getAllPersonalizedActivitiesHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const activities = await getPersonalizedActivityService().getAllPersonalizedActivities();
        const activitiesWithStudent = await Promise.all(activities.map(async (activity) => {
            const studentService = resolve<any>(SERVICE_KEYS.StudentService);
            const student = await studentService.getStudentById(activity.studentId);
            return {
                ...activity,
                studentName: student ? student.name : 'Unknown'
            };
        }));
        return NextResponse.json(activitiesWithStudent);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function addFeedbackHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const planId = params.id as string;
        const body = await request.json();
        const updatedPlan = await getPersonalizedActivityService().addFeedback(planId, body.feedback);
        if (!updatedPlan) {
            return NextResponse.json({ message: "Plan not found" }, { status: 404 });
        }
        return NextResponse.json(updatedPlan);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function deleteActivityHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const planId = params.id as string;
        await getPersonalizedActivityService().deletePersonalizedActivity(planId);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function updateStepHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const id = params.id as string;
        const stepIndex = params.stepIndex as string;
        const details = await request.json();
        const updatedPlan = await getPersonalizedActivityService().updateStepDetails(id, parseInt(stepIndex, 10), details);
        console.log("details: ", details)
        if (!updatedPlan) {
            return NextResponse.json({ message: "Activity plan or step not found" }, { status: 404 });
        }
        return NextResponse.json(updatedPlan);
    } catch (error: any) {
        console.error('API Error: Failed to update personalized activity step', error);
        return NextResponse.json({ message: error.message || 'Failed to update step' }, { status: 500 });
    }
}
