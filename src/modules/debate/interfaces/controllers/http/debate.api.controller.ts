
import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IDebateService } from "@/modules/debate/domain/interfaces/debate-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";

const getDebateService = () => resolve<IDebateService>(SERVICE_KEYS.DebateService);
const getAiConfigService = () => resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);
const getStudentService = () => resolve<IStudentService>(SERVICE_KEYS.StudentService);

export async function createDebateHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const aiConfig = await getAiConfigService().getConfiguration();
        
        const savedDebate = await getDebateService().generateAndCreateDebate({
            ...body,
            ageOrGrade: aiConfig?.ageOrGrade,
            country: aiConfig?.country,
        });
        return NextResponse.json(savedDebate);
    } catch (error: any) {
        console.error('API Error: Failed to generate debate', error);
        return NextResponse.json({ message: error.message || 'Failed to generate debate' }, { status: 500 });
    }
}

export async function getAllDebatesHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const debates = await getDebateService().getAllDebates();
        return NextResponse.json(debates);
    } catch (error: any) {
        console.error('API Error: Failed to get debates', error);
        return NextResponse.json({ message: error.message || 'Failed to get debates' }, { status: 500 });
    }
}

export async function deleteDebateHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        await getDebateService().deleteDebate(params.id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete debate', error);
        return NextResponse.json({ message: error.message || 'Failed to delete debate' }, { status: 500 });
    }
}

export async function generateDebateTopicSuggestionHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const aiConfig = await getAiConfigService().getConfiguration();
        
        const suggestion = await getDebateService().generateDebateTopicSuggestion({
            language: body.language,
            ageOrGrade: aiConfig?.ageOrGrade,
            country: aiConfig?.country,
            classInterests: aiConfig?.classInterests || [],
        });

        return NextResponse.json({ topic: suggestion });
    } catch (error: any) {
        console.error('API Error: Failed to suggest debate topic', error);
        return NextResponse.json({ message: error.message || 'Failed to suggest topic' }, { status: 500 });
    }
}

export async function startDebateSessionHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const debateId = params.id as string;
        const updatedDebate = await getDebateService().startDebateSession(debateId);
        if (!updatedDebate) {
            return NextResponse.json({ message: "Debate not found" }, { status: 404 });
        }
        return NextResponse.json(updatedDebate);
    } catch (error: any) {
        console.error('API Error: Failed to start debate session', error);
        return NextResponse.json({ message: error.message || 'Failed to start session' }, { status: 500 });
    }
}

export async function stopDebateSessionHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const debateId = params.id as string;
        const updatedDebate = await getDebateService().stopDebateSession(debateId);
        if (!updatedDebate) {
            return NextResponse.json({ message: "Debate not found" }, { status: 404 });
        }
        return NextResponse.json(updatedDebate);
    } catch (error: any) {
        console.error('API Error: Failed to stop debate session', error);
        return NextResponse.json({ message: error.message || 'Failed to stop session' }, { status: 500 });
    }
}

// Public handlers (no auth)
export async function getDebateByLiveIdHandler(request: NextRequest, context: GenericRouteContext) {
    try {
        const liveId = context.params.liveId as string;
        const debate = await getDebateService().getDebateByLiveId(liveId);
        if (!debate) {
            return NextResponse.json({ message: "Debate session not found" }, { status: 404 });
        }
        
        // We also need the list of available students
        const allStudents = await getStudentService().getAllStudents();
        const activeStudentIds = Object.values(debate.teams || {}).flat();
        const availableStudents = allStudents.filter(s => !s.isAbsent && !activeStudentIds.includes(s.id));
        
        return NextResponse.json({ debate, availableStudents });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function joinDebateSessionHandler(request: NextRequest, context: GenericRouteContext) {
    try {
        const liveId = context.params.liveId as string;
        const { studentId, team } = await request.json();

        if (!studentId || !team) {
            return NextResponse.json({ message: "studentId and team are required" }, { status: 400 });
        }

        const result = await getDebateService().joinDebateSession(liveId, studentId, team);

        if (!result.success) {
            return NextResponse.json({ message: result.message }, { status: result.status || 500 });
        }
        
        return NextResponse.json({ success: true });

    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Failed to join session' }, { status: 500 });
    }
}
