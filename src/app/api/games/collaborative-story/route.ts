
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { getStoriesHandler, processChapterHandler } from "@/modules/collaborative-story/interfaces/controllers/http/collaborative-story.api.controller";

export const POST = withAuthorization(processChapterHandler, isTeacher);
export const GET = withAuthorization(getStoriesHandler, isTeacher);
