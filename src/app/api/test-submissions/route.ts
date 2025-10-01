import { NextResponse, NextRequest } from 'next/server';
import { resolve } from '@/services/bootstrap';
import { SERVICE_KEYS } from '@/config/service-keys';
import { ITestSubmissionService } from '@/modules/test-submission/domain/interfaces/test-submission-service.interface';
import { getSubmissionsForTestHandler } from '@/modules/test-submission/interfaces/controllers/http/test-submission.api.controller';
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';

const getTestSubmissionService = () => resolve<ITestSubmissionService>(SERVICE_KEYS.TestSubmissionService);

// This is a public endpoint, no authorization needed
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const submission = await getTestSubmissionService().createSubmission(body);
        return NextResponse.json(submission, { status: 201 });
    } catch (error: any) {
        console.error('API Error: Failed to create test submission', error);
        return NextResponse.json({ message: error.message || 'Failed to create submission' }, { status: 500 });
    }
}

export const GET = withAuthorization(getSubmissionsForTestHandler, isTeacher);
