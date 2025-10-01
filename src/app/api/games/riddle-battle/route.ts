
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { createBattleHandler, getAllBattlesHandler } from "@/modules/riddle-battle/interfaces/controllers/http/riddle-battle.api.controller";

export const POST = withAuthorization(createBattleHandler, isTeacher);
export const GET = withAuthorization(getAllBattlesHandler, isTeacher);
