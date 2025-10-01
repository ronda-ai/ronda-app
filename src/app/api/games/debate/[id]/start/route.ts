
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { startDebateSessionHandler } from "@/modules/debate/interfaces/controllers/http/debate.api.controller";

export const POST = withAuthorization(startDebateSessionHandler, isTeacher);
