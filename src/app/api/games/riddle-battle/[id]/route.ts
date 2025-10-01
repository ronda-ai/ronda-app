
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { updateBattleHandler, deleteBattleHandler } from "@/modules/riddle-battle/interfaces/controllers/http/riddle-battle.api.controller";

export const PUT = withAuthorization(updateBattleHandler, isTeacher);
export const DELETE = withAuthorization(deleteBattleHandler, isTeacher);
