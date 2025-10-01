import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { createCommitteeHandler, getAllCommitteesHandler } from "@/modules/safety-committee/interfaces/controllers/http/safety-committee.api.controller";

export const GET = withAuthorization(getAllCommitteesHandler, isTeacher);
export const POST = withAuthorization(createCommitteeHandler, isTeacher);
