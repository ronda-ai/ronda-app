
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { createFocusAreaHandler, getAllFocusAreasHandler } from "@/modules/focus-area/interfaces/controllers/http/focus-area.api.controller";

export const GET = withAuthorization(getAllFocusAreasHandler, isTeacher);
export const POST = withAuthorization(createFocusAreaHandler, isTeacher);
