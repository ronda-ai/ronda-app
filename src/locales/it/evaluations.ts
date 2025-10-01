export default {
    title: 'Valutazioni',
    tagline: 'Rivedi e valuta la partecipazione degli studenti.',
    evaluateButton: 'Valuta',
    evaluatedStatus: 'Valutato',
    rejectedStatus: 'Rifiutato',
    noChallenges: 'Nessuna sfida registrata per questo studente ancora.',
    noEvaluations: {
      title: 'Ancora Nessuna Valutazione',
      description:
        'Una volta che uno studente accetta una sfida, puoi valutarla qui.',
    },
    evaluationDialog: {
      title: 'Valuta Sfida',
      forStudent: 'per {name}',
      challenge: 'Sfida',
      rating: 'Valutazione',
      feedback: 'Feedback',
      feedbackPlaceholder: 'Inserisci qui il tuo feedback...',
      saveButton: 'Salva Valutazione',
      mood: 'Umore dello Studente',
    },
    ratings: {
      needsSupport: 'Necessita di Supporto',
      metExpectations: 'Ha Raggiunto le Aspettative',
      exceededExpectations: 'Ha Superato le Aspettative',
    },
    moods: {
      enthusiastic: 'Entusiasta',
      focused: 'Concentrato',
      nervous: 'Nervoso',
      frustrated: 'Frustrato',
      happy: 'Felice',
      tired: 'Stanco',
    },
    pagination: {
        previous: 'Precedente',
        next: 'Successivo',
        page: 'Pagina {currentPage} di {totalPages}',
    }
} as const;
