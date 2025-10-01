
import { deleteGroupHandler, updateGroupHandler } from '@/modules/manual-group-activity/interfaces/controllers/http/manual-group-activity.api.controller';
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';

export const PUT = withAuthorization(updateGroupHandler, isTeacher);
export const DELETE = withAuthorization(deleteGroupHandler, isTeacher);
