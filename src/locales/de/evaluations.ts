export default {
    title: 'Bewertungen',
    tagline: 'Überprüfen und bewerten Sie die Teilnahme der Schüler.',
    evaluateButton: 'Bewerten',
    evaluatedStatus: 'Bewertet',
    rejectedStatus: 'Abgelehnt',
    noChallenges: 'Noch keine Herausforderungen für diesen Schüler aufgezeichnet.',
    noEvaluations: {
      title: 'Noch keine Bewertungen',
      description:
        'Sobald ein Schüler eine Herausforderung annimmt, können Sie sie hier bewerten.',
    },
    evaluationDialog: {
      title: 'Herausforderung bewerten',
      forStudent: 'für {name}',
      challenge: 'Herausforderung',
      rating: 'Bewertung',
      feedback: 'Feedback',
      feedbackPlaceholder: 'Geben Sie hier Ihr Feedback ein...',
      saveButton: 'Bewertung speichern',
      mood: 'Stimmung des Schülers',
    },
    ratings: {
      needsSupport: 'Benötigt Unterstützung',
      metExpectations: 'Erwartungen erfüllt',
      exceededExpectations: 'Erwartungen übertroffen',
    },
    moods: {
      enthusiastic: 'Begeistert',
      focused: 'Konzentriert',
      nervous: 'Nervös',
      frustrated: 'Frustriert',
      happy: 'Glücklich',
      tired: 'Müde',
    },
    pagination: {
        previous: 'Zurück',
        next: 'Weiter',
        page: 'Seite {currentPage} von {totalPages}',
    }
} as const;
