
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ICurriculumActivityService } from "@/modules/curriculum-activity/domain/interfaces/curriculum-activity-service.interface";
import { IPersonalizedActivityService } from "@/modules/personalized-activity/domain/interfaces/personalized-activity-service.interface";
import { generateActivityAdaptation } from "@/ai/flows/generate-activity-adaptation";
import { generateActivitySummary } from "@/ai/flows/generate-activity-summary";
import { IManualGroupActivityService } from "@/modules/manual-group-activity/domain/interfaces/manual-group-activity-service.interface";

const getPersonalizedActivityService = () => resolve<IPersonalizedActivityService>(SERVICE_KEYS.PersonalizedActivityService);
const getManualGroupActivityService = () => resolve<IManualGroupActivityService>(SERVICE_KEYS.ManualGroupActivityService);
const getCurriculumActivityService = () => resolve<ICurriculumActivityService>(SERVICE_KEYS.CurriculumActivityService);

export async function adaptCurriculumActivityHandler(req: NextRequest) {
    try {
        const body = await req.json();
        const { planId, selectedIndices, adaptationType, language } = body;
        const plan = await getCurriculumActivityService().getActivityById(planId);
        if (!plan) {
            return NextResponse.json({ message: "Plan not found" }, { status: 404 });
        }
        
        const adaptedActivities = await Promise.all(
            plan.activities.map(async (activity, index) => {
                if (selectedIndices.includes(index)) {
                    const result = await generateActivityAdaptation({
                      originalActivity: activity.description,
                      customPrompt: adaptationType,
                      language
                    });
                    const suggestion = result.suggestions[0];
                    return { ...activity, title: suggestion.title, description: suggestion.description };
                }
                return activity;
            })
        );

        const updatedPlan = await getCurriculumActivityService().updateActivityPlan(plan.id, {
            activities: adaptedActivities
        });

        return NextResponse.json(updatedPlan);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export async function adaptPersonalizedActivityHandler(req: NextRequest) {
    try {
        const body = await req.json();
        const { planId, selectedIndices, adaptationType, language } = body;
        const plan = await getPersonalizedActivityService().getActivityById(planId);
         if (!plan) {
            return NextResponse.json({ message: "Plan not found" }, { status: 404 });
        }

        const adaptedActivities = await Promise.all(
             plan.activities.map(async (activity, index) => {
                if (selectedIndices.includes(index)) {
                     const result = await generateActivityAdaptation({
                      originalActivity: activity.description,
                      customPrompt: adaptationType,
                      language
                    });
                    const suggestion = result.suggestions[0];
                    return { ...activity, title: suggestion.title, description: suggestion.description };
                }
                return activity;
            })
        );
        
        const updatedPlan = await getPersonalizedActivityService().updateActivityPlan(plan.id, {
            activities: adaptedActivities
        });


        return NextResponse.json(updatedPlan);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export async function adaptManualGroupActivity(req: NextRequest) {
    try {
        const body = await req.json();
        const { activity, groupId, adaptationType, language } = body;

        const result = await generateActivityAdaptation({
            originalActivity: activity.description,
            customPrompt: adaptationType,
            language
        });
        const suggestion = result.suggestions[0];
        const adaptedActivity = { ...activity, title: suggestion.title, description: suggestion.description };

        const updatedGroup = await getManualGroupActivityService().updateManualGroupActivity(groupId, {
            activities: [adaptedActivity]
        });

        return NextResponse.json(updatedGroup);

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function generateActivitySummaryHandler(req: NextRequest) {
    try {
        const body = await req.json();
        const { activityText, language } = body;
        const result = await generateActivitySummary({ activityText, language });
        return NextResponse.json(result);
    } catch (error: any) {
        console.error("API Error: Failed to summarize activity", error);
        return NextResponse.json({ message: error.message || 'Failed to summarize activity' }, { status: 500 });
    }
}
