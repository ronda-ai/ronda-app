
export default {
    title: 'Laboratorio PBL',
    tagline: 'Orchestra progetti complessi da una singola idea.',
    tabs: {
        phase1: 'Fase 1: Pianificazione',
        phase2: 'Fase 2: Squadre',
        phase3: 'Fase 3: Sviluppo',
        phase4: 'Fase 4: Valutazione',
    },
    phase1: {
        form: {
            title: 'Fase 1: Pianificatore di Progetti',
            description: 'Definisci un argomento centrale e lascia che l\'IA costruisca un piano di progetto strutturato.',
            topicLabel: 'Argomento Centrale del Progetto',
            topicPlaceholder: 'es. Il cambiamento climatico nella nostra città, Storia dei videogiochi...',
            skillsLabel: 'Competenze Chiave da Sviluppare',
            noSkills: 'Nessuna competenza ancora definita. Vai al Generatore di Attività per aggiungerne alcune.',
            durationLabel: 'Durata Stimata',
            durations: {
                'oneWeek': '1 Settimana',
                'twoWeeks': '2 Settimane',
                'oneMonth': '1 Mese',
            },
            generateButton: 'Genera Piano di Progetto'
        },
        generating: {
            title: 'Generazione del Piano di Progetto...'
        },
    },
    phase2: {
        title: 'Fase 2: Formazione delle Squadre',
        description: 'Usa l\'IA per formare gruppi strategici basati sui profili e le relazioni dei tuoi studenti.',
        selectProject: 'Seleziona Progetto',
        selectProjectPlaceholder: 'Scegli un progetto per formare le squadre...',
        teamSize: 'Dimensione della Squadra',
        groupingCriteria: 'Criteri di Raggruppamento',
        criteria: {
            balanced: 'Squadre Bilanciate',
            'social-remediation': 'Risanamento Sociale',
            synergy: 'Sinergia di Interessi',
        },
        generateButton: 'Genera Squadre',
        noProjectSelected: 'Seleziona prima un progetto.',
        results: {
            title: 'Squadre Suggerite',
            teamName: 'Squadra {name}',
            rationale: 'Logica della Squadra',
            formation: 'Formazione',
            deleteDialog: {
                title: 'Eliminare questa formazione di squadra?',
                description: 'Questa azione non può essere annullata. Eliminerà permanentemente la formazione della squadra.',
            },
        },
        table: {
            student: 'Studente',
            suggestedRole: 'Ruolo Suggerito',
            justification: 'Giustificazione',
        }
    },
    phase3: {
        title: 'Fase 3: Scaffolding Dinamico',
        description: 'Genera piani di intervento rapidi per le squadre che affrontano sfide durante lo sviluppo del progetto.',
        selectTeam: 'Squadra su cui intervenire',
        selectTeamPlaceholder: 'Seleziona studenti...',
        problemLabel: 'Descrivi il Problema',
        problemPlaceholder: 'es. La squadra è bloccata, c\'è un conflitto, uno studente è demotivato...',
        generateButton: 'Genera Intervento',
        suggestionTitle: 'Intervento Suggerito',
        microActivity: 'Micro-Attività per Sbloccare',
        guidingQuestions: 'Domande Guida per l\'Insegnante',
        noSuggestion: 'Il piano di intervento generato apparirà qui.',
    },
    phase4: {
        title: 'Fase 4: Generatore di Rubriche',
        description: 'Genera una rubrica di valutazione dettagliata per il prodotto finale di un progetto.',
        generateButton: 'Genera Rubrica',
        rubricTitle: 'Rubrica di Valutazione Suggerita',
        noRubric: 'La rubrica generata apparirà qui.',
    },
    history: {
        title: 'Cronologia Progetti',
        description: 'Rivedi e gestisci i progetti generati in precedenza.',
        noResults: {
            title: 'Ancora Nessun Progetto',
            description: 'Usa il modulo per generare il tuo primo piano di Apprendimento Basato su Progetti.'
        },
        phases: 'Fasi del Progetto',
        milestones: 'Pietre Miliari',
        finalProduct: 'Suggerimento Prodotto Finale',
        deleteDialog: {
            title: 'Eliminare questo piano di progetto?',
            description: 'Questa azione non può essere annullata. Eliminerà permanentemente il piano di progetto.',
        },
    },
} as const;
