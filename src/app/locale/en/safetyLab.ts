

export default {
    title: 'School Safety Lab',
    description: 'Use AI to generate a comprehensive risk map for your educational center.',
    tagline: 'Proactively identify and plan for school safety risks.',
    tabs: {
        diagnosis: 'Risk Diagnosis',
        protocols: 'Action Protocols',
        simulations: 'Simulations',
        committees: 'Committees',
    },
    diagnosis: {
        title: 'Risk Diagnosis',
    },
    riskMap: {
        risk: 'Risk',
        priority: 'Priority',
        justification: 'Justification',
    },
    form: {
        locationLabel: 'Location Context',
        locationPlaceholder: 'e.g., Urban area in a seismic zone, rural area near a river...',
        infrastructureLabel: 'Infrastructure Context',
        infrastructurePlaceholder: 'e.g., Building is 40 years old, multiple floors, open patios...',
        socialLabel: 'Social & Community Context',
        socialPlaceholder: 'e.g., History of bullying between classes, good relationship with local police, active parent community...',
        analysisDepthLabel: 'Analysis Depth',
        analysisDepth: {
            concise: 'Concise',
            moderate: 'Moderate',
            exhaustive: 'Exhaustive',
        },
        generateButton: 'Generate Risk Map',
    },
    protocols: {
        title: 'Action Protocol Generator',
        description: 'Generate a step-by-step action plan for a specific risk.',
        riskLabel: 'Risk to Address',
        riskPlaceholder: 'e.g., Earthquake, Fire, Bullying Case...',
        generateButton: 'Generate Protocol',
        resultsTitle: 'Generated Action Protocol',
        noResults: {
            title: 'Ready to Plan?',
            description: 'Enter a risk above to generate a detailed action protocol.',
        },
        beforeTitle: 'Before the Event (Prevention)',
        duringTitle: 'During the Event (Action)',
        afterTitle: 'After the Event (Recovery)',
        historyTitle: 'Protocol History',
        noHistory: 'No protocols generated yet.',
    },
    results: {
        title: 'AI-Generated Risk Map History',
        noResults: {
            title: 'Ready to Assess?',
            description: 'Fill out the context of your school above to generate a preliminary risk assessment map.',
        }
    },
    conflictSimulation: {
        title: 'Crisis Simulation',
        description: 'Practice how to handle emergency situations by generating a hypothetical crisis scenario and making real-time decisions.',
        topicsLabel: 'Type of Crisis',
        topicsPlaceholder: 'e.g., Earthquake, Fire, Active Intruder...',
        button: 'Start Simulation',
        resetButton: 'Reset Simulation',
        simulationEnd: 'The simulation has concluded. You have handled the situation with the available information. Consider resetting to explore different outcomes.',
        scenarioTitle: 'Scenario Development',
        strategiesTitle: 'Your Choices',
        outcomeLabel: 'Simulated Outcome',
        noScenario: {
            title: 'Ready to Train?',
            description: 'Define a type of crisis to begin the simulation.',
        },
        historyTitle: "Simulation History",
        noHistory: "No simulations have been run yet.",
        durations: {
            title: 'Simulation Length',
            short: 'Short (~5 turns)',
            medium: 'Medium (~10 turns)',
            complex: 'Complex (~15 turns)',
        },
        generationError: 'There was an error generating the AI response.',
        retryButton: 'Retry',
        simulationComplete: 'Simulation Complete!',
    },
    committees: {
        title: 'Safety Committees',
        description: 'Organize safety brigades and assign roles to students and staff.',
        createTitle: 'Create New Brigade',
        createButton: 'Create Brigade',
        nameLabel: 'Brigade Name',
        namePlaceholder: 'e.g., First Aid Brigade',
        noCommittees: 'No committees created yet. Use the form above to create the first one.',
        members: 'Members',
        addMember: 'Add Member',
        selectStudentPlaceholder: 'Select a student...',
        toastCreateSuccess: 'Brigade created successfully!',
        toastCreateError: 'Failed to create brigade.',
        toastDeleteSuccess: 'Brigade deleted.',
        toastDeleteError: 'Failed to delete brigade.',
    }
} as const;

  
