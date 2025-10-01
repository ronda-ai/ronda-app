
export default {
    title: 'Oceny',
    tagline: 'Przeglądaj i oceniaj udział uczniów.',
    evaluateButton: 'Oceń',
    evaluatedStatus: 'Oceniono',
    rejectedStatus: 'Odrzucono',
    noChallenges: 'Dla tego ucznia nie zarejestrowano jeszcze żadnych wyzwań.',
    noEvaluations: {
      title: 'Brak ocen',
      description:
        'Gdy uczeń zaakceptuje wyzwanie, będziesz mógł je tutaj ocenić.',
    },
    evaluationDialog: {
      title: 'Oceń wyzwanie',
      forStudent: 'dla {name}',
      challenge: 'Wyzwanie',
      rating: 'Ocena',
      feedback: 'Informacja zwrotna',
      feedbackPlaceholder: 'Wpisz swoją opinię tutaj...',
      saveButton: 'Zapisz ocenę',
      mood: 'Nastrój ucznia',
    },
    ratings: {
      needsSupport: 'Wymaga wsparcia',
      metExpectations: 'Spełnił oczekiwania',
      exceededExpectations: 'Przekroczył oczekiwania',
    },
    moods: {
      enthusiastic: 'Entuzjastyczny',
      focused: 'Skupiony',
      nervous: 'Zdenerwowany',
      frustrated: 'Sfrustrowany',
      happy: 'Szczęśliwy',
      tired: 'Zmęczony',
    },
    pagination: {
        previous: 'Poprzednia',
        next: 'Następna',
        page: 'Strona {currentPage} z {totalPages}',
    }
} as const;
