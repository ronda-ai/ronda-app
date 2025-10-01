export default {
    title: 'Individual Activities',
    tagline: 'Design personalized activities for a specific student.',
    step0: {
        title: 'Select a Student',
        description: 'Choose a student to begin generating personalized activities.',
    },
    step1: {
      selectLabel: 'Student',
      selectPlaceholder: 'Select a student...',
    },
    generator: {
        title: 'Activity Generator for {name}',
        description: 'Define the parameters for the activity, or use the AI to suggest ideas.',
        topicLabel: 'Academic Topic',
        topicPlaceholder: 'e.g., Fractions, Photosynthesis',
        skillsLabel: 'Skills to Develop',
        skillsPlaceholder: 'e.g., Critical Thinking, Collaboration',
        themesLabel: 'Engagement Themes',
        themesPlaceholder: 'e.g., Space, Dinosaurs, Mysteries',
        customPromptLabel: 'Custom Prompt (Optional)',
        customPromptPlaceholder: 'e.g., Focus on visual elements, make it a hands-on activity',
        negativePromptLabel: 'Negative Prompt (Optional)',
        negativePromptPlaceholder: 'e.g., Avoid writing tasks, do not mention spiders',
        generateButton: 'Generate Activities',
        toastSuccess: 'Activities generated successfully!',
        noSkills: 'No skills available yet.',
        addSkills: 'Add new skills'
    },
    suggestions: {
        button: 'Suggest with AI',
        toastSuccess: 'Suggestions populated!',
    },
    history: {
        title: "Activity Plan History",
        description: "Review and manage previously generated activity plans for {name}.",
        toastDeleted: 'Activity plan deleted.',
        toastDeleteFailed: 'Failed to delete activity plan.',
        noResults: {
            title: "No Activity Plans Yet",
            description: "Generate the first plan for this student to see their history here."
        },
        deleteDialog: {
            title: "Delete this activity plan?",
            description: "This action cannot be undone. This will permanently delete the activity plan.",
        },
        stepDialog: {
            title: 'Evaluate Activity Step',
            description: 'How did this activity go?',
            status: 'Status',
            feedback: 'Step Feedback (optional)',
            feedbackPlaceholder: 'Add a note about this activity...',
            saveButton: 'Save Evaluation',
            statuses: {
                pending: 'Pending',
                'in-progress': 'In Progress',
                completed: 'Completed',
                skipped: 'Skipped'
            },
        },
    },
    democratizer: {
      title: 'Resource Democratizer',
      descriptionSingle: 'Adapt this activity to make it more accessible.',
      descriptionAll: 'Adapt all activities in this plan to make them more accessible according to different needs or limitations of resources.',
      descriptionSelected: 'Adapt the {count} selected activities in this plan to make them more accessible.',
      prompt: 'Select an adaptation option to apply to the activities.',
      selectPlaceholder: 'Choose an adaptation...',
      activitiesToAdapt: "Activities to Adapt:",
      adaptButton: 'Adapt Activities',
      toastSuccess: 'Activities adapted successfully!',
      options: {
        commonMaterials: 'Adapt for common household materials',
        lowEnergy: 'Adapt for low-energy/calm scenarios',
        socialInteraction: 'Increase social interaction component',
        simpleInstructions: 'Simplify instructions',
      },
    }
} as const;
