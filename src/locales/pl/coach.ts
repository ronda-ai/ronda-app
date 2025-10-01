
export default {
    title: 'Trener AI',
    tagline: 'Otrzymuj spostrzeżenia i sugestie oparte na sztucznej inteligencji.',
    noStudentSelected: {
      title: 'Wybierz ucznia',
      description:
        'Wybierz ucznia z listy, aby wyświetlić jego analizę i uzyskać sugestie.',
    },
    tabs: {
        classroom: 'Analiza klasy',
        individual: 'Analiza indywidualna'
    },
    coachSuggestion: {
      title: 'Sugestia trenera',
      description:
        'Wygeneruj spersonalizowaną sugestię dla tego ucznia na podstawie jego profilu i wyników.',
      button: 'Uzyskaj sugestię',
      toastDeleted: 'Sugestia pomyślnie usunięta.',
      toastDeleteFailed: 'Nie udało się usunąć sugestii.',
      deleteDialog: {
        title: 'Usunąć tę sugestię?',
        description: 'Tej akcji nie można cofnąć. Spowoduje to trwałe usunięcie sugestii trenera.',
        confirm: 'Usuń',
      },
      noSuggestions: {
        title: 'Brak sugestii',
        description:
          'Wygeneruj pierwszą sugestię dla tego ucznia, aby rozpocząć.',
      },
    },
    supportPlan: {
      title: 'Plan wsparcia',
      description:
        'Wygeneruj wieloetapowy, praktyczny plan wsparcia rozwoju tego ucznia.',
      button: 'Generuj nowy plan',
      generating: 'Generowanie planu, proszę czekać...',
      planGenerated: 'Plan wygenerowany {date}',
      feedbackTitle: "Opinia nauczyciela",
      feedbackPlaceholder:
        'Co zadziałało? Co nie? Twoja opinia pomaga AI się uczyć...',
      toastDeleted: 'Plan wsparcia pomyślnie usunięty.',
      toastDeleteFailed: 'Nie udało się usunąć planu wsparcia.',
      noPlans: {
        title: 'Brak planów wsparcia',
        description:
          'Wygeneruj pierwszy plan wsparcia dla tego ucznia, aby rozpocząć.',
      },
      stepDialog: {
        title: 'Oceń krok wsparcia',
        description: 'Jak poszedł ten krok?',
        status: 'Status',
        feedback: 'Opinia o kroku (opcjonalnie)',
        feedbackPlaceholder: 'Dodaj notatkę na temat tego kroku...',
        saveButton: 'Zapisz ocenę kroku',
        statuses: {
          pending: 'Oczekujący',
          achieved: 'Osiągnięty',
          'partially-achieved': 'Częściowo osiągnięty',
          'not-achieved': 'Nieosiągnięty',
          discarded: 'Odrzucony',
        },
      },
      deleteDialog: {
        title: 'Czy na pewno chcesz usunąć ten plan?',
        description:
          'Tej akcji nie można cofnąć. Spowoduje to trwałe usunięcie planu wsparcia.',
        confirm: 'Usuń',
      },
    },
    moodAnalysis: {
      title: 'Analiza trendów nastroju',
      descriptionStudent:
        'Analizuj nastrój tego ucznia w różnych wyzwaniach, aby znaleźć wzorce.',
      descriptionClassroom:
        'Uzyskaj analizę trendów nastroju w całej klasie, aby poprawić ogólną dynamikę.',
      button: 'Analizuj trendy',
      buttonClassroom: 'Analizuj trendy w klasie',
      analysisTitle: 'Spostrzeżenie AI',
      noAnalyses: {
        title: 'Brak analiz',
        descriptionStudent:
          'Wygeneruj pierwszą analizę nastroju dla tego ucznia, aby rozpocząć.',
        descriptionClassroom:
          'Wygeneruj pierwszą analizę nastroju dla klasy, aby rozpocząć.',
      },
       toastDeleted: 'Analiza pomyślnie usunięta.',
       toastDeleteFailed: 'Nie udało się usunąć analizy.',
       deleteDialog: {
        title: 'Usunąć tę analizę?',
        description: 'Ta akcja jest nieodwracalna. Spowoduje to trwałe usunięcie wygenerowanej analizy.',
        confirm: 'Usuń',
      },
    },
    relationshipLab: {
      title: 'Laboratorium dynamiki społecznej',
      description: 'Przestrzeń do analizy i poprawy relacji między uczniami.',
      button: 'Otwórz laboratorium',
      tagline: 'Orkiestruj pozytywne interakcje społeczne.',
      tabs: {
        multiStudent: 'Między rówieśnikami',
        singleStudent: 'Indywidualna',
      },
      form: {
        title: 'Generator strategii naprawczych relacji',
        description: 'Wybierz uczniów o napiętych relacjach, aby otrzymać spersonalizowany plan interwencyjny.',
        studentsLabel: 'Wybierz uczniów (2-4)',
        studentsPlaceholder: 'Wybierz uczniów...',
        focusLabel: 'Główny cel / Umiejętność do wzmocnienia',
        focusPlaceholder: 'np. Komunikacja, Empatia, Współpraca...',
        customPromptLabel: 'Niestandardowe polecenie (opcjonalnie)',
        customPromptPlaceholder: 'np. Stwórz zadanie niewerbalne, uczyń z tego grę...',
        generateButton: 'Generuj strategię',
      },
      individual: {
          form: {
              title: 'Generator strategii indywidualnych',
              description: 'Wybierz jednego ucznia, aby wygenerować plan, który pomoże mu zintegrować się i lepiej nawiązywać relacje z klasą.',
              studentsPlaceholder: 'Wybierz ucznia...',
              generateButton: 'Generuj strategię integracji'
          },
          history: {
              title: 'Historia strategii indywidualnych',
              description: 'Przeglądaj wcześniej wygenerowane strategie dla tego ucznia.',
               prompt: {
                  title: 'Gotowy do budowania mostów?',
                  description: 'Wybierz ucznia, aby zobaczyć jego historię lub wygenerować nową strategię integracji społecznej.',
              },
          },
          toastSuccess: 'Wygenerowano strategię integracji!',
          toastDeleteSuccess: 'Strategia pomyślnie usunięta.',
          toastDeleteFailed: 'Nie udało się usunąć strategii.',
          deleteDialog: {
              title: 'Usunąć tę strategię?',
              description: 'Ta akcja jest nieodwracalna i trwale usunie strategię.',
              confirm: 'Usuń'
          }
      },
      suggestions: {
          button: 'Zasugeruj z AI',
          toastSuccess: 'Sugestia została uzupełniona w formularzu!'
      },
       studentInfo: {
          title: "Profil wybranych uczniów",
          qualities: 'Zalety',
          fears: 'Obawy',
          none: 'Brak na liście',
      },
      history: {
        title: 'Historia strategii',
        description: 'Przeglądaj wcześniej wygenerowane strategie dla wybranych uczniów.',
        header: 'Strategia dla {focus}',
        statusLabel: 'Status strategii',
        statusPlaceholder: 'Ustaw status...',
        feedbackLabel: 'Opinia nauczyciela',
        feedbackPlaceholder: 'Jak ta strategia sprawdziła się w praktyce?',
        saveFeedbackButton: 'Zapisz ocenę',
        toastUpdateSuccess: 'Strategia pomyślnie zaktualizowana!',
        toastUpdateFailed: 'Nie udało się zaktualizować strategii.',
        prompt: {
            title: 'Gotowy do mediacji?',
            description: 'Wybierz co najmniej dwóch uczniów w formularzu, aby zobaczyć ich historię lub wygenerować nową strategię.',
        },
        noResults: {
            title: 'Brak strategii',
            description: 'Wygeneruj pierwszą strategię dla tej grupy uczniów.',
        },
         stepDialog: {
            title: 'Oceń krok naprawczy',
            description: 'Jak poszedł ten krok?',
            status: 'Status',
            feedback: 'Opinia o kroku (opcjonalnie)',
            feedbackPlaceholder: 'Dodaj notatkę na temat tego kroku...',
            saveButton: 'Zapisz ocenę',
            statuses: {
                pending: 'Oczekujący',
                completed: 'Zakończony',
                skipped: 'Pominięty',
            },
        },
      },
      details: {
          title: "Szczegóły strategii dla '{focus}'",
          adjustTitle: "Dostosuj strategię",
          adjustPlaceholder: "np. Uprość, dodaj element rysunkowy, skup się bardziej na sygnałach niewerbalnych...",
          adjustButton: "Generuj dostosowaną strategię",
      },
      status: {
        'not_started': 'Nie rozpoczęto',
        'in_progress': 'W toku',
        'successful': 'Pomyślny',
        'partially_successful': 'Częściowo pomyślny',
        'did_not_work': 'Nie zadziałało',
        'needs_adjustment': 'Wymaga dostosowania',
      },
      toastSuccess: 'Wygenerowano strategię naprawczą!',
    },
    qualitiesSuggestion: {
      title: 'Sugestia cech',
      description: 'Odkrywaj nowe cechy na podstawie wyników uczniów.',
      button: 'Odkryj cechy',
      suggestionText:
        'Na podstawie ostatnich wyników, AI sugeruje następujące cechy:',
      noSuggestions: {
        title: 'Brak sugestii cech',
        description:
          'Wygeneruj pierwszą sugestię cech dla tego ucznia, aby rozpocząć.',
      },
      dialog: {
        title: 'Nowe sugestie cech dla {name}',
        description:
          'Na podstawie ostatnich wyników, oto kilka cech, które możesz rozważyć do dodania:',
        accept: 'Zaakceptuj',
        reject: 'Odrzuć',
        confirmation: 'Jak chcesz zaktualizować cechy?',
        add: 'Dodaj jako nowe',
        replace: 'Zastąp istniejące',
        confirm: 'Potwierdź aktualizację',
      },
    },
    concernAnalysis: {
      title: 'Analiza wzorców niepokoju',
      description:
        'AI przeanalizuje pełną historię ucznia w poszukiwaniu powtarzających się negatywnych wzorców.',
      button: 'Analizuj niepokoje',
      noAnalyses: {
        title: 'Nie wykryto wzorców niepokoju',
        description:
          'Wygeneruj analizę, aby sprawdzić potencjalne powtarzające się problemy.',
      },
    },
    fearManagement: {
      title: 'Sugestie zarządzania strachem',
      description: 'Generuj empatyczne strategie, aby pomóc uczniowi w jego obawach.',
      button: 'Uzyskaj strategię',
      strategyFor: 'Strategia dla:',
      feedbackTitle: 'Jak poszło?',
      feedbackPlaceholder: 'Twoja opinia pomaga AI uczyć się i doskonalić...',
      toastFearUpdated: 'Profil strachów ucznia zaktualizowany!',
      toastFearUpdateFailed: 'Nie udało się zaktualizować strachów ucznia.',
      toastDeleted: 'Sugestia pomyślnie usunięta.',
      toastDeleteFailed: 'Nie udało się usunąć sugestii.',
      noSuggestions: {
        title: 'Brak strategii',
        description: 'Wygeneruj strategię, aby pomóc temu uczniowi zarządzać swoimi obawami.',
        noFears: 'Ten uczeń nie ma wymienionych żadnych obaw. Dodaj obawy w jego profilu, aby uzyskać sugestie.',
      },
      updateDialog: {
        title: 'Zaktualizować profil ucznia?',
        confirm: 'Tak, zaktualizuj profil',
      },
      deleteDialog: {
        title: 'Usunąć tę sugestię?',
        description: 'Tej akcji nie można cofnąć.',
        confirm: 'Usuń',
      },
      dialog: {
        title: 'Zarządzanie strachem przed {fear}',
        description: 'Przejrzyj istniejące strategie lub wygeneruj nową dla {name}.',
        generateButton: 'Generuj nową sugestię',
        noSuggestions: {
            title: 'Brak strategii',
            description: 'Wygeneruj pierwszą sugestię AI, aby rozwiązać ten strach.'
        }
      }
    }
} as const;
