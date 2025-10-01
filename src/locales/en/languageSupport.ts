
export default {
      title: 'Language Support',
      tagline: 'Generate bilingual materials to support language inclusion.',
      form: {
          title: 'Language Inclusion Assistant',
          description: 'Select a student and specify their language to generate personalized support materials.',
          studentLabel: 'Student',
          studentPlaceholder: 'Select a student...',
          languageLabel: "Student's Native Language",
          languagePlaceholder: 'e.g., Spanish, French, Mandarin',
          focusAreasLabel: 'Focus Areas',
          generateButton: 'Generate Support Material',
      },
      focusAreas: {
          reading: 'Reading Comprehension',
          writing: 'Writing Skills',
          speaking: 'Oral Expression',
          listening: 'Listening Comprehension',
          'social-emotional': 'Social-Emotional Integration',
      },
      addFocusAreaDialog: {
        title: 'Add New Focus Areas',
        description: 'Select from the AI suggestions or add your own focus areas to the list.',
        customPromptLabel: 'Guide the AI (Optional)',
        customPromptPlaceholder: 'e.g., Focus on listening areas...',
        manualAreaLabel: 'Or Add an Area Manually',
        manualAreaPlaceholder: 'Type a new area...',
        noSuggestions: 'No suggestions available. Try refreshing or changing your prompt.',
        add: 'Add:',
        addSelected: 'Add Selected',
        toastSuccess: 'Focus areas added successfully!',
        toastError: 'Failed to add focus areas.',
      },
      editFocusAreaDialog: {
        title: 'Edit Focus Area: {name}',
        areaNameLabel: 'Focus Area Name',
        deleteButton: 'Delete Area',
        toastUpdateSuccess: 'Focus area updated successfully!',
        toastUpdateError: 'Failed to update focus area.',
        toastDeleteSuccess: 'Focus area deleted successfully!',
        toastDeleteError: 'Failed to delete focus area.',
        deleteDialog: {
            title: 'Are you sure?',
            description: 'This will permanently delete the focus area "{name}" from the list.',
            cancel: 'Cancel',
            confirm: 'Delete'
        }
      },
      generatingTitle: 'Generating Support Material...',
      history: {
          title: 'Generated Materials History',
          description: 'Review previously generated materials for the selected student.',
          selectStudentPrompt: {
            title: 'Select a Student',
            description: 'Choose a student from the form to view their history and generate new materials.',
          },
          noResults: {
              title: 'No Materials Yet',
              description: 'Use the form to generate the first support material for this student.',
          },
          header: 'Material for {language}',
          teacherGuide: 'Teacher Guide',
          studentMaterial: 'Student Material',
          feedbackTitle: "Teacher's Feedback",
          feedbackPlaceholder: 'Was this material useful? Your feedback helps improve future suggestions.',
          toastDeleted: 'Support material deleted.',
          toastDeleteFailed: 'Failed to delete support material.',
          deleteDialog: {
            title: 'Delete this material?',
            description: 'This action cannot be undone. This will permanently delete the generated support material.',
          },
          translationTitle: "Translation for {language}",
          showTranslation: "Show Translation",
          hideTranslation: "Hide Translation",
      }
} as const;
