
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { deleteRoundHandler, updateRoundHandler } from "@/modules/lightning-round/interfaces/controllers/http/lightning-round.api.controller";

export const PUT = withAuthorization(updateRoundHandler, isTeacher);
export const DELETE = withAuthorization(deleteRoundHandler, isTeacher);
