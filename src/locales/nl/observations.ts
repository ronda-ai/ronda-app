
export default {
    title: 'Observaties',
    tagline: 'Log en bekijk studentobservaties.',
    noStudentSelected: {
      title: 'Selecteer een Student',
      description:
        'Kies een student uit de lijst om hun observaties te loggen of te bekijken.',
      selectDescription:
        'Kies een student uit het dropdown-menu om hun observaties te loggen of te bekijken.',
    },
    newObservationTitle: 'Nieuwe Observatie',
    newObservationDescription: 'Log een nieuwe observatie voor {name}.',
    observationLabel: 'Observatie',
    observationPlaceholder: 'Beschrijf wat je hebt waargenomen...',
    typeLabel: 'Type Observatie',
    typePlaceholder: 'Selecteer een type...',
    saveButton: 'Sla Observatie op',
    clearButton: 'Wissen',
    analyzeButton: 'Analyseer met AI',
    improveButton: 'Verbeter met AI',
    analysisTitle: 'AI Analyse',
    suggestedType: 'Voorgesteld Type',
    suggestedTags: 'Voorgestelde Tags',
    deepeningQuestion: 'Verdiepingsvraag',
    toastAnalysisSuccess: 'Observatie geanalyseerd!',
    toastImproveSuccess: 'Observatie verbeterd!',
    historyTitle: 'Observatiegeschiedenis',
    noObservations: {
      title: 'Geen Observaties Geregistreerd',
      description:
        'Gebruik het bovenstaande formulier om de eerste observatie voor deze student te registreren.',
    },
    toastSuccess: 'Observatie succesvol opgeslagen!',
    toastError: 'Kon observatie niet opslaan.',
    toastDeleteSuccess: 'Observatie succesvol verwijderd.',
    toastDeleteError: 'Kon observatie niet verwijderen.',
    types: {
      positive: 'Positief',
      negative: 'Negatief',
      neutral: 'Neutraal',
      academic: 'Academisch',
      'social-emotional': 'Sociaal-emotioneel',
    },
    deleteDialog: {
      title: 'Weet u het zeker?',
      description: 'Deze actie kan niet ongedaan worden gemaakt. Dit zal de observatie permanent verwijderen.',
      confirm: 'Verwijderen',
    },
    filterByType: 'Filter op Type',
    filterByTag: 'Filter op Tag',
    allTypes: 'Alle Types',
    allTags: 'Alle Tags',
} as const;
