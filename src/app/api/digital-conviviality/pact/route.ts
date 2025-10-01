
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { createPactHandler, getAllPactsHandler } from "@/modules/digital-conviviality/interfaces/controllers/http/digital-conviviality.api.controller";

export const POST = withAuthorization(createPactHandler, isTeacher);
export const GET = withAuthorization(getAllPactsHandler, isTeacher);
