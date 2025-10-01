
import { getSuggestionHandler } from "@/modules/relationship-remediation/interfaces/controllers/http/relationship-suggestion.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(getSuggestionHandler, isTeacher);
