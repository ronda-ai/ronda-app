
export default {
    title: 'Zajęcia indywidualne',
    tagline: 'Projektuj spersonalizowane zajęcia dla konkretnego ucznia.',
    step0: {
        title: 'Wybierz ucznia',
        description: 'Wybierz ucznia, aby rozpocząć generowanie spersonalizowanych zajęć.',
    },
    step1: {
      selectLabel: 'Uczeń',
      selectPlaceholder: 'Wybierz ucznia...',
    },
    generator: {
        title: 'Generator zajęć dla {name}',
        description: 'Zdefiniuj parametry zajęć lub użyj AI do zasugerowania pomysłów.',
        topicLabel: 'Temat akademicki',
        topicPlaceholder: 'np. Ułamki, Fotosynteza',
        skillsLabel: 'Umiejętności do rozwinięcia',
        skillsPlaceholder: 'np. Myślenie krytyczne, Współpraca',
        themesLabel: 'Tematy angażujące',
        themesPlaceholder: 'np. Kosmos, Dinozaury, Tajemnice',
        customPromptLabel: 'Niestandardowe polecenie (opcjonalnie)',
        customPromptPlaceholder: 'np. Skup się na elementach wizualnych, zrób z tego zajęcia praktyczne',
        negativePromptLabel: 'Negatywne polecenie (opcjonalnie)',
        negativePromptPlaceholder: 'np. Unikaj zadań pisemnych, nie wspominaj o pająkach',
        generateButton: 'Generuj zajęcia',
        toastSuccess: 'Zajęcia wygenerowane pomyślnie!',
        noSkills: 'Brak dostępnych umiejętności.',
        addSkills: 'Dodaj nowe umiejętności'
    },
    suggestions: {
        button: 'Zasugeruj z AI',
        toastSuccess: 'Sugestie zostały uzupełnione!',
    },
    history: {
        title: "Historia planów zajęć",
        description: "Przeglądaj i zarządzaj wcześniej wygenerowanymi planami zajęć dla {name}.",
        toastDeleted: 'Plan zajęć usunięty.',
        toastDeleteFailed: 'Nie udało się usunąć planu zajęć.',
        noResults: {
            title: "Brak planów zajęć",
            description: "Wygeneruj pierwszy plan dla tego ucznia, aby zobaczyć jego historię tutaj."
        },
        deleteDialog: {
            title: "Usunąć ten plan zajęć?",
            description: "Tej akcji nie można cofnąć. Spowoduje to trwałe usunięcie planu zajęć.",
        },
        stepDialog: {
            title: 'Oceń krok zajęć',
            description: 'Jak poszło to zajęcie?',
            status: 'Status',
            feedback: 'Opinia o kroku (opcjonalnie)',
            feedbackPlaceholder: 'Dodaj notatkę na temat tego zajęcia...',
            saveButton: 'Zapisz ocenę',
            statuses: {
                pending: 'Oczekujące',
                'in-progress': 'W toku',
                completed: 'Zakończone',
                skipped: 'Pominięte'
            },
        },
    },
    democratizer: {
      title: 'Demokratyzator zasobów',
      descriptionSingle: 'Dostosuj to zadanie, aby było bardziej dostępne.',
      descriptionAll: 'Dostosuj wszystkie zadania w tym planie, aby były bardziej dostępne w zależności od różnych potrzeb lub ograniczeń zasobów.',
      descriptionSelected: 'Dostosuj {count} wybrane zadania w tym planie, aby były bardziej dostępne.',
      prompt: 'Wybierz opcję dostosowania do zastosowania w zadaniach.',
      selectPlaceholder: 'Wybierz dostosowanie...',
      activitiesToAdapt: "Zadania do dostosowania:",
      adaptButton: 'Dostosuj zadania',
      toastSuccess: 'Zadania pomyślnie dostosowane!',
      options: {
        commonMaterials: 'Dostosuj do typowych materiałów domowych',
        lowEnergy: 'Dostosuj do scenariuszy o niskiej energii/spokojnych',
        socialInteraction: 'Zwiększ komponent interakcji społecznej',
        simpleInstructions: 'Uprość instrukcje',
      },
    }
} as const;
