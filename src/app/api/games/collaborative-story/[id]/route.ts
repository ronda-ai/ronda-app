import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { deleteStoryHandler, updateStoryHandler, narrateFullStoryHandler } from "@/modules/collaborative-story/interfaces/controllers/http/collaborative-story.api.controller";

export const PUT = withAuthorization(updateStoryHandler, isTeacher);
export const DELETE = withAuthorization(deleteStoryHandler, isTeacher);
