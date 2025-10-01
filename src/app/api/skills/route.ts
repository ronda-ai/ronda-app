
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { createSkillHandler, getAllSkillsHandler } from "@/modules/skill/interfaces/controllers/http/skill.api.controller";

export const GET = withAuthorization(getAllSkillsHandler, isTeacher);
export const POST = withAuthorization(createSkillHandler, isTeacher);
