import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { addMemberHandler, deleteCommitteeHandler, removeMemberHandler } from "@/modules/safety-committee/interfaces/controllers/http/safety-committee.api.controller";

export const POST = withAuthorization(addMemberHandler, isTeacher);
export const DELETE = withAuthorization(deleteCommitteeHandler, isTeacher);
export const PUT = withAuthorization(removeMemberHandler, isTeacher); // Using PUT for member removal
