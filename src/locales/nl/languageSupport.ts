
export default {
      title: 'Taalondersteuning',
      tagline: 'Genereer tweetalig materiaal om taalintegratie te ondersteunen.',
      form: {
          title: 'Assistent voor Taalintegratie',
          description: 'Selecteer een student en specificeer hun taal om gepersonaliseerd ondersteuningsmateriaal te genereren.',
          studentLabel: 'Student',
          studentPlaceholder: 'Selecteer een student...',
          languageLabel: "Moedertaal van de Student",
          languagePlaceholder: 'bv. Spaans, Frans, Mandarijn',
          focusAreasLabel: 'Focusgebieden',
          generateButton: 'Genereer Ondersteuningsmateriaal',
      },
      focusAreas: {
          reading: 'Leesbegrip',
          writing: 'Schrijfvaardigheid',
          speaking: 'Mondelinge Uitdrukking',
          listening: 'Luistervaardigheid',
          'social-emotional': 'Sociaal-emotionele Integratie',
      },
      addFocusAreaDialog: {
        title: 'Nieuwe Focusgebieden Toevoegen',
        description: 'Selecteer uit de AI-suggesties of voeg uw eigen focusgebieden toe aan de lijst.',
        customPromptLabel: 'Begeleid de AI (Optioneel)',
        customPromptPlaceholder: 'bv. Focus op luistergebieden...',
        manualAreaLabel: 'Of Voeg Handmatig een Gebied Toe',
        manualAreaPlaceholder: 'Typ een nieuw gebied...',
        noSuggestions: 'Geen suggesties beschikbaar. Probeer uw prompt te vernieuwen of te wijzigen.',
        add: 'Toevoegen:',
        addSelected: 'Geselecteerde Toevoegen',
        toastSuccess: 'Focusgebieden succesvol toegevoegd!',
        toastError: 'Kon focusgebieden niet toevoegen.',
      },
      editFocusAreaDialog: {
        title: 'Focusgebied Bewerken: {name}',
        areaNameLabel: 'Naam Focusgebied',
        deleteButton: 'Gebied Verwijderen',
        toastUpdateSuccess: 'Focusgebied succesvol bijgewerkt!',
        toastUpdateError: 'Kon focusgebied niet bijwerken.',
        toastDeleteSuccess: 'Focusgebied succesvol verwijderd!',
        toastDeleteError: 'Kon focusgebied niet verwijderen.',
        deleteDialog: {
            title: 'Weet u het zeker?',
            description: 'Dit zal het focusgebied "{name}" permanent uit de lijst verwijderen.',
            cancel: 'Annuleren',
            confirm: 'Verwijderen'
        }
      },
      generatingTitle: 'Ondersteuningsmateriaal genereren...',
      history: {
          title: 'Geschiedenis van Gegenereerd Materiaal',
          description: 'Bekijk eerder gegenereerd materiaal voor de geselecteerde student.',
          selectStudentPrompt: {
            title: 'Selecteer een Student',
            description: 'Kies een student uit het formulier om hun geschiedenis te bekijken en nieuw materiaal te genereren.',
          },
          noResults: {
              title: 'Nog Geen Materiaal',
              description: 'Gebruik het formulier om het eerste ondersteuningsmateriaal voor deze student te genereren.',
          },
          header: 'Materiaal voor {language}',
          teacherGuide: 'Lerarenhandleiding',
          studentMaterial: 'Studentenmateriaal',
          feedbackTitle: "Feedback van de Leraar",
          feedbackPlaceholder: 'Was dit materiaal nuttig? Uw feedback helpt toekomstige suggesties te verbeteren.',
          toastDeleted: 'Ondersteuningsmateriaal verwijderd.',
          toastDeleteFailed: 'Kon ondersteuningsmateriaal niet verwijderen.',
          deleteDialog: {
            title: 'Dit materiaal verwijderen?',
            description: 'Deze actie kan niet ongedaan worden gemaakt. Dit zal het gegenereerde ondersteuningsmateriaal permanent verwijderen.',
          },
          translationTitle: "Vertaling voor {language}",
          showTranslation: "Toon Vertaling",
          hideTranslation: "Verberg Vertaling",
      }
} as const;
