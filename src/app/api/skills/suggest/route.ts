
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { generateSkillSuggestionHandler } from "@/modules/skill/interfaces/controllers/http/skill.api.controller";

export const POST = withAuthorization(generateSkillSuggestionHandler, isTeacher);
