
export default {
    title: 'Group Activities',
    tagline: 'Intelligently form groups and generate collaborative activities.',
    generator: {
      title: 'Group Suggestion Generator',
      description: 'The AI will analyze your class to suggest balanced groups and a facilitation tip.',
      button: 'Generate New Suggestions',
    },
    manualMode: {
        title: 'Manual Group Builder',
        description: 'Create your own groups and get AI-powered assistance.',
        selectLabel: 'Select students for a new group',
        selectPlaceholder: 'Choose students...',
        createGroupButton: 'Create Group',
        groupTitle: 'New Group',
        analyzeButton: 'Analyze Dynamics',
        generateActivityButton: 'Generate Activity',
        warningTitle: 'Relationship Alert',
        conflictWarning: '{nameA} and {nameB} have a registered conflict. Proceed with caution.',
        skillsLabel: 'Collaborative Skills to Develop',
        skillsPlaceholder: 'e.g., Communication, Leadership',
        themesLabel: 'Activity Theme (Optional)',
        themesPlaceholder: 'e.g., Space Mission, Mystery Solving',
        activityGeneratedToast: 'Activity generated successfully!',
    },
    aiSuggestions: {
        title: 'AI-Generated Suggestions',
    },
    history: {
      title: 'Suggestion History',
      description: 'Review previously generated group suggestions.',
      suggestionFor: 'Suggestion from {date}',
      teacherTipTitle: 'Facilitator Tip',
      suggestedGroups: 'Suggested Groups',
      group: 'Group',
      suggestedSkills: 'Suggested Collaborative Skills',
      suggestedThemes: 'Suggested Activity Themes',
      useSuggestionButton: 'Use this Suggestion',
      suggestionUsedToast: 'Suggestion applied to the manual group builder!',
      noResults: {
        title: 'Ready to Collaborate?',
        description: 'Click the button above to generate the first set of group suggestions for your class.',
      },
      toastDeleted: 'Suggestion deleted.',
      toastDeleteFailed: 'Failed to delete suggestion.',
      deleteDialog: {
        title: 'Delete this suggestion?',
        description: 'This action is permanent and cannot be undone.',
      },
    },
    viewActivitiesButton: 'View Generated Activities',
    details: {
        title: 'Generated Activities for the Group',
        description: 'The following activities were generated for {members}.',
        deleteButton: 'Delete Activity Plan',
    }
} as const;
