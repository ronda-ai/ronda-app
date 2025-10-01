
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { createDebateHandler, getAllDebatesHandler } from "@/modules/debate/interfaces/controllers/http/debate.api.controller";

export const POST = withAuthorization(createDebateHandler, isTeacher);
export const GET = withAuthorization(getAllDebatesHandler, isTeacher);
