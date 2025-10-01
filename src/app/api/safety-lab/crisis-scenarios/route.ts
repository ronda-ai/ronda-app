
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { getAllCrisisScenariosHandler } from "@/modules/educational-safety/interfaces/controllers/http/educational-safety.api.controller";

export const GET = withAuthorization(getAllCrisisScenariosHandler, isTeacher);
