
import { adaptCurriculumActivityHandler } from "@/modules/curriculum-activity/interfaces/controllers/http/activity-adaptation.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(adaptCurriculumActivityHandler, isTeacher);
