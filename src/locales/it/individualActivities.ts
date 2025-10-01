export default {
    title: 'Attività Individuali',
    tagline: 'Progetta attività personalizzate per uno studente specifico.',
    step0: {
        title: 'Seleziona uno Studente',
        description: 'Scegli uno studente per iniziare a generare attività personalizzate.',
    },
    step1: {
      selectLabel: 'Studente',
      selectPlaceholder: 'Seleziona uno studente...',
    },
    generator: {
        title: 'Generatore di Attività per {name}',
        description: 'Definisci i parametri per l\'attività, o usa l\'IA per suggerire idee.',
        topicLabel: 'Argomento Accademico',
        topicPlaceholder: 'es. Frazioni, Fotosintesi',
        skillsLabel: 'Competenze da Sviluppare',
        skillsPlaceholder: 'es. Pensiero Critico, Collaborazione',
        themesLabel: 'Temi di Ingaggio',
        themesPlaceholder: 'es. Spazio, Dinosauri, Misteri',
        customPromptLabel: 'Prompt Personalizzato (Opzionale)',
        customPromptPlaceholder: 'es. Concentrati su elementi visivi, crea un\'attività pratica',
        negativePromptLabel: 'Prompt Negativo (Opzionale)',
        negativePromptPlaceholder: 'es. Evita compiti di scrittura, non menzionare i ragni',
        generateButton: 'Genera Attività',
        toastSuccess: 'Attività generate con successo!',
        noSkills: 'Nessuna competenza ancora disponibile.',
        addSkills: 'Aggiungi nuove competenze'
    },
    suggestions: {
        button: 'Suggerisci con l\'IA',
        toastSuccess: 'Suggerimenti inseriti!',
    },
    history: {
        title: "Storico Piani di Attività",
        description: "Rivedi e gestisci i piani di attività generati in precedenza per {name}.",
        toastDeleted: 'Piano di attività eliminato.',
        toastDeleteFailed: 'Impossibile eliminare il piano di attività.',
        noResults: {
            title: "Ancora Nessun Piano di Attività",
            description: "Genera il primo piano per questo studente per vedere qui la sua cronologia."
        },
        deleteDialog: {
            title: "Eliminare questo piano di attività?",
            description: "Questa azione non può essere annullata. Eliminerà permanentemente il piano di attività.",
        },
        stepDialog: {
            title: 'Valuta Passo Attività',
            description: 'Come è andata questa attività?',
            status: 'Stato',
            feedback: 'Feedback sul passo (opzionale)',
            feedbackPlaceholder: 'Aggiungi una nota su questa attività...',
            saveButton: 'Salva Valutazione',
            statuses: {
                pending: 'In attesa',
                'in-progress': 'In corso',
                completed: 'Completata',
                skipped: 'Saltata'
            },
        },
    },
    democratizer: {
      title: 'Democratizzatore di Risorse',
      descriptionSingle: 'Adatta questa attività per renderla più accessibile.',
      descriptionAll: 'Adatta tutte le attività di questo piano per renderle più accessibili in base a diverse esigenze o limitazioni di risorse.',
      descriptionSelected: 'Adatta le {count} attività selezionate in questo piano per renderle più accessibili.',
      prompt: 'Seleziona un\'opzione di adattamento da applicare alle attività.',
      selectPlaceholder: 'Scegli un adattamento...',
      activitiesToAdapt: "Attività da Adattare:",
      adaptButton: 'Adatta Attività',
      toastSuccess: 'Attività adattate con successo!',
      options: {
        commonMaterials: 'Adatta per materiali domestici comuni',
        lowEnergy: 'Adatta per scenari a bassa energia/calmi',
        socialInteraction: 'Aumenta la componente di interazione sociale',
        simpleInstructions: 'Semplifica le istruzioni',
      },
    }
} as const;
