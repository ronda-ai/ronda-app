






import { NextResponse, NextRequest } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ITestService } from "@/modules/test/domain/interfaces/test-service.interface";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";

const getTestService = () => resolve<ITestService>(SERVICE_KEYS.TestService);
const getAiConfigService = () => resolve<IAIConfigurationService>(SERVICE_KEYS.AIConfigurationService);


export async function createTestHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const savedTest = await getTestService().createTest(body);
        return NextResponse.json(savedTest, { status: 201 });
    } catch (error: any) {
        console.error('API Error: Failed to save test', error);
        return NextResponse.json({ message: error.message || 'Failed to save test' }, { status: 500 });
    }
}

export async function updateTestHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const testId = body.id;
        if (!testId) {
             return NextResponse.json({ message: "Test ID is required" }, { status: 400 });
        }
        const updatedTest = await getTestService().updateTest(testId, body);
         if (!updatedTest) {
            return NextResponse.json({ message: "Test not found" }, { status: 404 });
        }
        return NextResponse.json(updatedTest, { status: 200 });
    } catch (error: any) {
        console.error('API Error: Failed to update test', error);
        return NextResponse.json({ message: error.message || 'Failed to update test' }, { status: 500 });
    }
}

export async function getAllTestsHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const tests = await getTestService().getAllTests();
        return NextResponse.json(tests);
    } catch (error: any) {
        console.error('API Error: Failed to get tests', error);
        return NextResponse.json({ message: error.message || 'Failed to get tests' }, { status: 500 });
    }
}

export async function getTestByIdHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const test = await getTestService().getTestById(params.id as string);
        if (!test) {
            return NextResponse.json({ message: "Test not found" }, { status: 404 });
        }
        return NextResponse.json(test);
    } catch (error: any) {
        console.error('API Error: Failed to get test', error);
        return NextResponse.json({ message: error.message || 'Failed to get test' }, { status: 500 });
    }
}


export async function deleteTestHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        await getTestService().deleteTest(params.id as string);
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error('API Error: Failed to delete test', error);
        return NextResponse.json({ message: error.message || 'Failed to delete test' }, { status: 500 });
    }
}

export async function generateTestFromStoryHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const aiConfig = await getAiConfigService().getConfiguration();
        if (!aiConfig) {
            return NextResponse.json({ message: "AI configuration not found" }, { status: 400 });
        }
        const result = await getTestService().generateTestFromStory({ ...body, aiConfig });
        
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate test from story', error);
        return NextResponse.json({ message: error.message || 'Failed to generate test' }, { status: 500 });
    }
}

export async function generateTestFromTopicHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const aiConfig = await getAiConfigService().getConfiguration();
        if (!aiConfig) {
            return NextResponse.json({ message: "AI configuration not found" }, { status: 400 });
        }
        const result = await getTestService().generateTestFromTopic({ ...body, aiConfig });
        
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API Error: Failed to generate test from topic', error);
        return NextResponse.json({ message: error.message || 'Failed to generate test' }, { status: 500 });
    }
}

export async function generateRubricForTestHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        const { test, language } = body;
        
        const updatedTest = await getTestService().generateOrUpdateRubricForTest(test.id, language);

        return NextResponse.json(updatedTest);

    } catch (error: any) {
         console.error('API Error: Failed to generate rubric for test', error);
        return NextResponse.json({ message: error.message || 'Failed to generate rubric' }, { status: 500 });
    }
}

export async function startTestSessionHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const testId = params.id as string;
        const updatedTest = await getTestService().startTestSession(testId);
        if (!updatedTest) {
            return NextResponse.json({ message: "Test not found" }, { status: 404 });
        }
        return NextResponse.json(updatedTest);
    } catch (error: any) {
        console.error('API Error: Failed to start test session', error);
        return NextResponse.json({ message: error.message || 'Failed to start session' }, { status: 500 });
    }
}

export async function stopTestSessionHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const testId = params.id as string;
        const updatedTest = await getTestService().stopTestSession(testId);
        if (!updatedTest) {
            return NextResponse.json({ message: "Test not found" }, { status: 404 });
        }
        return NextResponse.json(updatedTest);
    } catch (error: any) {
        console.error('API Error: Failed to stop test session', error);
        return NextResponse.json({ message: error.message || 'Failed to stop session' }, { status: 500 });
    }
}

export async function joinTestSessionHandler(request: NextRequest, { params }: GenericRouteContext) {
    try {
        const liveId = params.liveId as string;
        const { studentId } = await request.json();

        if (!studentId) {
            return NextResponse.json({ message: "studentId is required" }, { status: 400 });
        }

        const result = await getTestService().joinTestSession(liveId, studentId);

        if (!result.success) {
             return NextResponse.json({ message: result.message }, { status: result.status || 500 });
        }
        
        return NextResponse.json({ success: true, student: result.student, test: result.test });

    } catch (error: any) {
        console.error('API Error: Failed to join test session', error);
        return NextResponse.json({ message: error.message || 'Failed to join session' }, { status: 500 });
    }
}

export async function leaveTestSessionHandler(request: NextRequest, { params }: GenericRouteContext) {
    try {
        const liveId = params.liveId as string;
        const { studentId } = await request.json();

        if (!studentId) {
            return NextResponse.json({ message: "studentId is required" }, { status: 400 });
        }

        await getTestService().leaveTestSession(liveId, studentId);

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('API Error: Failed to leave test session', error);
        return NextResponse.json({ message: error.message || 'Failed to leave session' }, { status: 500 });
    }
}


// Public handlers (no auth needed)
export async function getLiveSessionHandler(request: NextRequest, { params }: GenericRouteContext) {
    try {
        const liveId = params.liveId as string;
        const result = await getTestService().getLiveSessionDetails(liveId);
        
        if (!result) {
            return NextResponse.json({ message: "Test session not found or not active" }, { status: 404 });
        }
        
        return NextResponse.json({ 
            availableStudents: result.availableStudents,
            rejoinableStudents: result.rejoinableStudents,
            allStudents: result.allStudents,
        });

    } catch (error: any) {
        console.error('API Error: Failed to get test session', error);
        return NextResponse.json({ message: error.message || 'Failed to get session' }, { status: 500 });
    }
}

export async function getSessionDetailsHandler(request: NextRequest, { params }: GenericRouteContext) {
    try {
        const liveId = params.liveId as string;
        const result = await getTestService().getLiveSessionDetails(liveId);
        if (!result || !result.test) {
            return NextResponse.json({ message: "Test session not found or not active" }, { status: 404 });
        }
        // Return only the test structure, without sensitive details.
        return NextResponse.json(result.test);
    } catch (error: any) {
        console.error('API Error: Failed to get test session details', error);
        return NextResponse.json({ message: error.message || 'Failed to get session details' }, { status: 500 });
    }
}
