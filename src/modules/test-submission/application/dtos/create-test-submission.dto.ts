export interface CreateTestSubmissionDTO {
  testId: string;
  studentId: string;
  answers: Record<string, any>; // Record<questionId, answer>
}
