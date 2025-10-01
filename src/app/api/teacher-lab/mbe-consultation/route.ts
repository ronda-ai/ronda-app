import { mbeConsultationHandler } from '@/modules/teacher-lab/interfaces/controllers/http/teacher-lab.api.controller';
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(mbeConsultationHandler, isTeacher);
