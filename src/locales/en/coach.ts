
export default {
    title: 'AI Coach',
    tagline: 'Get AI-powered insights and suggestions.',
    noStudentSelected: {
      title: 'Select a Student',
      description:
        'Choose a student from the list to view their analysis and get suggestions.',
    },
    tabs: {
        classroom: 'Classroom Analysis',
        individual: 'Individual Analysis'
    },
    coachSuggestion: {
      title: 'Coach Suggestion',
      description:
        'Generate a personalized suggestion for this student based on their profile and performance.',
      button: 'Get Suggestion',
      toastDeleted: 'Suggestion deleted successfully.',
      toastDeleteFailed: 'Failed to delete suggestion.',
      deleteDialog: {
        title: 'Delete this suggestion?',
        description: 'This action cannot be undone. This will permanently delete the coach suggestion.',
        confirm: 'Delete',
      },
      noSuggestions: {
        title: 'No Suggestions Yet',
        description:
          'Generate the first suggestion for this student to get started.',
      },
    },
    supportPlan: {
      title: 'Support Plan',
      description:
        "Generate a multi-step, actionable plan to support this student's development.",
      button: 'Generate New Plan',
      generating: 'Generating plan, please wait...',
      planGenerated: 'Plan generated {date}',
      feedbackTitle: "Teacher's Feedback",
      feedbackPlaceholder:
        "What worked? What didn't? Your feedback helps the AI learn...",
      toastDeleted: 'Support plan deleted successfully.',
      toastDeleteFailed: 'Failed to delete support plan.',
      noPlans: {
        title: 'No Support Plans Yet',
        description:
          'Generate the first support plan for this student to get started.',
      },
      stepDialog: {
        title: 'Evaluate Support Step',
        description: 'How did this step go?',
        status: 'Status',
        feedback: 'Step Feedback (optional)',
        feedbackPlaceholder: 'Add a note about this step...',
        saveButton: 'Save Step Evaluation',
        statuses: {
          pending: 'Pending',
          achieved: 'Achieved',
          'partially-achieved': 'Partially Achieved',
          'not-achieved': 'Not Achieved',
          discarded: 'Discarded',
        },
      },
      deleteDialog: {
        title: 'Are you sure you want to delete this plan?',
        description:
          'This action cannot be undone. This will permanently delete the support plan.',
        confirm: 'Delete',
      },
    },
    moodAnalysis: {
      title: 'Mood Trend Analysis',
      descriptionStudent:
        "Analyze this student's mood across different challenges to find patterns.",
      descriptionClassroom:
        'Get a classroom-wide analysis of mood trends to improve the general dynamic.',
      button: 'Analyze Trends',
      buttonClassroom: 'Analyze Classroom Trends',
      analysisTitle: 'AI-Powered Insight',
      noAnalyses: {
        title: 'No Analyses Yet',
        descriptionStudent:
          'Generate the first mood analysis for this student to get started.',
        descriptionClassroom:
          'Generate the first mood analysis for the classroom to get started.',
      },
      toastDeleted: 'Analysis deleted successfully.',
      toastDeleteFailed: 'Failed to delete analysis.',
      deleteDialog: {
        title: 'Delete this analysis?',
        description: 'This action cannot be undone. This will permanently delete the generated analysis.',
        confirm: 'Delete',
      },
    },
    relationshipLab: {
      title: 'Social Dynamics Lab',
      description: 'A space to analyze and improve student relationships.',
      button: 'Open Lab',
      tagline: 'Orchestrate positive social interactions.',
      tabs: {
        multiStudent: 'Peer-to-Peer',
        singleStudent: 'Individual',
      },
      form: {
        title: 'Relationship Remediation Strategy Generator',
        description: 'Select students with a tense relationship to receive a custom intervention plan.',
        studentsLabel: 'Select Students (2-4)',
        studentsPlaceholder: 'Select students...',
        focusLabel: 'Main Goal / Skill to Reinforce',
        focusPlaceholder: 'e.g., Communication, Empathy, Collaboration...',
        customPromptLabel: 'Custom Prompt (Optional)',
        customPromptPlaceholder: 'e.g., Create a non-verbal activity, make it a game...',
        generateButton: 'Generate Strategy',
      },
      individual: {
          form: {
              title: 'Individual Strategy Generator',
              description: 'Select a single student to generate a plan to help them integrate and relate better with the class.',
              studentsPlaceholder: 'Select a student...',
              generateButton: 'Generate Integration Strategy'
          },
          history: {
              title: 'Individual Strategy History',
              description: 'Review previously generated strategies for this student.',
               prompt: {
                  title: 'Ready to Build Bridges?',
                  description: 'Select a student to view their history or generate a new social integration strategy.',
              },
          },
          toastSuccess: 'Integration strategy generated!',
          toastDeleteSuccess: 'Strategy deleted successfully.',
          toastDeleteFailed: 'Failed to delete strategy.',
          deleteDialog: {
              title: 'Delete this strategy?',
              description: 'This action cannot be undone and will permanently delete the strategy.',
              confirm: 'Delete'
          }
      },
      suggestions: {
          button: 'Suggest with AI',
          toastSuccess: 'Suggestion populated in the form!'
      },
      studentInfo: {
          title: "Selected Students' Profile",
          qualities: 'Qualities',
          fears: 'Fears',
          none: 'None listed',
      },
      history: {
        title: 'Strategy History',
        description: 'Review previously generated strategies for the selected students.',
        header: 'Strategy for {focus}',
        statusLabel: 'Strategy Status',
        statusPlaceholder: 'Set status...',
        feedbackLabel: 'Teacher Feedback',
        feedbackPlaceholder: 'How did this strategy work in practice?',
        saveFeedbackButton: 'Save Evaluation',
        toastUpdateSuccess: 'Strategy updated successfully!',
        toastUpdateFailed: 'Failed to update strategy.',
        prompt: {
            title: 'Ready to Remediate?',
            description: 'Select at least two students in the form to view their history or generate a new strategy.',
        },
        noResults: {
            title: 'No Strategies Yet',
            description: 'Generate the first strategy for this group of students.',
        },
         stepDialog: {
            title: 'Evaluate Remediation Step',
            description: 'How did this step go?',
            status: 'Status',
            feedback: 'Step Feedback (opcional)',
            feedbackPlaceholder: 'Add a note about this step...',
            saveButton: 'Save Evaluation',
            statuses: {
                pending: 'Pending',
                completed: 'Completed',
                skipped: 'Skipped',
            },
        },
      },
      details: {
          title: "Strategy Details for '{focus}'",
          adjustTitle: "Adjust Strategy",
          adjustPlaceholder: "e.g., Make it simpler, add a drawing component, focus more on non-verbal cues...",
          adjustButton: "Generate Adjusted Strategy",
      },
      status: {
        'not_started': 'Not Started',
        'in_progress': 'In Progress',
        'successful': 'Successful',
        'partially_successful': 'Partially Successful',
        'did_not_work': 'Did Not Work',
        'needs_adjustment': 'Needs Adjustment',
      },
      toastSuccess: 'Remediation strategy generated!',
    },
    qualitiesSuggestion: {
      title: 'Qualities Suggestion',
      description: 'Discover emerging qualities based on student performance.',
      button: 'Discover Qualities',
      suggestionText:
        'Based on recent performance, the AI suggests the following qualities:',
      noSuggestions: {
        title: 'No Quality Suggestions Yet',
        description:
          'Generate the first qualities suggestion for this student to get started.',
      },
      dialog: {
        title: 'New Quality Suggestions for {name}',
        description:
          'Based on recent performance, here are some qualities you might consider adding:',
        accept: 'Accept',
        reject: 'Reject',
        confirmation: 'How would you like to update the qualities?',
        add: 'Add as New',
        replace: 'Replace Existing',
        confirm: 'Confirm Update',
      },
    },
    concernAnalysis: {
      title: 'Concern Pattern Analysis',
      description:
        "The AI will analyze the student's full history for recurring negative patterns.",
      button: 'Analyze for Concerns',
      noAnalyses: {
        title: 'No Concern Patterns Detected',
        description:
          'Generate an analysis to check for potential recurring issues.',
      },
    },
    fearManagement: {
      title: 'Fear Management Suggestions',
      description: 'Generate empathetic strategies to help a student with their fears.',
      button: 'Get Strategy',
      strategyFor: 'Strategy for:',
      feedbackTitle: 'How did it go?',
      feedbackPlaceholder: 'Your feedback helps the AI learn and improve...',
      toastFearUpdated: 'Student fear profile updated!',
      toastFearUpdateFailed: 'Failed to update student fears.',
      toastDeleted: 'Suggestion deleted successfully.',
      toastDeleteFailed: 'Failed to delete suggestion.',
      noSuggestions: {
        title: 'No Strategies Yet',
        description: 'Generate a strategy to help this student manage their fears.',
        noFears: 'This student has no listed fears. Add fears in their profile to get suggestions.',
      },
      updateDialog: {
        title: 'Update Student Profile?',
        confirm: 'Yes, update profile',
      },
      deleteDialog: {
        title: 'Delete this suggestion?',
        description: 'This action cannot be undone.',
        confirm: 'Delete',
      },
      dialog: {
        title: 'Managing Fear of {fear}',
        description: 'Review existing strategies or generate a new one for {name}.',
        generateButton: 'Generate New Suggestion',
        noSuggestions: {
            title: 'No strategies yet',
            description: 'Generate the first AI suggestion to address this fear.'
        }
      }
    }
} as const;
