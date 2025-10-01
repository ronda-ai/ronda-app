
import { getAttendanceHandler, setAttendanceHandler } from "@/modules/attendance/interfaces/controllers/http/attendance.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(setAttendanceHandler, isTeacher);
export const GET = withAuthorization(getAttendanceHandler, isTeacher);
