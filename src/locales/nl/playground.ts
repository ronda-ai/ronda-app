
export default {
    title: 'Speeltuin',
    tagline: 'Doe mee aan leuke en educatieve spellen met AI.',
    riddleBattle: {
        title: 'Raadselgevecht',
        description: 'Genereer een paar raadsels voor twee teams om op te lossen. Wie zal sneller zijn?',
        topicLabel: 'Raadselonderwerp (Optioneel)',
        topicPlaceholder: 'bv. Dieren, Ruimte, Geschiedenis',
        button: 'Start Nieuw Gevecht',
        battleTitle: 'Raadselgevecht!',
        topic: 'Onderwerp',
        teamBlue: 'Team Blauw',
        teamRed: 'Team Rood',
        showAnswer: 'Toon Antwoord',
        hideAnswer: 'Verberg Antwoord',
        toastDeleted: 'Gevecht verwijderd.',
        toastDeleteFailed: 'Kon gevecht niet verwijderen.',
        toastEvaluationSaved: 'Evaluatie opgeslagen.',
        toastEvaluationFailed: 'Kon evaluatie niet opslaan.',
        noBattles: {
            title: 'Klaar voor een Uitdaging?',
            description: 'Klik op de knop hierboven om het eerste Raadselgevecht te starten.',
        },
        deleteDialog: {
            title: 'Dit gevecht verwijderen?',
            description: 'Deze actie is permanent en kan niet ongedaan worden gemaakt.',
        },
        evaluation: {
            title: 'Evaluatie',
            winner: 'Winnaar',
            winnerLabel: 'Winnaar Verklaren',
            winnerPlaceholder: 'Selecteer een winnaar...',
            tie: 'Gelijkspel',
            moodLabel: 'Competitiesfeer',
            moodPlaceholder: 'Selecteer de sfeer...',
            feedbackLabel: 'Feedback',
            feedbackPlaceholder: 'Hoe was het spel? Was het eerlijk?',
            moods: {
                competitive: 'Competitief',
                fun: 'Leuk',
                collaborative: 'Samenwerkend',
                tense: 'Gespannen',
                relaxed: 'Ontspannen',
            },
            confirm: 'Bevestigen'
        }
    },
    lightningRound: {
        title: 'Bliksemronde',
        description: 'Een snel spel met leuke uitdagingen om de klas energie te geven.',
        durationLabel: 'Rondeduur (seconden)',
        intervalLabel: 'Uitdagingsinterval (seconden)',
        categoryLabel: 'Uitdagingscategorie',
        start: 'Start Bliksemronde!',
        pause: 'Pauze',
        resume: 'Hervat',
        reset: 'Reset',
        noStudentsError: 'Er zijn minstens 2 aanwezige studenten nodig om te spelen.',
        toastDeleted: 'Ronde verwijderd.',
        toastDeleteFailed: 'Kon ronde niet verwijderen.',
        categories: {
            sound: 'Geluiden',
            face: 'Gezichten',
            gesture: 'Gebaren',
            imitation: 'Imitaties',
        },
        gameScreen: {
            yourTurn: 'jouw beurt!',
        },
        history: {
            title: 'Rondegeschiedenis',
            description: 'Bekijk eerder gegenereerde rondes.',
            roundFor: 'Ronde van {date}',
            noRounds: 'Nog geen rondes gespeeld.',
        },
        deleteDialog: {
            title: 'Deze ronde verwijderen?',
            description: 'Deze actie is permanent en kan niet ongedaan worden gemaakt.',
        },
    },
    collaborativeStory: {
        title: 'Samen Verhalen Vertellen',
        setup: {
            title: 'Begin een Nieuw Verhaal',
            description: 'Definieer de personages en de setting om je avontuur te beginnen.',
            charactersLabel: 'Hoofdpersonages',
            charactersPlaceholder: 'bv. Een dappere ridder, een slimme draak',
            settingLabel: 'Beginsetting',
            settingPlaceholder: 'bv. Een donkere en enge grot',
            lengthLabel: 'Hoofdstuklengte',
            lengths: {
                short: 'Kort',
                medium: 'Gemiddeld',
                long: 'Lang',
            },
            startButton: 'Start Verhaal',
            allowDialogues: 'Sta dialogen toe in het verhaal',
            narratorVoiceLabel: "Stem van de Verteller",
            narratorVoicePlaceholder: "Selecteer een stem...",
            customPromptLabel: "Aangepaste Prompt (Optioneel)",
            customPromptPlaceholder: "bv. Het verhaal moet een komedie zijn, het mag geen geweld bevatten...",
            negativePromptLabel: "Negatieve Prompt (Optioneel)",
            negativePromptPlaceholder: "bv. Vermijd droevige eindes, vermeld geen spinnen...",
        },
        contribute: {
            title: 'Wat Gebeurt Er Nu?',
            description: 'Voeg ideeën van studenten toe voor het volgende hoofdstuk.',
            placeholder: 'Schrijf een idee van een student en druk op enter...',
            continueButton: 'Vervolg Verhaal',
            suggestionButton: 'AI Suggestie'
        },
        story: {
            titlePlaceholder: 'Het Verhaal Verschijnt Hier',
            storyPlaceholder: 'Begin met het definiëren van je personages en setting, en start dan het verhaal!',
        },
        history: {
            title: 'Verhaalgeschiedenis',
            createdAt: 'Gemaakt op',
            noStories: 'Nog geen verhalen.',
        },
        deleteDialog: {
            title: 'Dit verhaal verwijderen?',
            description: 'Deze actie is permanent en kan niet ongedaan worden gemaakt.',
        },
        toastDeleted: 'Verhaal verwijderd.',
        toastDeleteFailed: 'Kon verhaal niet verwijderen.',
        toastNarrationSuccess: 'Volledige verhaalvertelling wordt gegenereerd en zal spoedig verschijnen.',
        newStoryButton: 'Begin een Nieuw Verhaal',
        narrateButton: 'Vertel Hoofdstuk',
        'narrateButton--loading': 'Aan het vertellen...',
        narrateFullStoryButton: 'Vertel als Luisterboek',
        suggestions: {
            button: 'Stel voor met AI',
            toastSuccess: 'Ideeën voorgesteld!'
        },
        finishButton: 'Beëindig Verhaal',
        test: {
            createButton: 'Maak Test van Verhaal',
            modalTitle: 'Genereer Test',
            modalDescription: 'Selecteer het type test dat u van dit verhaal wilt genereren.',
            typeLabel: 'Testtype',
            types: {
                title: 'Testtype',
                'multiple-choice': 'Meerkeuze',
                'true-false': 'Waar of Niet Waar',
                'open-ended': 'Open Vragen',
                'mixed': 'Gemengd',
            },
            generateButton: 'Genereer Test',
            generateError: 'Kon test niet genereren.',
            saveSuccess: 'Test succesvol opgeslagen!',
            saveError: 'Kon test niet opslaan.',
            previewTitle: 'Voorbeeld van Gegenereerde Test',
            previewDescription: 'Bekijk de gegenereerde test. Het is al opgeslagen en kan worden bekeken op de Testpagina.',
            rubricTitle: 'Beoordelingsrubriek',
            saveButton: 'Sla Test op',
        },
        illustrateButton: 'Illustreren',
    },
    debateGenerator: {
        title: 'Debatgenerator',
        description: 'Genereer educatieve debatscenario\'s om kritisch denken te stimuleren.',
        topicLabel: 'Debatonderwerp',
        topicPlaceholder: 'bv. Moeten dieren in dierentuinen worden gehouden?',
        complexityLabel: 'Complexiteit',
        complexities: {
            beginner: 'Beginner',
            intermediate: 'Gemiddeld',
            advanced: 'Gevorderd'
        },
        button: 'Genereer Nieuw Debat',
        noDebates: {
            title: 'Klaar om te Argumenteren?',
            description: 'Voer een onderwerp en complexiteit in om uw eerste debatscenario te genereren.',
        },
        affirmativeStance: 'Bevestigend Standpunt',
        negativeStance: 'Negatief Standpunt',
        guidingQuestions: 'Leidende Vragen',
        rules: 'Debatregels',
        toastDeleted: 'Debat verwijderd.',
        toastDeleteFailed: 'Kon debat niet verwijderen.',
        deleteDialog: {
            title: 'Dit debat verwijderen?',
            description: 'Deze actie is permanent en kan niet ongedaan worden gemaakt.',
        },
        startSession: "Start Live Sessie",
        manageSession: "Beheer Sessie",
        turnStructureTitle: "Debatbeurtstructuur",
        currentTurn: "Huidige Beurt",
        notStarted: "Het debat is nog niet begonnen",
        paused: "Debat Gepauzeerd",
        start: "Start Debat",
        nextTurn: "Volgende Beurt",
        pause: "Pauze",
        resume: "Hervat",
        liveSession: {
            title: "Debatsessie bezig",
            description: "Deel deze QR-code of link met uw studenten om het debat te starten.",
            qrCode: "QR-code",
            link: "Directe link",
            copy: "Kopiëren",
            copied: "Gekopieerd!",
            studentsConnected: "Verbonden studenten",
            noStudentsYet: "Nog geen studenten verbonden.",
            affirmative: 'Voor',
            negative: 'Tegen',
            unassigned: 'Niet Toegewezen',
            both: 'Beide',
            teacher: 'Docent',
            closeSession: "Sessie sluiten",
            sessionClosed: "Sessie is gesloten."
        }
    },
    digitalConviviality: {
        title: 'Digitaal Burgerschap',
        description: 'Hulpmiddelen om positief en verantwoord online gedrag te bevorderen.',
        activities: {
            title: 'Activiteiten',
            description: 'Genereer een activiteit om digitale burgerschapsvaardigheden te oefenen.',
        },
        conflictSimulation: {
            title: 'Conflictsimulatie',
            description: 'Oefen met het omgaan met moeilijke online situaties door een hypothetisch conflictscenario te genereren.',
            topicsLabel: 'Conflictonderwerpen (Optioneel)',
            topicsPlaceholder: 'bv. cyberpesten, desinformatie, plagiaat',
            button: 'Genereer Scenario',
            scenarioTitle: 'Gegenereerd Scenario',
            strategiesTitle: 'Interventiestrategieën',
            strategyLabel: 'Strategie',
            outcomeLabel: 'Gesimuleerd Resultaat',
            noScenario: {
                title: 'Klaar om te Oefenen?',
                description: 'Genereer een scenario om uw conflictoplossende vaardigheden te oefenen.',
            },
            deleteDialog: {
                title: 'Dit scenario verwijderen?',
                description: 'Dit zal dit conflictscenario permanent uit uw geschiedenis verwijderen.',
                confirm: 'Verwijderen',
            },
            history: {
                title: 'Scenario Geschiedenis'
            }
        },
        pact: {
            title: 'Digitaal Pact',
            description: 'Genereer gezamenlijk een set klassenregels voor gezonde digitale interactie.',
            studentCountLabel: 'Aantal Studenten',
            mainConcernsLabel: 'Belangrijkste Zorgen (Optioneel)',
            mainConcernsPlaceholder: 'bv. gebruik van sociale media, respect voor privacy',
            button: 'Genereer Conceptpact',
            saveDraftButton: 'Concept Opslaan',
            publishButton: 'Publiceren',
            republishButton: 'Herpubliceren',
            publishedAt: 'Gepubliceerd op {date} (v{version})',
            noPacts: {
                title: 'Klaar om een Pact te Sluiten?',
                description: 'Stel uw klasparameters in en genereer een concept van uw digitaal convivencia pact.'
            },
            deleteDialog: {
                title: 'Dit Pact Verwijderen?',
                description: 'Dit zal het gegenereerde pact permanent verwijderen.',
                confirm: 'Verwijderen'
            },
            history: {
                title: 'Pactgeschiedenis',
                principles: 'Leidende Principes',
                norms: 'Specifieke Normen',
                consequences: 'Herstellende Consequenties',
                level: 'Niveau',
                restorativeAction: 'Herstellende Actie'
            }
        },
        typeLabel: 'Type Activiteit',
        typePlaceholder: 'Selecteer een type...',
        types: {
            'netiquette-challenge': 'Netiquette-uitdaging',
            'digital-collaboration': 'Digitaal Samenwerkingsspel',
            'positive-messaging': 'Herschrijver van Positieve Berichten'
        },
        customPromptLabel: 'Specifieke Focus (Optioneel)',
        customPromptPlaceholder: 'bv. Focus op reacties op sociale media...',
        button: 'Genereer Activiteit',
        history: {
            title: 'Activiteitengeschiedenis',
            pedagogicalObjectives: 'Pedagogische Doelstellingen',
            materials: 'Materialen',
            noMaterials: 'Geen materialen verstrekt.',
            steps: 'Stappen',
            studentInstructions: 'Instructies voor Studenten',
        },
        noActivities: {
            title: 'Klaar om Goede Digitale Gewoonten te Bevorderen?',
            description: 'Selecteer hierboven een activiteitstype om uw eerste oefening in digitaal burgerschap te genereren.'
        },
        deleteDialog: {
            title: 'Deze activiteit verwijderen?',
            description: 'Deze actie is permanent en kan niet ongedaan worden gemaakt.',
            confirm: 'Verwijderen'
        }
    },
    suggestions: {
        button: 'Stel voor met AI',
        toastSuccess: 'Onderwerp voorgesteld!'
    }
} as const;
