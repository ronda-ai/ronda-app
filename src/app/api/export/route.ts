
import { exportDataHandler } from "@/modules/export/interfaces/controllers/http/export.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(exportDataHandler, isTeacher);
