
export default {
    title: 'Zajęcia grupowe',
    tagline: 'Inteligentnie twórz grupy i generuj zajęcia współpracy.',
    generator: {
      title: 'Generator sugestii grup',
      description: 'AI przeanalizuje Twoją klasę, aby zaproponować zrównoważone grupy i wskazówkę dotyczącą facylitacji.',
      button: 'Generuj nowe sugestie',
    },
    manualMode: {
        title: 'Ręczny kreator grup',
        description: 'Twórz własne grupy i uzyskuj pomoc AI.',
        selectLabel: 'Wybierz uczniów do nowej grupy',
        selectPlaceholder: 'Wybierz uczniów...',
        createGroupButton: 'Utwórz grupę',
        groupTitle: 'Nowa grupa',
        analyzeButton: 'Analizuj dynamikę',
        generateActivityButton: 'Generuj zajęcia',
        warningTitle: 'Ostrzeżenie o relacjach',
        conflictWarning: '{nameA} i {nameB} mają zarejestrowany konflikt. Postępuj ostrożnie.',
        skillsLabel: 'Umiejętności współpracy do rozwinięcia',
        skillsPlaceholder: 'np. Komunikacja, Przywództwo',
        themesLabel: 'Temat zajęć (opcjonalnie)',
        themesPlaceholder: 'np. Misja kosmiczna, Rozwiązywanie zagadek',
        activityGeneratedToast: 'Zajęcia wygenerowane pomyślnie!',
    },
    aiSuggestions: {
        title: 'Sugestie generowane przez AI',
    },
    history: {
      title: 'Historia sugestii',
      description: 'Przeglądaj wcześniej wygenerowane sugestie grup.',
      suggestionFor: 'Sugestia z {date}',
      teacherTipTitle: 'Wskazówka dla facylitatora',
      suggestedGroups: 'Sugerowane grupy',
      group: 'Grupa',
      suggestedSkills: 'Sugerowane umiejętności współpracy',
      suggestedThemes: 'Sugerowane tematy zajęć',
      useSuggestionButton: 'Użyj tej sugestii',
      suggestionUsedToast: 'Sugestia zastosowana w ręcznym kreatorze grup!',
      noResults: {
        title: 'Gotowi do współpracy?',
        description: 'Kliknij przycisk powyżej, aby wygenerować pierwszy zestaw sugestii grup dla swojej klasy.',
      },
      toastDeleted: 'Sugestia usunięta.',
      toastDeleteFailed: 'Nie udało się usunąć sugestii.',
      deleteDialog: {
        title: 'Usunąć tę sugestię?',
        description: 'Ta akcja jest trwała i nie można jej cofnąć.',
      },
    },
    viewActivitiesButton: 'Zobacz wygenerowane zajęcia',
    details: {
        title: 'Wygenerowane zajęcia dla grupy',
        description: 'Dla {members} wygenerowano następujące zajęcia.',
        deleteButton: 'Usuń plan zajęć',
    }
} as const;
