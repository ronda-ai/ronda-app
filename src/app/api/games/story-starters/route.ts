
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { getStoryStartersHandler } from "@/modules/collaborative-story/interfaces/controllers/http/collaborative-story.api.controller";

export const POST = withAuthorization(getStoryStartersHandler, isTeacher);
