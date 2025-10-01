export default {
    noStudents: 'Please add students to the list before spinning.',
    aiError: 'The AI returned an invalid student name. Please try again.',
    aiSelectionFailed:
      'Could not get weighted selection. Falling back to random.',
    aiChallengeFailed:
      'Could not generate AI challenge. Falling back to a standard one.',
    aiModelOverloaded:
      "The AI assistant is busy right now. Please try again in a few seconds!",
    aiSuggestionFailed:
      'Could not generate an AI suggestion. Please try again.',
    aiSuggestionFailedDescription: 'If the problem persists, check the student data or simplify the request.',
    profileSuggestionNeedsInfo:
      'Please enter a name and age before generating suggestions.',
    feedbackSaved: 'Feedback saved successfully!',
    feedbackFailed: 'Failed to save feedback.',
    qualitiesUpdated: 'Qualities updated successfully!',
    qualitiesUpdateFailed: 'Failed to update qualities.',
    attendanceSaved: 'Attendance saved successfully!',
    attendanceFailed: 'Failed to save attendance.',
    challengeRejected: 'Challenge marked as rejected.',
} as const;
