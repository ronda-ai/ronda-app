
export default {
    title: 'Groepsactiviteiten',
    tagline: 'Vorm op een slimme manier groepen en genereer samenwerkingsactiviteiten.',
    generator: {
      title: 'Generator voor Groepssuggesties',
      description: 'De AI analyseert uw klas om gebalanceerde groepen en een facilitatietip voor te stellen.',
      button: 'Genereer Nieuwe Suggesties',
    },
    manualMode: {
        title: 'Handmatige Groepenbouwer',
        description: 'Creëer uw eigen groepen en krijg hulp van AI.',
        selectLabel: 'Selecteer studenten voor een nieuwe groep',
        selectPlaceholder: 'Kies studenten...',
        createGroupButton: 'Creëer Groep',
        groupTitle: 'Nieuwe Groep',
        analyzeButton: 'Analyseer Dynamiek',
        generateActivityButton: 'Genereer Activiteit',
        warningTitle: 'Relatiewaarschuwing',
        conflictWarning: '{nameA} en {nameB} hebben een geregistreerd conflict. Wees voorzichtig.',
        skillsLabel: 'Te Ontwikkelen Samenwerkingsvaardigheden',
        skillsPlaceholder: 'bv. Communicatie, Leiderschap',
        themesLabel: 'Activiteitsthema (Optioneel)',
        themesPlaceholder: 'bv. Ruimtemissie, Mysterie Oplossen',
        activityGeneratedToast: 'Activiteit succesvol gegenereerd!',
    },
    aiSuggestions: {
        title: 'Door AI Gegenereerde Suggesties',
    },
    history: {
      title: 'Suggestiegeschiedenis',
      description: 'Bekijk eerder gegenereerde groepssuggesties.',
      suggestionFor: 'Suggestie van {date}',
      teacherTipTitle: 'Facilitatortip',
      suggestedGroups: 'Voorgestelde Groepen',
      group: 'Groep',
      suggestedSkills: 'Voorgestelde Samenwerkingsvaardigheden',
      suggestedThemes: 'Voorgestelde Activiteitsthema\'s',
      useSuggestionButton: 'Gebruik deze Suggestie',
      suggestionUsedToast: 'Suggestie toegepast op de handmatige groepenbouwer!',
      noResults: {
        title: 'Klaar om Samen te Werken?',
        description: 'Klik op de knop hierboven om de eerste set groepssuggesties voor uw klas te genereren.',
      },
      toastDeleted: 'Suggestie verwijderd.',
      toastDeleteFailed: 'Kon suggestie niet verwijderen.',
      deleteDialog: {
        title: 'Deze suggestie verwijderen?',
        description: 'Deze actie is permanent en kan niet ongedaan worden gemaakt.',
      },
    },
    viewActivitiesButton: 'Bekijk Gegenereerde Activiteiten',
    details: {
        title: 'Gegenereerde Activiteiten voor de Groep',
        description: 'De volgende activiteiten zijn gegenereerd voor {members}.',
        deleteButton: 'Verwijder Activiteitenplan',
    }
} as const;
