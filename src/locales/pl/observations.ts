
export default {
    title: 'Obserwacje',
    tagline: 'Zapisuj i przeglądaj obserwacje uczniów.',
    noStudentSelected: {
      title: 'Wybierz ucznia',
      description:
        'Wybierz ucznia z listy, aby zapisać lub wyświetlić jego obserwacje.',
      selectDescription:
        'Wybierz ucznia z menu rozwijanego, aby zapisać lub wyświetlić jego obserwacje.',
    },
    newObservationTitle: 'Nowa obserwacja',
    newObservationDescription: 'Zapisz nową obserwację dla {name}.',
    observationLabel: 'Obserwacja',
    observationPlaceholder: 'Opisz, co zaobserwowałeś...',
    typeLabel: 'Typ obserwacji',
    typePlaceholder: 'Wybierz typ...',
    saveButton: 'Zapisz obserwację',
    clearButton: 'Wyczyść',
    analyzeButton: 'Analizuj z AI',
    improveButton: 'Ulepsz z AI',
    analysisTitle: 'Analiza AI',
    suggestedType: 'Sugerowany typ',
    suggestedTags: 'Sugerowane tagi',
    deepeningQuestion: 'Pytanie pogłębiające',
    toastAnalysisSuccess: 'Obserwacja przeanalizowana!',
    toastImproveSuccess: 'Obserwacja ulepszona!',
    historyTitle: 'Historia obserwacji',
    noObservations: {
      title: 'Brak zarejestrowanych obserwacji',
      description:
        'Użyj powyższego formularza, aby zarejestrować pierwszą obserwację dla tego ucznia.',
    },
    toastSuccess: 'Obserwacja zapisana pomyślnie!',
    toastError: 'Nie udało się zapisać obserwacji.',
    toastDeleteSuccess: 'Obserwacja usunięta pomyślnie.',
    toastDeleteError: 'Nie udało się usunąć obserwacji.',
    types: {
      positive: 'Pozytywna',
      negative: 'Negatywna',
      neutral: 'Neutralna',
      academic: 'Akademicka',
      'social-emotional': 'Społeczno-emocjonalna',
    },
    deleteDialog: {
      title: 'Jesteś pewien?',
      description: 'Tej akcji nie można cofnąć. Spowoduje to trwałe usunięcie obserwacji.',
      confirm: 'Usuń',
    },
    filterByType: 'Filtruj według typu',
    filterByTag: 'Filtruj według tagu',
    allTypes: 'Wszystkie typy',
    allTags: 'Wszystkie tagi',
} as const;
