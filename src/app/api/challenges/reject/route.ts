
import { rejectChallengeHandler } from "@/modules/challenge/interfaces/controllers/http/challenge.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(rejectChallengeHandler, isTeacher);
