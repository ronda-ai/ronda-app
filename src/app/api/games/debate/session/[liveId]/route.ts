
import { NextResponse, NextRequest } from "next/server";
import { GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { getDebateByLiveIdHandler } from "@/modules/debate/interfaces/controllers/http/debate.api.controller";


// Public endpoint
export async function GET(request: NextRequest, context: GenericRouteContext) {
    return getDebateByLiveIdHandler(request, context);
}
