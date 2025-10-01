
import { getConfigurationHandler, saveConfigurationHandler } from "@/modules/ai-configuration/interfaces/controllers/http/ai-configuration.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(getConfigurationHandler, isTeacher);
export const POST = withAuthorization(saveConfigurationHandler, isTeacher);
