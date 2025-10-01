
import { NextRequest } from "next/server";
import { GenericRouteContext } from "@/lib/middleware/withAuthorization";
import { joinDebateSessionHandler } from "@/modules/debate/interfaces/controllers/http/debate.api.controller";

// Public endpoint
export async function POST(request: NextRequest, context: GenericRouteContext) {
    return joinDebateSessionHandler(request, context);
}
