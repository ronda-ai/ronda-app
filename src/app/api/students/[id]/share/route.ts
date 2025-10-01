
import { shareStudentProfileHandler } from "@/modules/student/interfaces/controllers/http/student.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(shareStudentProfileHandler, isTeacher);
