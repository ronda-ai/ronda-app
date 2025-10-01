
import { NextResponse, NextRequest } from "next/server";
import { getSessionDetailsHandler } from "@/modules/test/interfaces/controllers/http/test.api.controller";
import { GenericRouteContext } from "@/lib/middleware/withAuthorization";

// This is a public endpoint specifically for fetching the test structure.
export async function GET(request: NextRequest, context: GenericRouteContext) {
    return getSessionDetailsHandler(request, context);
}
