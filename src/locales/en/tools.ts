
export default {
    title: 'Tools',
    tagline: 'Use AI tools to enhance your teaching.',
    activityAdapter: {
      title: 'Activity Adapter',
      description: 'Adapt any existing activity to better fit your classroom needs, whether for specific students or the whole group.',
      placeholder: 'Paste or write the activity you want to adapt here...',
      activityLabel: 'Activity to Adapt',
      existingActivityLabel: 'Select an existing activity or test',
      existingActivityPlaceholder: 'Choose an activity/test to summarize and adapt...',
      studentLabel: 'Adapt for Specific Students (Optional)',
      studentPlaceholder: 'Select students...',
      customPromptLabel: 'Specific Goal for the Adaptation (Optional)',
      customPromptPlaceholder: 'e.g., Make it a game, focus on writing...',
      button: 'Adapt Activity',
      generatingTitle: 'Generating Adaptations...',
      activityType: 'Activity'
    },
     rubricGenerator: {
      title: 'Rubric Generator',
      description: 'Create a fair and balanced evaluation rubric for any activity.',
      placeholder: 'Describe the activity to generate a rubric for...',
      button: 'Generate Rubric',
      testType: 'Test'
    },
    history: {
      title: 'History',
      descriptionAdapter: 'Review previously adapted activities.',
      descriptionRubric: 'Review previously generated rubrics.',
      reasoning: 'Reasoning',
      criterion: 'Criterion',
      excellent: 'Excellent',
      satisfactory: 'Satisfactory',
      needsImprovement: 'Needs Improvement',
      scoringGuide: 'Scoring Guide',
      toastDeleteSuccess: 'Deletion successful.',
      toastDeleteFailed: 'Failed to delete.',
      noResults: {
        title: 'No Results Yet',
        description: 'Use the tool on the left to generate your first result.',
      },
      deleteDialogAdapter: {
          title: 'Delete this adaptation?',
          description: 'This action cannot be undone. This will permanently delete the activity adaptation.',
          confirm: 'Delete'
      },
      deleteDialogRubric: {
          title: 'Delete this rubric?',
          description: 'This action cannot be undone. This will permanently delete the generated rubric.',
          confirm: 'Delete'
      }
    }
} as const;
