
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { deleteRubricSuggestionHandler } from "@/modules/rubric-suggestion/interfaces/controllers/http/rubric-suggestion.api.controller";

export const DELETE = withAuthorization(deleteRubricSuggestionHandler, isTeacher);
