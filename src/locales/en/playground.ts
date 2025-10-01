

export default {
    title: 'Playground',
    tagline: 'Engage in fun and educational games with AI.',
    riddleBattle: {
        title: 'Riddle Battle',
        description: 'Generate a pair of riddles for two teams to solve. Who will be faster?',
        topicLabel: 'Riddle Topic (Optional)',
        topicPlaceholder: 'e.g., Animals, Space, History',
        button: 'Start New Battle',
        battleTitle: 'Riddle Battle!',
        topic: 'Topic',
        teamBlue: 'Team Blue',
        teamRed: 'Team Red',
        showAnswer: 'Show Answer',
        hideAnswer: 'Hide Answer',
        toastDeleted: 'Battle deleted.',
        toastDeleteFailed: 'Failed to delete battle.',
        toastEvaluationSaved: 'Evaluation saved.',
        toastEvaluationFailed: 'Failed to save evaluation.',
        noBattles: {
            title: 'Ready for a Challenge?',
            description: 'Click the button above to start the first Riddle Battle.',
        },
        deleteDialog: {
            title: 'Delete this battle?',
            description: 'This action is permanent and cannot be undone.',
        },
        evaluation: {
            title: 'Evaluation',
            winner: 'Winner',
            winnerLabel: 'Declare Winner',
            winnerPlaceholder: 'Select a winner...',
            tie: 'Tie',
            moodLabel: 'Competition Atmosphere',
            moodPlaceholder: 'Select the atmosphere...',
            feedbackLabel: 'Feedback',
            feedbackPlaceholder: 'How was the game? Was it fair?',
            moods: {
                competitive: 'Competitive',
                fun: 'Fun',
                collaborative: 'Collaborative',
                tense: 'Tense',
                relaxed: 'Relaxed',
            },
            confirm: 'Confirm'
        }
    },
    lightningRound: {
        title: 'Lightning Round',
        description: 'A fast-paced game with fun challenges to energize the classroom.',
        durationLabel: 'Round Duration (seconds)',
        intervalLabel: 'Challenge Interval (seconds)',
        categoryLabel: 'Challenge Category',
        start: 'Start Lightning Round!',
        pause: 'Pause',
        resume: 'Resume',
        reset: 'Reset',
        noStudentsError: 'At least 2 students present are needed to play.',
        toastDeleted: 'Round deleted.',
        toastDeleteFailed: 'Failed to delete round.',
        categories: {
            sound: 'Sounds',
            face: 'Faces',
            gesture: 'Gestures',
            imitation: 'Imitations',
        },
        gameScreen: {
            yourTurn: 'your turn!',
        },
        history: {
            title: 'Round History',
            description: 'Review previously generated rounds.',
            roundFor: 'Round from {date}',
            noRounds: 'No rounds played yet.',
        },
        deleteDialog: {
            title: 'Delete this round?',
            description: 'This action is permanent and cannot be undone.',
        },
    },
    collaborativeStory: {
        title: 'Collaborative Storytelling',
        setup: {
            title: 'Start a New Story',
            description: 'Define the characters and setting to begin your adventure.',
            charactersLabel: 'Main Characters',
            charactersPlaceholder: 'e.g., A brave knight, a smart dragon',
            settingLabel: 'Initial Setting',
            settingPlaceholder: 'e.g., A dark and spooky cave',
            lengthLabel: 'Chapter Length',
            lengths: {
                short: 'Short',
                medium: 'Medium',
                long: 'Long',
            },
            startButton: 'Start Story',
            allowDialogues: 'Allow dialogues in the story',
            narratorVoiceLabel: "Narrator's Voice",
            narratorVoicePlaceholder: "Select a voice...",
            customPromptLabel: "Custom Prompt (Optional)",
            customPromptPlaceholder: "e.g., The story must be a comedy, it must not contain violence...",
            negativePromptLabel: "Negative Prompt (Optional)",
            negativePromptPlaceholder: "e.g., Avoid sad endings, do not mention spiders...",
        },
        contribute: {
            title: 'What Happens Next?',
            description: 'Add student ideas for the next chapter.',
            placeholder: 'Write a student idea and press enter...',
            continueButton: 'Continue Story',
            suggestionButton: 'AI Suggestion'
        },
        story: {
            titlePlaceholder: 'The Story Will Appear Here',
            storyPlaceholder: 'Start by defining your characters and setting, then start the story!',
        },
        history: {
            title: 'Story History',
            createdAt: 'Created',
            noStories: 'No stories yet.',
        },
        deleteDialog: {
            title: 'Delete this story?',
            description: 'This action is permanent and cannot be undone.',
        },
        toastDeleted: 'Story deleted.',
        toastDeleteFailed: 'Failed to delete story.',
        toastNarrationSuccess: 'Full story narration is being generated and will appear shortly.',
        newStoryButton: 'Start a New Story',
        narrateButton: 'Narrate Chapter',
        'narrateButton--loading': 'Narrating...',
        narrateFullStoryButton: 'Narrate as Audiobook',
        suggestions: {
            button: 'Suggest with AI',
            toastSuccess: 'Ideas suggested!'
        },
        finishButton: 'Finish Story',
        test: {
            createButton: 'Create Test from Story',
            modalTitle: 'Generate Test',
            modalDescription: 'Select the type of test you want to generate from this story.',
            typeLabel: 'Test Type',
            types: {
                title: 'Test Type',
                'multiple-choice': 'Multiple Choice',
                'true-false': 'True or False',
                'open-ended': 'Open Questions',
                'mixed': 'Mixed',
            },
            generateButton: 'Generate Test',
            generateError: 'Failed to generate test.',
            saveSuccess: 'Test saved successfully!',
            saveError: 'Failed to save test.',
            previewTitle: 'Generated Test Preview',
            previewDescription: 'Review the generated test. It has already been saved and can be viewed on the Tests page.',
            rubricTitle: 'Evaluation Rubric',
            saveButton: 'Save Test',
        },
        illustrateButton: 'Illustrate',
    },
    debateGenerator: {
        title: 'Debate Generator',
        description: 'Generate educational debate scenarios to encourage critical thinking.',
        topicLabel: 'Debate Topic',
        topicPlaceholder: 'e.g., Should animals be kept in zoos?',
        complexityLabel: 'Complexity',
        complexities: {
            beginner: 'Beginner',
            intermediate: 'Intermediate',
            advanced: 'Advanced'
        },
        button: 'Generate New Debate',
        noDebates: {
            title: 'Ready to Argue?',
            description: 'Enter a topic and complexity to generate your first debate scenario.',
        },
        affirmativeStance: 'Affirmative Stance',
        negativeStance: 'Negative Stance',
        guidingQuestions: 'Guiding Questions',
        rules: 'Debate Rules',
        toastDeleted: 'Debate deleted.',
        toastDeleteFailed: 'Failed to delete debate.',
        deleteDialog: {
            title: 'Delete this debate?',
            description: 'This action is permanent and cannot be undone.',
        },
        startSession: "Start Live Session",
        manageSession: "Manage Session",
        turnStructureTitle: "Debate Turn Structure",
        currentTurn: "Current Turn",
        notStarted: "The debate has not started",
        paused: "Debate Paused",
        start: "Start Debate",
        nextTurn: "Next Turn",
        pause: "Pause",
        resume: "Resume",
        liveSession: {
            title: "Debate Session in Progress",
            description: "Share this QR code or link with your students to start the debate.",
            qrCode: "QR Code",
            link: "Direct Link",
            copy: "Copy",
            copied: "Copied!",
            studentsConnected: "Students Connected",
            noStudentsYet: "No students have connected yet.",
            affirmative: 'Affirmative',
            negative: 'Negative',
            unassigned: 'Unassigned',
            both: 'Both',
            teacher: 'Teacher',
            closeSession: "Close Session",
            sessionClosed: "Session has been closed."
        }
    },
    digitalConviviality: {
        title: 'Digital Citizenship',
        description: 'Tools to foster positive and responsible online behavior.',
        activities: {
            title: 'Activities',
            description: 'Generate an activity to practice digital citizenship skills.',
        },
        conflictSimulation: {
            title: 'Conflict Simulation',
            description: 'Practice handling difficult online situations by generating a hypothetical conflict scenario.',
            topicsLabel: 'Conflict Topics (Optional)',
            topicsPlaceholder: 'e.g., cyberbullying, misinformation, plagiarism',
            button: 'Generate Scenario',
            scenarioTitle: 'Generated Scenario',
            strategiesTitle: 'Intervention Strategies',
            strategyLabel: 'Strategy',
            outcomeLabel: 'Simulated Outcome',
            noScenario: {
                title: 'Ready to Practice?',
                description: 'Generate a scenario to practice your conflict resolution skills.',
            },
            deleteDialog: {
                title: 'Delete this scenario?',
                description: 'This will permanently delete this conflict scenario from your history.',
                confirm: 'Delete',
            },
            history: {
                title: 'Scenario History'
            }
        },
        pact: {
            title: 'Digital Pact',
            description: 'Collaboratively generate a set of classroom rules for healthy digital interaction.',
            studentCountLabel: 'Number of Students',
            mainConcernsLabel: 'Main Concerns (Optional)',
            mainConcernsPlaceholder: 'e.g., use of social media, respect for privacy',
            button: 'Generate Pact Draft',
            saveDraftButton: 'Save Draft',
            publishButton: 'Publish',
            republishButton: 'Republish',
            publishedAt: 'Published on {date} (v{version})',
            noPacts: {
                title: 'Ready to Build a Pact?',
                description: 'Set your class parameters and generate a draft of your digital conviviality pact.'
            },
            deleteDialog: {
                title: 'Delete this Pact?',
                description: 'This will permanently delete the generated pact.',
                confirm: 'Delete'
            },
            history: {
                title: 'Pact History',
                principles: 'Guiding Principles',
                norms: 'Specific Norms',
                consequences: 'Restorative Consequences',
                level: 'Level',
                restorativeAction: 'Restorative Action'
            }
        },
        typeLabel: 'Activity Type',
        typePlaceholder: 'Select a type...',
        types: {
            'netiquette-challenge': 'Netiquette Challenge',
            'digital-collaboration': 'Digital Collaboration Game',
            'positive-messaging': 'Positive Messaging Rewriter'
        },
        customPromptLabel: 'Specific Focus (Optional)',
        customPromptPlaceholder: 'e.g., Focus on social media comments...',
        button: 'Generate Activity',
        history: {
            title: 'Activity History',
            studentInstructions: 'Instructions for Students',
            pedagogicalObjectives: 'Pedagogical Objectives',
            materials: 'Materials',
            noMaterials: 'No materials provided.',
            steps: 'Steps',
        },
        noActivities: {
            title: 'Ready to Promote Good Digital Habits?',
            description: 'Select an activity type above to generate your first digital citizenship exercise.'
        },
        deleteDialog: {
            title: 'Delete this activity?',
            description: 'This action is permanent and cannot be undone.',
            confirm: 'Delete'
        }
    },
    suggestions: {
        button: 'Suggest with AI',
        toastSuccess: 'Topic suggested!'
    }
} as const;
