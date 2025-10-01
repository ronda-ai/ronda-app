import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { analyzeSubmissionHandler } from "@/modules/test-analysis/interfaces/controllers/http/test-analysis.api.controller";

export const POST = withAuthorization(analyzeSubmissionHandler, isTeacher);
