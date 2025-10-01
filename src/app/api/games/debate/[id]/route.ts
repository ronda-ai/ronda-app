
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { deleteDebateHandler } from "@/modules/debate/interfaces/controllers/http/debate.api.controller";

export const DELETE = withAuthorization(deleteDebateHandler, isTeacher);
