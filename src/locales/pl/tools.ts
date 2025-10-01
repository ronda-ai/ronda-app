
export default {
    title: 'Narzędzia',
    tagline: 'Używaj narzędzi AI, aby wzbogacić swoje nauczanie.',
    activityAdapter: {
      title: 'Adapter zajęć',
      description: 'Dostosuj dowolne istniejące zajęcia, aby lepiej odpowiadały potrzebom Twojej klasy, zarówno dla poszczególnych uczniów, jak i całej grupy.',
      placeholder: 'Wklej lub napisz tutaj zajęcia, które chcesz dostosować...',
      activityLabel: 'Zajęcia do dostosowania',
      existingActivityLabel: 'Wybierz istniejące zajęcia lub test',
      existingActivityPlaceholder: 'Wybierz zajęcia/test do streszczenia i dostosowania...',
      studentLabel: 'Dostosuj dla konkretnych uczniów (opcjonalnie)',
      studentPlaceholder: 'Wybierz uczniów...',
      customPromptLabel: 'Konkretny cel adaptacji (opcjonalnie)',
      customPromptPlaceholder: 'np. Zrób z tego grę, skup się na pisaniu...',
      button: 'Dostosuj zajęcia',
      generatingTitle: 'Generowanie adaptacji...',
      activityType: 'Zajęcie'
    },
     rubricGenerator: {
      title: 'Generator rubryk',
      description: 'Stwórz sprawiedliwą i zrównoważoną rubrykę oceny dla dowolnego zadania.',
      placeholder: 'Opisz zadanie, dla którego chcesz wygenerować rubrykę...',
      button: 'Generuj rubrykę',
      testType: 'Test'
    },
    history: {
      title: 'Historia',
      descriptionAdapter: 'Przeglądaj wcześniej dostosowane zajęcia.',
      descriptionRubric: 'Przeglądaj wcześniej wygenerowane rubryki.',
      reasoning: 'Uzasadnienie',
      criterion: 'Kryterium',
      excellent: 'Doskonale',
      satisfactory: 'Zadowalająco',
      needsImprovement: 'Wymaga poprawy',
      scoringGuide: 'Przewodnik punktacji',
      toastDeleteSuccess: 'Pomyślnie usunięto.',
      toastDeleteFailed: 'Nie udało się usunąć.',
      noResults: {
        title: 'Brak wyników',
        description: 'Użyj narzędzia po lewej stronie, aby wygenerować swój pierwszy wynik.',
      },
      deleteDialogAdapter: {
          title: 'Usunąć tę adaptację?',
          description: 'Tej akcji nie można cofnąć. Spowoduje to trwałe usunięcie adaptacji zajęć.',
          confirm: 'Usuń'
      },
      deleteDialogRubric: {
          title: 'Usunąć tę rubrykę?',
          description: 'Tej akcji nie można cofnąć. Spowoduje to trwałe usunięcie wygenerowanej rubryki.',
          confirm: 'Usuń'
      }
    }
} as const;
