
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { getLatestHandler } from '@/modules/teacher-lab/interfaces/controllers/http/teacher-lab.api.controller';

export const GET = withAuthorization(getLatestHandler, isTeacher);
