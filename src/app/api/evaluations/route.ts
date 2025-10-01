
import { evaluateChallengeHandler } from "@/modules/evaluation/interfaces/controllers/http/evaluation.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(evaluateChallengeHandler, isTeacher);
