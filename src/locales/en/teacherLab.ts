
export default {
    title: 'Teacher Lab',
    tagline: 'A private space for professional reflection and practice, guided by AI.',
    tabs: {
        pulse: 'Class Pulse',
        domainA: 'Domain A: Planning',
        domainB: 'Domain B: Environment',
        domainC: 'Domain C: Teaching',
        domainD: 'Domain D: Reflection',
        mbeExpert: 'MBE Expert'
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
    audioAnalysis: {
        title: "Class Audio Analyzer",
        description: "Upload an audio recording of your class to analyze talk times and dialogue quality.",
        selectFileButton: "Select Audio File",
        selectedFile: "Selected File",
        analyzeButton: "Analyze Audio",
        resultsTitle: "Audio Analysis Results",
        talkTime: "Talk Time Distribution",
        teacher: "Teacher",
        student: "Students",
        questionAnalysis: "Question Analysis",
        atmosphere: "Classroom Atmosphere",
        recommendations: "Pedagogical Recommendations",
        progress: {
            transcribing: "Transcribing audio...",
            analyzing: "Analyzing transcript...",
        }
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
    },
    mbeExpert: {
        title: "MBE Expert Consultation",
        description: "Ask a question to an expert on the 'Marco para la Buena Enseñanza', powered by the official documentation.",
        questionLabel: "Your query about the MBE",
        questionPlaceholder: "e.g., How can I apply criterion B1 in a math class with conflicting students?",
        button: "Consult Expert",
        noResults: "The expert's answer will appear here.",
        generating: "Consulting the expert...",
        studentContextLabel: "Add context from a student (optional)",
        studentContextPlaceholder: "Select a student...",
        knowledgeBase: {
            title: "Knowledge Base",
            description: "Load the official MBE document to power the expert's responses. Loading may take several minutes.",
            urlLabel: "MBE Document PDF URL",
            urlPlaceholder: "Paste the PDF URL here...",
            loadButton: "Load Knowledge",
            toastLoading: "Loading MBE document. This may take several minutes...",
            toastSuccess: "{chunks} document chunks have been successfully loaded and vectorized.",
            toastError: "Error loading the MBE document."
        }
    }
} as const;
