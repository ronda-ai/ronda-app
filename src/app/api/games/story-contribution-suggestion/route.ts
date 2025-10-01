
import { withAuthorization } from '@/lib/middleware/withAuthorization';
import { isTeacher } from '@/lib/policies/common.policies';
import { getContributionSuggestionHandler } from "@/modules/collaborative-story/interfaces/controllers/http/collaborative-story.api.controller";

export const POST = withAuthorization(getContributionSuggestionHandler, isTeacher);
