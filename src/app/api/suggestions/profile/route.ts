
import { getSuggestionHandler } from "@/modules/student/interfaces/controllers/http/profile-suggestion.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(getSuggestionHandler, isTeacher);
