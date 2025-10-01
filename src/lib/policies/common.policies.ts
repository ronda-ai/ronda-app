import { AuthenticatedUserPayload } from '../middleware/withAuthorization';

export const isTeacher = (user: AuthenticatedUserPayload): boolean => {
  return user.role === 'teacher';
};

export const isGuardian = (user: AuthenticatedUserPayload): boolean => {
    return user.role === 'guardian';
};
