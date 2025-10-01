
import { getSuggestionHandler } from "@/modules/ai-configuration/interfaces/controllers/http/prompt-suggestion.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(getSuggestionHandler, isTeacher);
