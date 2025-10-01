
import { generateSupportHandler } from "@/modules/language-support/interfaces/controllers/http/language-support.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(generateSupportHandler, isTeacher);
