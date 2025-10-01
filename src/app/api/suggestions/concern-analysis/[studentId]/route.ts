
import { getConcernAnalysesForStudentHandler } from "@/modules/concern-analysis/interfaces/controllers/http/concern-analysis.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(getConcernAnalysesForStudentHandler, isTeacher);
