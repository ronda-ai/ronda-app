
import { getAllStudentsHandler, createStudentHandler } from "@/modules/student/interfaces/controllers/http/student.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(getAllStudentsHandler, isTeacher);
export const POST = withAuthorization(createStudentHandler, isTeacher);
