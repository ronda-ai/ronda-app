
export default {
      title: 'Wsparcie językowe',
      tagline: 'Generuj dwujęzyczne materiały wspierające inkluzję językową.',
      form: {
          title: 'Asystent inkluzji językowej',
          description: 'Wybierz ucznia i określ jego język, aby wygenerować spersonalizowane materiały wspierające.',
          studentLabel: 'Uczeń',
          studentPlaceholder: 'Wybierz ucznia...',
          languageLabel: "Język ojczysty ucznia",
          languagePlaceholder: 'np. hiszpański, francuski, mandaryński',
          focusAreasLabel: 'Obszary zainteresowania',
          generateButton: 'Generuj materiał wspierający',
      },
      focusAreas: {
          reading: 'Czytanie ze zrozumieniem',
          writing: 'Umiejętności pisania',
          speaking: 'Wypowiedź ustna',
          listening: 'Rozumienie ze słuchu',
          'social-emotional': 'Integracja społeczno-emocjonalna',
      },
      addFocusAreaDialog: {
        title: 'Dodaj nowe obszary zainteresowania',
        description: 'Wybierz spośród sugestii AI lub dodaj własne obszary zainteresowania do listy.',
        customPromptLabel: 'Poprowadź AI (opcjonalnie)',
        customPromptPlaceholder: 'np. Skup się na obszarach słuchania...',
        manualAreaLabel: 'Lub dodaj obszar ręcznie',
        manualAreaPlaceholder: 'Wpisz nowy obszar...',
        noSuggestions: 'Brak dostępnych sugestii. Spróbuj odświeżyć lub zmienić swój monit.',
        add: 'Dodaj:',
        addSelected: 'Dodaj wybrane',
        toastSuccess: 'Obszary zainteresowania dodane pomyślnie!',
        toastError: 'Nie udało się dodać obszarów zainteresowania.',
      },
      editFocusAreaDialog: {
        title: 'Edytuj obszar zainteresowania: {name}',
        areaNameLabel: 'Nazwa obszaru zainteresowania',
        deleteButton: 'Usuń obszar',
        toastUpdateSuccess: 'Obszar zainteresowania zaktualizowany pomyślnie!',
        toastUpdateError: 'Nie udało się zaktualizować obszaru zainteresowania.',
        toastDeleteSuccess: 'Obszar zainteresowania usunięty pomyślnie!',
        toastDeleteError: 'Nie udało się usunąć obszaru zainteresowania.',
        deleteDialog: {
            title: 'Jesteś pewien?',
            description: 'Spowoduje to trwałe usunięcie obszaru zainteresowania "{name}" z listy.',
            cancel: 'Anuluj',
            confirm: 'Usuń'
        }
      },
      generatingTitle: 'Generowanie materiału wspierającego...',
      history: {
          title: 'Historia wygenerowanych materiałów',
          description: 'Przeglądaj wcześniej wygenerowane materiały dla wybranego ucznia.',
          selectStudentPrompt: {
            title: 'Wybierz ucznia',
            description: 'Wybierz ucznia z formularza, aby zobaczyć jego historię i wygenerować nowe materiały.',
          },
          noResults: {
              title: 'Brak materiałów',
              description: 'Użyj formularza, aby wygenerować pierwszy materiał wspierający dla tego ucznia.',
          },
          header: 'Materiał dla {language}',
          teacherGuide: 'Przewodnik dla nauczyciela',
          studentMaterial: 'Materiał dla ucznia',
          feedbackTitle: "Opinia nauczyciela",
          feedbackPlaceholder: 'Czy ten materiał był przydatny? Twoja opinia pomaga ulepszać przyszłe sugestie.',
          toastDeleted: 'Materiał wspierający usunięty.',
          toastDeleteFailed: 'Nie udało się usunąć materiału wspierającego.',
          deleteDialog: {
            title: 'Usunąć ten materiał?',
            description: 'Tej akcji nie można cofnąć. Spowoduje to trwałe usunięcie wygenerowanego materiału wspierającego.',
          },
          translationTitle: "Tłumaczenie dla {language}",
          showTranslation: "Pokaż tłumaczenie",
          hideTranslation: "Ukryj tłumaczenie",
      }
} as const;
