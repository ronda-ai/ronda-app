
import { getSuggestionsForStudentHandler } from "@/modules/fear-management-suggestion/interfaces/controllers/http/fear-management-suggestion.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(getSuggestionsForStudentHandler, isTeacher);
