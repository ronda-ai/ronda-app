
import { NextResponse, NextRequest } from "next/server";
import { getLiveSessionHandler } from "@/modules/test/interfaces/controllers/http/test.api.controller";
import { GenericRouteContext } from "@/lib/middleware/withAuthorization";

// This is a public endpoint
export async function GET(request: NextRequest, context: GenericRouteContext) {
    return getLiveSessionHandler(request, context);
}
