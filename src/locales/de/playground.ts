export default {
    title: 'Unterrichtsaktivitäten',
    tagline: 'Gestalten Sie individuelle Aktivitäten mit Ihrem KI-Lehrplanassistenten.',
    riddleBattle: {
        title: 'Rätsel-Kampf',
        description: 'Generieren Sie ein Rätselpaar, das zwei Teams lösen müssen. Wer wird schneller sein?',
        topicLabel: 'Rätsel-Thema (Optional)',
        topicPlaceholder: 'z.B. Tiere, Weltraum, Geschichte',
        button: 'Neuen Kampf starten',
        battleTitle: 'Rätsel-Kampf!',
        topic: 'Thema',
        teamBlue: 'Team Blau',
        teamRed: 'Team Rot',
        showAnswer: 'Antwort anzeigen',
        hideAnswer: 'Antwort verbergen',
        toastDeleted: 'Kampf gelöscht.',
        toastDeleteFailed: 'Fehler beim Löschen des Kampfes.',
        toastEvaluationSaved: 'Bewertung gespeichert.',
        toastEvaluationFailed: 'Fehler beim Speichern der Bewertung.',
        noBattles: {
            title: 'Bereit für eine Herausforderung?',
            description: 'Klicken Sie auf die Schaltfläche oben, um den ersten Rätsel-Kampf zu starten.',
        },
        deleteDialog: {
            title: 'Diesen Kampf löschen?',
            description: 'Diese Aktion ist dauerhaft und kann nicht rückgängig gemacht werden.',
        },
        evaluation: {
            title: 'Bewertung',
            winner: 'Gewinner',
            winnerLabel: 'Gewinner erklären',
            winnerPlaceholder: 'Einen Gewinner auswählen...',
            tie: 'Unentschieden',
            moodLabel: 'Wettbewerbsatmosphäre',
            moodPlaceholder: 'Die Atmosphäre auswählen...',
            feedbackLabel: 'Feedback',
            feedbackPlaceholder: 'Wie war das Spiel? War es fair?',
            moods: {
                competitive: 'Wettbewerbsorientiert',
                fun: 'Unterhaltsam',
                collaborative: 'Kollaborativ',
                tense: 'Angespannt',
                relaxed: 'Entspannt',
            },
            confirm: 'Bestätigen'
        }
    },
    lightningRound: {
        title: 'Blitzrunde',
        description: 'Ein schnelles Spiel mit lustigen Herausforderungen, um das Klassenzimmer zu beleben.',
        durationLabel: 'Rundendauer (Sekunden)',
        intervalLabel: 'Herausforderungsintervall (Sekunden)',
        categoryLabel: 'Herausforderungskategorie',
        start: 'Blitzrunde starten!',
        pause: 'Pause',
        resume: 'Fortsetzen',
        reset: 'Zurücksetzen',
        noStudentsError: 'Es werden mindestens 2 anwesende Schüler benötigt, um zu spielen.',
        toastDeleted: 'Runde gelöscht.',
        toastDeleteFailed: 'Fehler beim Löschen der Runde.',
        categories: {
            sound: 'Geräusche',
            face: 'Gesichter',
            gesture: 'Gesten',
            imitation: 'Imitationen',
        },
        gameScreen: {
            yourTurn: 'du bist dran!',
        },
        history: {
            title: 'Rundenverlauf',
            description: 'Überprüfen Sie zuvor generierte Runden.',
            roundFor: 'Runde von {date}',
            noRounds: 'Noch keine Runden gespielt.',
        },
        deleteDialog: {
            title: 'Diese Runde löschen?',
            description: 'Diese Aktion ist dauerhaft und kann nicht rückgängig gemacht werden.',
        },
    },
    collaborativeStory: {
        title: 'Kollaboratives Geschichtenerzählen',
        setup: {
            title: 'Eine neue Geschichte beginnen',
            description: 'Definieren Sie die Charaktere und den Schauplatz, um Ihr Abenteuer zu beginnen.',
            charactersLabel: 'Hauptcharaktere',
            charactersPlaceholder: 'z.B. Ein tapferer Ritter, ein kluger Drache',
            settingLabel: 'Anfänglicher Schauplatz',
            settingPlaceholder: 'z.B. Eine dunkle und gruselige Höhle',
            lengthLabel: 'Kapitellänge',
            lengths: {
                short: 'Kurz',
                medium: 'Mittel',
                long: 'Lang',
            },
            startButton: 'Geschichte beginnen',
            allowDialogues: 'Dialoge in der Geschichte zulassen',
            narratorVoiceLabel: "Stimme des Erzählers",
            narratorVoicePlaceholder: "Wählen Sie eine Stimme...",
            customPromptLabel: "Benutzerdefinierte Anweisung (Optional)",
            customPromptPlaceholder: "z.B. Die Geschichte muss eine Komödie sein, sie darf keine Gewalt enthalten...",
            negativePromptLabel: "Negative Anweisung (Optional)",
            negativePromptPlaceholder: "z.B. Traurige Enden vermeiden, keine Spinnen erwähnen...",
        },
        contribute: {
            title: 'Was passiert als Nächstes?',
            description: 'Fügen Sie Schülerideen für das nächste Kapitel hinzu.',
            placeholder: 'Schreiben Sie eine Schüleridee und drücken Sie die Eingabetaste...',
            continueButton: 'Geschichte fortsetzen',
            suggestionButton: 'KI-Vorschlag'
        },
        story: {
            titlePlaceholder: 'Die Geschichte wird hier erscheinen',
            storyPlaceholder: 'Beginnen Sie damit, Ihre Charaktere und Ihren Schauplatz zu definieren, und starten Sie dann die Geschichte!',
        },
        history: {
            title: 'Geschichtsverlauf',
            createdAt: 'Erstellt am',
            noStories: 'Noch keine Geschichten.',
        },
        deleteDialog: {
            title: 'Diese Geschichte löschen?',
            description: 'Diese Aktion ist dauerhaft und kann nicht rückgängig gemacht werden.',
        },
        toastDeleted: 'Geschichte gelöscht.',
        toastDeleteFailed: 'Fehler beim Löschen der Geschichte.',
        toastNarrationSuccess: 'Die vollständige Erzählung der Geschichte wird generiert und erscheint in Kürze.',
        newStoryButton: 'Eine neue Geschichte beginnen',
        narrateButton: 'Kapitel vorlesen',
        'narrateButton--loading': 'Wird erzählt...',
        narrateFullStoryButton: 'Als Hörbuch vorlesen',
        suggestions: {
            button: 'Mit KI vorschlagen',
            toastSuccess: 'Ideen vorgeschlagen!'
        },
        finishButton: 'Geschichte beenden',
        test: {
            createButton: 'Test aus Geschichte erstellen',
            modalTitle: 'Test generieren',
            modalDescription: 'Wählen Sie den Testtyp aus, den Sie aus dieser Geschichte generieren möchten.',
            typeLabel: 'Testtyp',
            types: {
                title: 'Testtyp',
                'multiple-choice': 'Multiple-Choice',
                'true-false': 'Richtig oder Falsch',
                'open-ended': 'Offene Fragen',
                'mixed': 'Gemischt',
            },
            generateButton: 'Test generieren',
            generateError: 'Fehler beim Generieren des Tests.',
            saveSuccess: 'Test erfolgreich gespeichert!',
            saveError: 'Fehler beim Speichern des Tests.',
            previewTitle: 'Vorschau des generierten Tests',
            previewDescription: 'Überprüfen Sie den generierten Test. Er wurde bereits gespeichert und kann auf der Seite „Tests“ angezeigt werden.',
            rubricTitle: 'Bewertungsrubrik',
            saveButton: 'Test speichern',
        },
        illustrateButton: 'Illustrieren',
    },
    debateGenerator: {
        title: 'Debattengenerator',
        description: 'Generieren Sie pädagogische Debattenszenarien, um kritisches Denken zu fördern.',
        topicLabel: 'Debattenthema',
        topicPlaceholder: 'z.B. Sollten Tiere in Zoos gehalten werden?',
        complexityLabel: 'Komplexität',
        complexities: {
            beginner: 'Anfänger',
            intermediate: 'Mittelstufe',
            advanced: 'Fortgeschritten'
        },
        button: 'Neue Debatte generieren',
        noDebates: {
            title: 'Bereit zu argumentieren?',
            description: 'Geben Sie ein Thema und eine Komplexität ein, um Ihr erstes Debattenszenario zu generieren.',
        },
        affirmativeStance: 'Pro-Position',
        negativeStance: 'Contra-Position',
        guidingQuestions: 'Leitfragen',
        rules: 'Debattenregeln',
        toastDeleted: 'Debatte gelöscht.',
        toastDeleteFailed: 'Fehler beim Löschen der Debatte.',
        deleteDialog: {
            title: 'Diese Debatte löschen?',
            description: 'Diese Aktion ist dauerhaft und kann nicht rückgängig gemacht werden.',
        },
        startSession: "Live-Sitzung starten",
        manageSession: "Sitzung verwalten",
        turnStructureTitle: "Debatten-Rundenstruktur",
        currentTurn: "Aktuelle Runde",
        notStarted: "Die Debatte hat noch nicht begonnen",
        paused: "Debatte pausiert",
        start: "Debatte starten",
        nextTurn: "Nächste Runde",
        pause: "Pause",
        resume: "Fortsetzen",
        liveSession: {
            title: "Debattensitzung läuft",
            description: "Teilen Sie diesen QR-Code oder Link mit Ihren Schülern, um die Debatte zu starten.",
            qrCode: "QR-Code",
            link: "Direkter Link",
            copy: "Kopieren",
            copied: "Kopiert!",
            studentsConnected: "Verbundene Schüler",
            noStudentsYet: "Noch keine Schüler verbunden.",
            affirmative: 'Pro',
            negative: 'Contra',
            unassigned: 'Nicht zugewiesen',
            both: 'Beide',
            teacher: 'Lehrer',
            closeSession: "Sitzung schließen",
            sessionClosed: "Sitzung wurde geschlossen."
        }
    },
    digitalConviviality: {
        title: 'Digitale Bürgerkunde',
        description: 'Werkzeuge zur Förderung eines positiven und verantwortungsvollen Online-Verhaltens.',
        activities: {
            title: 'Aktivitäten',
            description: 'Generieren Sie eine Aktivität, um digitale Bürgerkompetenzen zu üben.',
        },
        conflictSimulation: {
            title: 'Konfliktsimulation',
            description: 'Üben Sie den Umgang mit schwierigen Online-Situationen, indem Sie ein hypothetisches Konfliktszenario generieren.',
            topicsLabel: 'Konfliktthemen (Optional)',
            topicsPlaceholder: 'z.B. Cybermobbing, Desinformation, Plagiat',
            button: 'Szenario generieren',
            scenarioTitle: 'Generiertes Szenario',
            strategiesTitle: 'Interventionsstrategien',
            strategyLabel: 'Strategie',
            outcomeLabel: 'Simuliertes Ergebnis',
            noScenario: {
                title: 'Bereit zum Üben?',
                description: 'Generieren Sie ein Szenario, um Ihre Konfliktlösungsfähigkeiten zu üben.',
            },
            deleteDialog: {
                title: 'Dieses Szenario löschen?',
                description: 'Dies löscht dieses Konfliktszenario dauerhaft aus Ihrem Verlauf.',
                confirm: 'Löschen',
            },
            history: {
                title: 'Szenarioverlauf'
            }
        },
        pact: {
            title: 'Digitaler Pakt',
            description: 'Generieren Sie gemeinsam einen Satz von Klassenregeln für eine gesunde digitale Interaktion.',
            studentCountLabel: 'Anzahl der Schüler',
            mainConcernsLabel: 'Hauptanliegen (Optional)',
            mainConcernsPlaceholder: 'z.B. Nutzung sozialer Medien, Achtung der Privatsphäre',
            button: 'Paktentwurf generieren',
            saveDraftButton: 'Entwurf speichern',
            publishButton: 'Veröffentlichen',
            republishButton: 'Erneut veröffentlichen',
            publishedAt: 'Veröffentlicht am {date} (v{version})',
            noPacts: {
                title: 'Bereit für einen Pakt?',
                description: 'Legen Sie die Parameter Ihrer Klasse fest und generieren Sie einen Entwurf Ihres digitalen convivencia Pakts.'
            },
            deleteDialog: {
                title: 'Diesen Pakt löschen?',
                description: 'Dadurch wird der generierte Pakt dauerhaft gelöscht.',
                confirm: 'Löschen'
            },
            history: {
                title: 'Paktverlauf',
                principles: 'Leitprinzipien',
                norms: 'Spezifische Normen',
                consequences: 'Wiederherstellende Konsequenzen',
                level: 'Niveau',
                restorativeAction: 'Wiederherstellende Maßnahme'
            }
        },
        typeLabel: 'Aktivitätstyp',
        typePlaceholder: 'Wählen Sie einen Typ...',
        types: {
            'netiquette-challenge': 'Netiquette-Herausforderung',
            'digital-collaboration': 'Digitales Kollaborationsspiel',
            'positive-messaging': 'Umschreiber für positive Nachrichten'
        },
        customPromptLabel: 'Spezifischer Fokus (Optional)',
        customPromptPlaceholder: 'z.B. Fokus auf Social-Media-Kommentare...',
        button: 'Aktivität generieren',
        history: {
            title: 'Aktivitätsverlauf',
            studentInstructions: 'Anweisungen für Schüler',
            pedagogicalObjectives: 'Pädagogische Ziele',
            materials: 'Materialien',
            noMaterials: 'Keine Materialien angegeben.',
            steps: 'Schritte',
        },
        noActivities: {
            title: 'Bereit, gute digitale Gewohnheiten zu fördern?',
            description: 'Wählen Sie oben einen Aktivitätstyp aus, um Ihre erste Übung zur digitalen Bürgerkunde zu generieren.'
        },
        deleteDialog: {
            title: 'Diese Aktivität löschen?',
            description: 'Diese Aktion ist dauerhaft und kann nicht rückgängig gemacht werden.',
            confirm: 'Löschen'
        }
    },
    suggestions: {
        button: 'Mit KI vorschlagen',
        toastSuccess: 'Thema vorgeschlagen!'
    }
} as const;