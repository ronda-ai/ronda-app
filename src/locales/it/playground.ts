

export default {
    title: 'Area Giochi',
    tagline: 'Partecipa a giochi divertenti ed educativi con l\'IA.',
    riddleBattle: {
        title: 'Battaglia di Indovinelli',
        description: 'Genera una coppia di indovinelli per due squadre da risolvere. Chi sarà più veloce?',
        topicLabel: 'Argomento dell\'Indovinello (Opzionale)',
        topicPlaceholder: 'es. Animali, Spazio, Storia',
        button: 'Inizia Nuova Battaglia',
        battleTitle: 'Battaglia di Indovinelli!',
        topic: 'Argomento',
        teamBlue: 'Squadra Blu',
        teamRed: 'Squadra Rossa',
        showAnswer: 'Mostra Risposta',
        hideAnswer: 'Nascondi Risposta',
        toastDeleted: 'Battaglia eliminata.',
        toastDeleteFailed: 'Impossibile eliminare la battaglia.',
        toastEvaluationSaved: 'Valutazione salvata.',
        toastEvaluationFailed: 'Impossibile salvare la valutazione.',
        noBattles: {
            title: 'Pronto per una Sfida?',
            description: 'Clicca il pulsante qui sopra per iniziare la prima Battaglia di Indovinelli.',
        },
        deleteDialog: {
            title: 'Eliminare questa battaglia?',
            description: 'Questa azione è permanente e non può essere annullata.',
        },
        evaluation: {
            title: 'Valutazione',
            winner: 'Vincitore',
            winnerLabel: 'Dichiara Vincitore',
            winnerPlaceholder: 'Seleziona un vincitore...',
            tie: 'Pareggio',
            moodLabel: 'Atmosfera della Competizione',
            moodPlaceholder: 'Seleziona l\'atmosfera...',
            feedbackLabel: 'Feedback',
            feedbackPlaceholder: 'Come è andato il gioco? È stato giusto?',
            moods: {
                competitive: 'Competitiva',
                fun: 'Divertente',
                collaborative: 'Collaborativa',
                tense: 'Tesa',
                relaxed: 'Rilassata',
            },
            confirm: 'Conferma'
        }
    },
    lightningRound: {
        title: 'Round Lampo',
        description: 'Un gioco veloce con sfide divertenti per energizzare la classe.',
        durationLabel: 'Durata del Round (secondi)',
        intervalLabel: 'Intervallo Sfida (secondi)',
        categoryLabel: 'Categoria Sfida',
        start: 'Inizia Round Lampo!',
        pause: 'Pausa',
        resume: 'Riprendi',
        reset: 'Resetta',
        noStudentsError: 'Sono necessari almeno 2 studenti presenti per giocare.',
        toastDeleted: 'Round eliminato.',
        toastDeleteFailed: 'Impossibile eliminare il round.',
        categories: {
            sound: 'Suoni',
            face: 'Facce',
            gesture: 'Gesti',
            imitation: 'Imitazioni',
        },
        gameScreen: {
            yourTurn: 'è il tuo turno!',
        },
        history: {
            title: 'Cronologia Round',
            description: 'Rivedi i round generati in precedenza.',
            roundFor: 'Round del {date}',
            noRounds: 'Nessun round giocato ancora.',
        },
        deleteDialog: {
            title: 'Eliminare questo round?',
            description: 'Questa azione è permanente e non può essere annullata.',
        },
    },
    collaborativeStory: {
        title: 'Narrazione Collaborativa',
        setup: {
            title: 'Inizia una Nuova Storia',
            description: 'Definisci i personaggi e l\'ambientazione per iniziare la tua avventura.',
            charactersLabel: 'Personaggi Principali',
            charactersPlaceholder: 'es. Un cavaliere coraggioso, un drago intelligente',
            settingLabel: 'Ambientazione Iniziale',
            settingPlaceholder: 'es. Una grotta buia e spaventosa',
            lengthLabel: 'Lunghezza Capitolo',
            lengths: {
                short: 'Breve',
                medium: 'Medio',
                long: 'Lungo',
            },
            startButton: 'Inizia Storia',
            allowDialogues: 'Consenti dialoghi nella storia',
            narratorVoiceLabel: "Voce del Narratore",
            narratorVoicePlaceholder: "Seleziona una voce...",
            customPromptLabel: "Prompt Personalizzato (Opzionale)",
            customPromptPlaceholder: "es. La storia deve essere una commedia, non deve contenere violenza...",
            negativePromptLabel: "Prompt Negativo (Opzionale)",
            negativePromptPlaceholder: "es. Evitare finali tristi, non menzionare i ragni...",
        },
        contribute: {
            title: 'Cosa Succede Dopo?',
            description: 'Aggiungi le idee degli studenti per il prossimo capitolo.',
            placeholder: 'Scrivi l\'idea di uno studente e premi invio...',
            continueButton: 'Continua Storia',
            suggestionButton: 'Suggerimento IA'
        },
        story: {
            titlePlaceholder: 'La Storia Apparirà Qui',
            storyPlaceholder: 'Inizia definendo i tuoi personaggi e l\'ambientazione, poi avvia la storia!',
        },
        history: {
            title: 'Cronologia Storie',
            createdAt: 'Creata',
            noStories: 'Ancora nessuna storia.',
        },
        deleteDialog: {
            title: 'Eliminare questa storia?',
            description: 'Questa azione è permanente e non può essere annullata.',
        },
        toastDeleted: 'Storia eliminata.',
        toastDeleteFailed: 'Impossibile eliminare la storia.',
        toastNarrationSuccess: 'La narrazione completa della storia è in fase di generazione e apparirà a breve.',
        newStoryButton: 'Inizia una Nuova Storia',
        narrateButton: 'Narra Capitolo',
        'narrateButton--loading': 'Narrazione in corso...',
        narrateFullStoryButton: 'Narra come Audiolibro',
        suggestions: {
            button: 'Suggerisci con l\'IA',
            toastSuccess: 'Idee suggerite!'
        },
        finishButton: 'Termina Storia',
        test: {
            createButton: 'Crea Test dalla Storia',
            modalTitle: 'Genera Test',
            modalDescription: 'Seleziona il tipo di test che vuoi generare da questa storia.',
            typeLabel: 'Tipo di Test',
            types: {
                title: 'Tipo di Test',
                'multiple-choice': 'Scelta Multipla',
                'true-false': 'Vero o Falso',
                'open-ended': 'Domande Aperte',
                'mixed': 'Misto',
            },
            generateButton: 'Genera Test',
            generateError: 'Impossibile generare il test.',
            saveSuccess: 'Test salvato con successo!',
            saveError: 'Impossibile salvare il test.',
            previewTitle: 'Anteprima del Test Generato',
            previewDescription: 'Rivedi il test generato. È già stato salvato e può essere visualizzato nella pagina Test.',
            rubricTitle: 'Rubrica di Valutazione',
            saveButton: 'Salva Test',
        },
        illustrateButton: 'Illustra',
    },
    debateGenerator: {
        title: 'Generatore di Dibattiti',
        description: 'Genera scenari di dibattito educativi per incoraggiare il pensiero critico.',
        topicLabel: 'Argomento del Dibattito',
        topicPlaceholder: 'es. Gli animali dovrebbero essere tenuti negli zoo?',
        complexityLabel: 'Complessità',
        complexities: {
            beginner: 'Principiante',
            intermediate: 'Intermedio',
            advanced: 'Avanzato'
        },
        button: 'Genera Nuovo Dibattito',
        noDebates: {
            title: 'Pronto a Discutere?',
            description: 'Inserisci un argomento e una complessità per generare il tuo primo scenario di dibattito.',
        },
        affirmativeStance: 'Posizione Affermativa',
        negativeStance: 'Posizione Negativa',
        guidingQuestions: 'Domande Guida',
        rules: 'Regole del Dibattito',
        toastDeleted: 'Dibattito eliminato.',
        toastDeleteFailed: 'Impossibile eliminare il dibattito.',
        deleteDialog: {
            title: 'Eliminare questo dibattito?',
            description: 'Questa azione è permanente e non può essere annullata.',
        },
        startSession: "Inizia Sessione dal Vivo",
        manageSession: "Gestisci Sessione",
        turnStructureTitle: "Struttura dei Turni del Dibattito",
        currentTurn: "Turno Attuale",
        notStarted: "Il dibattito non è ancora iniziato",
        paused: "Dibattito in Pausa",
        start: "Inizia Dibattito",
        nextTurn: "Turno Successivo",
        pause: "Pausa",
        resume: "Riprendi",
        liveSession: {
            title: "Sessione di Dibattito in Corso",
            description: "Condividi questo codice QR o link con i tuoi studenti per iniziare il dibattito.",
            qrCode: "Codice QR",
            link: "Link Diretto",
            copy: "Copia",
            copied: "Copiato!",
            studentsConnected: "Studenti Connessi",
            noStudentsYet: "Nessuno studente si è ancora connesso.",
            affirmative: 'A Favore',
            negative: 'Contro',
            unassigned: 'Non Assegnato',
            both: 'Entrambi',
            teacher: 'Insegnante',
            closeSession: "Chiudi Sessione",
            sessionClosed: "La sessione è stata chiusa."
        }
    },
    digitalConviviality: {
        title: 'Cittadinanza Digitale',
        description: 'Strumenti per promuovere un comportamento online positivo e responsabile.',
        activities: {
            title: 'Attività',
            description: 'Genera un\'attività per praticare le competenze di cittadinanza digitale.',
        },
        conflictSimulation: {
            title: 'Simulazione di Conflitti',
            description: 'Esercitati a gestire situazioni online difficili generando uno scenario di conflitto ipotetico.',
            topicsLabel: 'Argomenti del Conflitto (Opzionale)',
            topicsPlaceholder: 'es. cyberbullismo, disinformazione, plagio',
            button: 'Genera Scenario',
            scenarioTitle: 'Scenario Generato',
            strategiesTitle: 'Strategie di Intervento',
            strategyLabel: 'Strategia',
            outcomeLabel: 'Risultato Simulata',
            noScenario: {
                title: 'Pronto a Esercitarti?',
                description: 'Genera uno scenario per esercitare le tue abilità di risoluzione dei conflitti.',
            },
            deleteDialog: {
                title: 'Eliminare questo scenario?',
                description: 'Questo eliminerà permanentemente questo scenario di conflitto dalla tua cronologia.',
                confirm: 'Elimina',
            },
            history: {
                title: 'Cronologia Scenari'
            }
        },
        pact: {
            title: 'Patto Digitale',
            description: 'Genera collaborativamente un insieme di regole di classe per un\'interazione digitale sana.',
            studentCountLabel: 'Numero di Studenti',
            mainConcernsLabel: 'Preoccupazioni Principali (Opzionale)',
            mainConcernsPlaceholder: 'es. uso dei social media, rispetto della privacy',
            button: 'Genera Bozza del Patto',
            saveDraftButton: 'Salva Bozza',
            publishButton: 'Pubblica',
            republishButton: 'Ripubblica',
            publishedAt: 'Pubblicato il {date} (v{version})',
            noPacts: {
                title: 'Pronto a Creare un Patto?',
                description: 'Imposta i parametri della tua classe e genera una bozza del tuo patto di convivenza digitale.'
            },
            deleteDialog: {
                title: 'Eliminare questo Patto?',
                description: 'Questo eliminerà permanentemente il patto generato.',
                confirm: 'Elimina'
            },
            history: {
                title: 'Cronologia Patti',
                principles: 'Principi Guida',
                norms: 'Norme Specifiche',
                consequences: 'Conseguenze Riparative',
                level: 'Livello',
                restorativeAction: 'Azione Riparativa'
            }
        },
        typeLabel: 'Tipo di Attività',
        typePlaceholder: 'Seleziona un tipo...',
        types: {
            'netiquette-challenge': 'Sfida di Netiquette',
            'digital-collaboration': 'Gioco di Collaborazione Digitale',
            'positive-messaging': 'Riformulatore di Messaggi Positivi'
        },
        customPromptLabel: 'Focus Specifico (Opzionale)',
        customPromptPlaceholder: 'es. Concentrarsi sui commenti dei social media...',
        button: 'Genera Attività',
        history: {
            title: 'Cronologia Attività',
            studentInstructions: 'Istruzioni per gli Studenti',
            pedagogicalObjectives: 'Obiettivi Pedagogici',
            materials: 'Materiali',
            noMaterials: 'Nessun materiale fornito.',
            steps: 'Passaggi',
        },
        noActivities: {
            title: 'Pronto a Promuovere Buone Abitudini Digitali?',
            description: 'Seleziona un tipo di attività qui sopra per generare il tuo primo esercizio di cittadinanza digitale.'
        },
        deleteDialog: {
            title: 'Eliminare questa attività?',
            description: 'Questa azione è permanente e non può essere annullata.',
            confirm: 'Elimina'
        }
    },
    suggestions: {
        button: 'Suggerisci con l\'IA',
        toastSuccess: 'Argomento suggerito!'
    }
} as const;
