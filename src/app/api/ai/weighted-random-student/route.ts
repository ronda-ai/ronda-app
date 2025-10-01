
import { getWeightedRandomStudentHandler } from "@/modules/student/interfaces/controllers/http/student.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(getWeightedRandomStudentHandler, isTeacher);
