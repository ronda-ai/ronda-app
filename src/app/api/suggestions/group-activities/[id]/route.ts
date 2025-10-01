
import { deleteSuggestionHandler } from "@/modules/group-activity-suggestion/interfaces/controllers/http/group-activity-suggestion.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const DELETE = withAuthorization(deleteSuggestionHandler, isTeacher);
