

import { NextResponse, NextRequest } from "next/server";
import { joinTestSessionHandler } from "@/modules/test/interfaces/controllers/http/test.api.controller";
import { GenericRouteContext } from "@/lib/middleware/withAuthorization";


// This is a public endpoint, no teacher authorization needed
export async function POST(request: NextRequest, context: GenericRouteContext) {
    return joinTestSessionHandler(request, context);
}
