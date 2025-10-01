import { NextResponse, NextRequest } from "next/server";
import { submitTestAnswersHandler } from "@/modules/test-submission/interfaces/controllers/http/test-submission.api.controller";
import { GenericRouteContext } from "@/lib/middleware/withAuthorization";


// This is a public endpoint for students to submit their answers
export async function POST(request: NextRequest, context: GenericRouteContext) {
    return submitTestAnswersHandler(request, context);
}