
export default {
    title: 'Evaluaties',
    tagline: 'Bekijk en evalueer de deelname van studenten.',
    evaluateButton: 'Evalueer',
    evaluatedStatus: 'Geëvalueerd',
    rejectedStatus: 'Afgewezen',
    noChallenges: 'Nog geen uitdagingen geregistreerd voor deze student.',
    noEvaluations: {
      title: 'Nog Geen Evaluaties',
      description:
        'Zodra een student een uitdaging accepteert, kun je deze hier evalueren.',
    },
    evaluationDialog: {
      title: 'Evalueer Uitdaging',
      forStudent: 'voor {name}',
      challenge: 'Uitdaging',
      rating: 'Beoordeling',
      feedback: 'Feedback',
      feedbackPlaceholder: 'Voer hier uw feedback in...',
      saveButton: 'Sla Evaluatie op',
      mood: 'Stemming van de Student',
    },
    ratings: {
      needsSupport: 'Heeft Ondersteuning Nodig',
      metExpectations: 'Voldoet aan Verwachtingen',
      exceededExpectations: 'Overtreft Verwachtingen',
    },
    moods: {
      enthusiastic: 'Enthousiast',
      focused: 'Geconcentreerd',
      nervous: 'Nerveus',
      frustrated: 'Gefrustreerd',
      happy: 'Blij',
      tired: 'Moe',
    },
    pagination: {
        previous: 'Vorige',
        next: 'Volgende',
        page: 'Pagina {currentPage} van {totalPages}',
    }
} as const;
