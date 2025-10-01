
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { generateFocusAreaSuggestionHandler } from "@/modules/focus-area/interfaces/controllers/http/focus-area.api.controller";

export const POST = withAuthorization(generateFocusAreaSuggestionHandler, isTeacher);
