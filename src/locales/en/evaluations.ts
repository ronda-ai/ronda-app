export default {
    title: 'Evaluations',
    tagline: 'Review and evaluate student participation.',
    evaluateButton: 'Evaluate',
    evaluatedStatus: 'Evaluated',
    rejectedStatus: 'Rejected',
    noChallenges: 'No challenges recorded for this student yet.',
    noEvaluations: {
      title: 'No Evaluations Yet',
      description:
        'Once a student accepts a challenge, you can evaluate it here.',
    },
    evaluationDialog: {
      title: 'Evaluate Challenge',
      forStudent: 'for {name}',
      challenge: 'Challenge',
      rating: 'Rating',
      feedback: 'Feedback',
      feedbackPlaceholder: 'Enter your feedback here...',
      saveButton: 'Save Evaluation',
      mood: 'Student Mood',
    },
    ratings: {
      needsSupport: 'Needs Support',
      metExpectations: 'Met Expectations',
      exceededExpectations: 'Exceeded Expectations',
    },
    moods: {
      enthusiastic: 'Enthusiastic',
      focused: 'Focused',
      nervous: 'Nervous',
      frustrated: 'Frustrated',
      happy: 'Happy',
      tired: 'Tired',
    },
    pagination: {
        previous: 'Previous',
        next: 'Next',
        page: 'Page {currentPage} of {totalPages}',
    }
} as const;
