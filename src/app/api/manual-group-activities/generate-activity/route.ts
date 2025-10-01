
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { generateGroupActivityHandler } from '@/modules/manual-group-activity/interfaces/controllers/http/manual-group-activity.api.controller';

export const POST = withAuthorization(generateGroupActivityHandler, isTeacher);
