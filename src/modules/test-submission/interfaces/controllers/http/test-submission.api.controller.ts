import { SERVICE_KEYS } from "@/config/service-keys";
import { AuthenticatedUserPayload, GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { ITestSubmissionService } from "@/modules/test-submission/domain/interfaces/test-submission-service.interface";
import { resolve } from "@/services/bootstrap";
import { NextRequest, NextResponse } from "next/server";

const getTestSubmissionService = () => resolve<ITestSubmissionService>(SERVICE_KEYS.TestSubmissionService);

export async function createSubmissionHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const body = await request.json();
        // This handler seems to be for a different flow, let's assume it's for internal creation.
        // We will create a new one for the public submission.
        // const submission = await getTestSubmissionService().createSubmission(body);
        // return NextResponse.json(submission, { status: 201 });
        return NextResponse.json({ message: "Endpoint not implemented for this flow." }, { status: 501 });
    } catch (error: unknown) {
        const err = error as Error;
        console.error('API Error: Failed to create test submission', err);
        return NextResponse.json({ message: err.message || 'Failed to create submission' }, { status: 500 });
    }
}


export async function getSubmissionsForTestHandler(request: NextRequest, authUser: AuthenticatedUserPayload) {
    try {
        const { searchParams } = new URL(request.url);
        const testId = searchParams.get('testId');
        if (!testId) {
            return NextResponse.json({ message: 'testId parameter is required' }, { status: 400 });
        }
        const submissions = await getTestSubmissionService().getSubmissionsForTest(testId);
        return NextResponse.json(submissions);
    } catch (error: unknown) {
        const err = error as Error;
        console.error('API Error: Failed to get test submissions', err);
        return NextResponse.json({ message: err.message || 'Failed to get submissions' }, { status: 500 });
    }
}

export async function getTestResultsHandler(request: NextRequest, authUser: AuthenticatedUserPayload, { params }: GenericRouteContext) {
    try {
        const testId = params.id as string;
        const results = await getTestSubmissionService().getSubmissionsForTest(testId);
        return NextResponse.json(results);
    } catch (error: unknown) {
        const err = error as Error;
        console.error('API Error: Failed to get test results', err);
        return NextResponse.json({ message: err.message || 'Failed to get results' }, { status: 500 });
    }
}


export async function submitTestAnswersHandler(request: NextRequest, { params }: GenericRouteContext) {
    try {
        const liveId = params.liveId as string;
        const body = await request.json();
        const { studentId, answers } = body;
        
        if (!studentId || !answers) {
             return NextResponse.json({ message: "studentId and answers are required" }, { status: 400 });
        }
        
        const submission = await getTestSubmissionService().createSubmission({
            liveId,
            testId: '', // This will be overwritten by the service based on liveId
            studentId,
            answers
        });

        return NextResponse.json(submission, { status: 201 });

    } catch (error: unknown) {
        const err = error as Error;
        console.error('API Error: Failed to submit test answers', err);
        return NextResponse.json({ message: err.message || 'Failed to submit test' }, { status: 500 });
    }
}
