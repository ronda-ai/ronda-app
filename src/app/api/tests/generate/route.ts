

import { generateTestFromStoryHandler } from "@/modules/test/interfaces/controllers/http/test.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(generateTestFromStoryHandler, isTeacher);
