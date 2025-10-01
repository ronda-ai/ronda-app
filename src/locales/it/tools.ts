
export default {
    title: 'Strumenti',
    tagline: 'Usa gli strumenti AI per potenziare il tuo insegnamento.',
    activityAdapter: {
      title: 'Adattatore di Attività',
      description: 'Adatta qualsiasi attività esistente per soddisfare al meglio le esigenze della tua classe, sia per studenti specifici che per l\'intero gruppo.',
      placeholder: 'Incolla o scrivi qui l\'attività che vuoi adattare...',
      activityLabel: 'Attività da Adattare',
      existingActivityLabel: 'Seleziona un\'attività o un test esistente',
      existingActivityPlaceholder: 'Scegli un\'attività/test da riassumere e adattare...',
      studentLabel: 'Adatta per Studenti Specifici (Opzionale)',
      studentPlaceholder: 'Seleziona studenti...',
      customPromptLabel: 'Obiettivo Specifico per l\'Adattamento (Opzionale)',
      customPromptPlaceholder: 'es. Rendilo un gioco, concentra sulla scrittura...',
      button: 'Adatta Attività',
      generatingTitle: 'Generazione Adattamenti in corso...',
      activityType: 'Attività'
    },
     rubricGenerator: {
      title: 'Generatore di Rubriche',
      description: 'Crea una rubrica di valutazione giusta ed equilibrata per qualsiasi attività.',
      placeholder: 'Descrivi l\'attività per cui generare una rubrica...',
      button: 'Genera Rubrica',
      testType: 'Test'
    },
    history: {
      title: 'Cronologia',
      descriptionAdapter: 'Rivedi le attività adattate in precedenza.',
      descriptionRubric: 'Rivedi le rubriche generate in precedenza.',
      reasoning: 'Motivazione',
      criterion: 'Criterio',
      excellent: 'Eccellente',
      satisfactory: 'Soddisfacente',
      needsImprovement: 'Da Migliorare',
      scoringGuide: 'Guida alla Punteggiatura',
      toastDeleteSuccess: 'Eliminazione riuscita.',
      toastDeleteFailed: 'Eliminazione non riuscita.',
      noResults: {
        title: 'Ancora Nessun Risultato',
        description: 'Usa lo strumento a sinistra per generare il tuo primo risultato.',
      },
      deleteDialogAdapter: {
          title: 'Eliminare questo adattamento?',
          description: 'Questa azione non può essere annullata. Eliminerà permanentemente l\'adattamento dell\'attività.',
          confirm: 'Elimina'
      },
      deleteDialogRubric: {
          title: 'Eliminare questa rubrica?',
          description: 'Questa azione non può essere annullata. Eliminerà permanentemente la rubrica generata.',
          confirm: 'Elimina'
      }
    }
} as const;
