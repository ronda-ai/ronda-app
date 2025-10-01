
import { getStudentByIdHandler, updateStudentHandler, deleteStudentHandler } from "@/modules/student/interfaces/controllers/http/student.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(getStudentByIdHandler, isTeacher);
export const PUT = withAuthorization(updateStudentHandler, isTeacher);
export const DELETE = withAuthorization(deleteStudentHandler, isTeacher);
