
export default {
    title: 'Attività di Gruppo',
    tagline: 'Forma gruppi in modo intelligente e genera attività collaborative.',
    generator: {
      title: 'Generatore di Suggerimenti di Gruppo',
      description: 'L\'IA analizzerà la tua classe per suggerire gruppi equilibrati e un consiglio di facilitazione.',
      button: 'Genera Nuovi Suggerimenti',
    },
    manualMode: {
        title: 'Costruttore Manuale di Gruppi',
        description: 'Crea i tuoi gruppi e ottieni assistenza dall\'IA.',
        selectLabel: 'Seleziona studenti per un nuovo gruppo',
        selectPlaceholder: 'Scegli studenti...',
        createGroupButton: 'Crea Gruppo',
        groupTitle: 'Nuovo Gruppo',
        analyzeButton: 'Analizza Dinamiche',
        generateActivityButton: 'Genera Attività',
        warningTitle: 'Allerta Relazione',
        conflictWarning: '{nameA} e {nameB} hanno un conflitto registrato. Procedi con cautela.',
        skillsLabel: 'Competenze Collaborative da Sviluppare',
        skillsPlaceholder: 'es. Comunicazione, Leadership',
        themesLabel: 'Tema dell\'Attività (Opzionale)',
        themesPlaceholder: 'es. Missione Spaziale, Risoluzione di Misteri',
        activityGeneratedToast: 'Attività generata con successo!',
    },
    aiSuggestions: {
        title: 'Suggerimenti Generati dall\'IA',
    },
    history: {
      title: 'Cronologia Suggerimenti',
      description: 'Rivedi i suggerimenti di gruppo generati in precedenza.',
      suggestionFor: 'Suggerimento del {date}',
      teacherTipTitle: 'Consiglio del Facilitatore',
      suggestedGroups: 'Gruppi Suggeriti',
      group: 'Gruppo',
      suggestedSkills: 'Competenze Collaborative Suggerite',
      suggestedThemes: 'Temi di Attività Suggeriti',
      useSuggestionButton: 'Usa questo Suggerimento',
      suggestionUsedToast: 'Suggerimento applicato al costruttore manuale di gruppi!',
      noResults: {
        title: 'Pronti a Collaborare?',
        description: 'Clicca il pulsante qui sopra per generare il primo set di suggerimenti di gruppo per la tua classe.',
      },
      toastDeleted: 'Suggerimento eliminato.',
      toastDeleteFailed: 'Impossibile eliminare il suggerimento.',
      deleteDialog: {
        title: 'Eliminare questo suggerimento?',
        description: 'Questa azione è permanente e non può essere annullata.',
      },
    },
    viewActivitiesButton: 'Visualizza Attività Generate',
    details: {
        title: 'Attività Generate per il Gruppo',
        description: 'Le seguenti attività sono state generate per {members}.',
        deleteButton: 'Elimina Piano Attività',
    }
} as const;
