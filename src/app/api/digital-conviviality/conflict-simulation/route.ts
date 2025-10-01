
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { generateConflictScenarioHandler, getAllScenariosHandler, deleteScenarioHandler } from "@/modules/digital-conviviality/interfaces/controllers/http/digital-conviviality.api.controller";

export const POST = withAuthorization(generateConflictScenarioHandler, isTeacher);
export const GET = withAuthorization(getAllScenariosHandler, isTeacher);
export const DELETE = withAuthorization(deleteScenarioHandler, isTeacher);
