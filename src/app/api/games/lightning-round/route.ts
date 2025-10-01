
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { generateRoundHandler, getAllRoundsHandler } from "@/modules/lightning-round/interfaces/controllers/http/lightning-round.api.controller";

export const POST = withAuthorization(generateRoundHandler, isTeacher);
export const GET = withAuthorization(getAllRoundsHandler, isTeacher);
