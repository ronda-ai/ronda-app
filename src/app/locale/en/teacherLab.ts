

export default {
    title: 'Teacher Lab',
    tagline: 'A private space for professional reflection and practice, guided by AI.',
    tabs: {
        pulse: 'Class Pulse',
        domainA: 'Domain A: Planning',
        domainB: 'Domain B: Environment',
        domainC: 'Domain C: Teaching',
        domainD: 'Domain D: Reflection',
    },
    classroomPulse: {
        title: 'Classroom Pulse',
        description: 'An AI-generated summary of your class\'s current strengths and potential challenges, based on all available data.',
        generating: 'Analyzing class data to generate pulse...',
        noData: 'Not enough data yet. Add students, qualities, and relationships to generate the first pulse.',
        strengths: 'Group Strengths',
        challenges: 'Potential Challenges',
        button: 'Generate Pulse',
    },
    planningCopilot: {
        title: 'Class Planning Copilot',
        description: 'Describe a learning objective and get a menu of pedagogical options to plan your class.',
        objectiveLabel: 'Learning Objective',
        objectivePlaceholder: 'e.g., "Students should understand the main causes of World War I"',
        generateButton: 'Generate Pedagogical Menu',
        generating: 'Generating pedagogical menu...',
        noMenu: 'Define an objective above to generate a menu of class plans.',
        menuTitle: 'Pedagogical Menu',
        activities: {
            start: 'Start',
            development: 'Development',
            closure: 'Closure',
        },
        mbeJustification: 'MBE Justification',
        adaptationSuggestion: 'Adaptation Suggestion',
    },
    classroomClimate: {
        title: 'Classroom Climate Simulator',
        description: 'Practice handling common classroom management situations in a safe, interactive environment.',
        button: 'Start New Simulation',
        resetButton: 'Reset Simulation',
        scenarioTitle: 'Scenario',
        generationError: 'There was an error generating the AI response.',
        retryButton: 'Retry',
        scenarioDescriptionLabel: 'Situation to Simulate',
        scenarioDescriptionPlaceholder: 'e.g., A student is being disruptive, two students are not working well together...',
        durations: {
            title: 'Simulation Length',
            short: 'Short (~5 turns)',
            medium: 'Medium (~10 turns)',
            complex: 'Complex (~15 turns)',
        },
    },
    questionAnalysis: {
        title: 'Question Quality Analyzer',
        description: "Paste your class questions to analyze their cognitive demand based on Bloom's Taxonomy.",
        placeholder: "Paste your questions here, one per line...",
        button: 'Analyze Questions',
        resultsTitle: "Analysis Results",
        summaryTitle: "Overall Summary",
        suggestionLabel: "Suggestion",
        noResults: "The analysis of your questions will appear here."
    },
    reflectionAssistant: {
        title: 'Guided Reflection Assistant',
        description: 'Write down your thoughts about a class or situation, and the AI will ask you Socratic questions to deepen your reflection based on the MBE.',
        placeholder: 'How did your class go today? What went well? What were the challenges?',
        sendButton: 'Send',
        noExports: 'No content available to export yet. Generate some analyses or plans first!',
        exportPlanning: 'Export Planning Menu',
        exportQuestions: 'Export Question Analysis',
        exportReflection: 'Export Reflection Log',
    },
    collaboration: {
        title: "Peer Collaboration",
        description: "Export your generated plans and analyses to share and discuss with colleagues."
    }
} as const;
