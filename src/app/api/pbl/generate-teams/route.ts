

import { generateTeamsHandler } from "@/modules/pbl/interfaces/controllers/http/pbl.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(generateTeamsHandler, isTeacher);
    