
export default {
    title: 'PBL Lab',
    tagline: 'Orchestrate complex projects from a single idea.',
    tabs: {
        phase1: 'Phase 1: Planning',
        phase2: 'Phase 2: Teams',
        phase3: 'Phase 3: Development',
        phase4: 'Phase 4: Evaluation',
    },
    phase1: {
        form: {
            title: 'Phase 1: Project Planner',
            description: 'Define a central topic and let the AI build a structured project plan.',
            topicLabel: 'Central Project Topic',
            topicPlaceholder: 'e.g., Climate change in our city, History of video games...',
            skillsLabel: 'Key Skills to Develop',
            noSkills: 'No skills defined yet. Go to the Activity Generator to add some.',
            durationLabel: 'Estimated Duration',
            durations: {
                'oneWeek': '1 Week',
                'twoWeeks': '2 Weeks',
                'oneMonth': '1 Month',
            },
            generateButton: 'Generate Project Plan'
        },
        generating: {
            title: 'Generating Project Plan...'
        },
    },
    phase2: {
        title: 'Phase 2: Team Formation',
        description: 'Use AI to form strategic groups based on your students\' profiles and relationships.',
        selectProject: 'Select Project',
        selectProjectPlaceholder: 'Choose a project to form teams for...',
        teamSize: 'Team Size',
        groupingCriteria: 'Grouping Criteria',
        criteria: {
            balanced: 'Balanced Teams',
            'social-remediation': 'Social Remediation',
            synergy: 'Interest Synergy',
        },
        generateButton: 'Generate Teams',
        noProjectSelected: 'Please select a project first.',
        results: {
            title: 'Suggested Teams',
            teamName: 'Team {name}',
            rationale: 'Team Rationale',
            formation: 'Formation',
            deleteDialog: {
                title: 'Delete this team formation?',
                description: 'This action cannot be undone. This will permanently delete the team formation.',
            },
        },
        table: {
            student: 'Student',
            suggestedRole: 'Suggested Role',
            justification: 'Justification',
        }
    },
    phase3: {
        title: 'Phase 3: On-the-Fly Scaffolding',
        description: 'Generate quick intervention plans for teams facing challenges during project development.',
        selectTeam: 'Team to Intervene',
        selectTeamPlaceholder: 'Select students...',
        problemLabel: 'Describe the Problem',
        problemPlaceholder: 'e.g., The team is stuck, there is a conflict, a student is unmotivated...',
        generateButton: 'Generate Intervention',
        suggestionTitle: 'Suggested Intervention',
        microActivity: 'Micro-Activity to Unblock',
        guidingQuestions: 'Guiding Questions for the Teacher',
        noSuggestion: 'The generated intervention plan will appear here.',
    },
    phase4: {
        title: 'Phase 4: Rubric Generator',
        description: 'Generate a detailed evaluation rubric for a project\'s final product.',
        generateButton: 'Generate Rubric',
        rubricTitle: 'Suggested Evaluation Rubric',
        noRubric: 'The generated rubric will appear here.',
    },
    history: {
        title: 'Project History',
        description: 'Review and manage previously generated projects.',
        noResults: {
            title: 'No Projects Yet',
            description: 'Use the form to generate your first Project-Based Learning plan.'
        },
        phases: 'Project Phases',
        milestones: 'Key Milestones',
        finalProduct: 'Final Product Suggestion',
        deleteDialog: {
            title: 'Delete this project plan?',
            description: 'This action cannot be undone. This will permanently delete the project plan.',
        },
    },
} as const;
