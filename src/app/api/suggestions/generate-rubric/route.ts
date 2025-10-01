import { createSuggestionHandler, getAllSuggestionsHandler } from "@/modules/rubric-suggestion/interfaces/controllers/http/rubric-suggestion.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(createSuggestionHandler, isTeacher);
export const GET = withAuthorization(getAllSuggestionsHandler, isTeacher);
