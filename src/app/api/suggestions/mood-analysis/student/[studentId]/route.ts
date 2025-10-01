
import { getStudentAnalysesHandler } from "@/modules/mood-trend-analysis/interfaces/controllers/http/mood-trend-analysis.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(getStudentAnalysesHandler, isTeacher);
