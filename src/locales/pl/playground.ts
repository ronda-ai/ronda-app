export default {
    title: 'Plac zabaw',
    tagline: 'Baw się i ucz z grami AI.',
    riddleBattle: {
        title: 'Bitwa na zagadki',
        description: 'Wygeneruj parę zagadek dla dwóch drużyn do rozwiązania. Kto będzie szybszy?',
        topicLabel: 'Temat zagadki (opcjonalnie)',
        topicPlaceholder: 'np. Zwierzęta, Kosmos, Historia',
        button: 'Rozpocznij nową bitwę',
        battleTitle: 'Bitwa na zagadki!',
        topic: 'Temat',
        teamBlue: 'Drużyna niebieska',
        teamRed: 'Drużyna czerwona',
        showAnswer: 'Pokaż odpowiedź',
        hideAnswer: 'Ukryj odpowiedź',
        toastDeleted: 'Bitwa usunięta.',
        toastDeleteFailed: 'Nie udało się usunąć bitwy.',
        toastEvaluationSaved: 'Ocena zapisana.',
        toastEvaluationFailed: 'Nie udało się zapisać oceny.',
        noBattles: {
            title: 'Gotowy na wyzwanie?',
            description: 'Kliknij przycisk powyżej, aby rozpocząć pierwszą bitwę na zagadki.',
        },
        deleteDialog: {
            title: 'Usunąć tę bitwę?',
            description: 'Ta akcja jest trwała i nie można jej cofnąć.',
        },
        evaluation: {
            title: 'Ocena',
            winner: 'Zwycięzca',
            winnerLabel: 'Ogłoś zwycięzcę',
            winnerPlaceholder: 'Wybierz zwycięzcę...',
            tie: 'Remis',
            moodLabel: 'Atmosfera rywalizacji',
            moodPlaceholder: 'Wybierz atmosferę...',
            feedbackLabel: 'Opinia',
            feedbackPlaceholder: 'Jak przebiegła gra? Czy była sprawiedliwa?',
            moods: {
                competitive: 'Rywalizacyjna',
                fun: 'Zabawna',
                collaborative: 'Współpracy',
                tense: 'Napięta',
                relaxed: 'Zrelaksowana',
            },
            confirm: 'Potwierdź'
        }
    },
    lightningRound: {
        title: 'Błyskawiczna runda',
        description: 'Szybka gra z zabawnymi wyzwaniami, aby ożywić klasę.',
        durationLabel: 'Czas trwania rundy (sekundy)',
        intervalLabel: 'Interwał wyzwań (sekundy)',
        categoryLabel: 'Kategoria wyzwań',
        start: 'Rozpocznij błyskawiczną rundę!',
        pause: 'Pauza',
        resume: 'Wznów',
        reset: 'Resetuj',
        noStudentsError: 'Do gry potrzeba co najmniej 2 obecnych uczniów.',
        toastDeleted: 'Runda usunięta.',
        toastDeleteFailed: 'Nie udało się usunąć rundy.',
        categories: {
            sound: 'Dźwięki',
            face: 'Miny',
            gesture: 'Gesty',
            imitation: 'Naśladowanie',
        },
        gameScreen: {
            yourTurn: 'twoja kolej!',
        },
        history: {
            title: 'Historia rund',
            description: 'Przeglądaj wcześniej wygenerowane rundy.',
            roundFor: 'Runda z {date}',
            noRounds: 'Jeszcze nie rozegrano żadnych rund.',
        },
        deleteDialog: {
            title: 'Usunąć tę rundę?',
            description: 'Ta akcja jest trwała i nie można jej cofnąć.',
        },
    },
    collaborativeStory: {
        title: 'Wspólne opowiadanie historii',
        setup: {
            title: 'Rozpocznij nową historię',
            description: 'Zdefiniuj postacie i miejsce akcji, aby rozpocząć swoją przygodę.',
            charactersLabel: 'Główni bohaterowie',
            charactersPlaceholder: 'np. Odważny rycerz, sprytny smok',
            settingLabel: 'Początkowe miejsce akcji',
            settingPlaceholder: 'np. Ciemna i straszna jaskinia',
            lengthLabel: 'Długość rozdziału',
            lengths: {
                short: 'Krótki',
                medium: 'Średni',
                long: 'Długi',
            },
            startButton: 'Rozpocznij historię',
            allowDialogues: 'Zezwalaj na dialogi w historii',
            narratorVoiceLabel: "Głos narratora",
            narratorVoicePlaceholder: "Wybierz głos...",
            customPromptLabel: "Niestandardowe polecenie (opcjonalnie)",
            customPromptPlaceholder: "np. Historia musi być komedią, nie może zawierać przemocy...",
            negativePromptLabel: "Negatywne polecenie (opcjonalnie)",
            negativePromptPlaceholder: "np. Unikaj smutnych zakończeń, nie wspominaj o pająkach...",
        },
        contribute: {
            title: 'Co dalej?',
            description: 'Dodaj pomysły uczniów na następny rozdział.',
            placeholder: 'Wpisz pomysł ucznia i naciśnij enter...',
            continueButton: 'Kontynuuj historię',
            suggestionButton: 'Sugestia AI'
        },
        story: {
            titlePlaceholder: 'Historia pojawi się tutaj',
            storyPlaceholder: 'Zacznij od zdefiniowania postaci i miejsca akcji, a następnie rozpocznij historię!',
        },
        history: {
            title: 'Historia opowieści',
            createdAt: 'Utworzono',
            noStories: 'Brak opowieści.',
        },
        deleteDialog: {
            title: 'Usunąć tę historię?',
            description: 'Ta akcja jest trwała i nie można jej cofnąć.',
        },
        toastDeleted: 'Historia usunięta.',
        toastDeleteFailed: 'Nie udało się usunąć historii.',
        toastNarrationSuccess: 'Pełna narracja historii jest generowana i wkrótce się pojawi.',
        newStoryButton: 'Rozpocznij nową historię',
        narrateButton: 'Opowiedz rozdział',
        'narrateButton--loading': 'Opowiadanie...',
        narrateFullStoryButton: 'Opowiedz jako audiobook',
        suggestions: {
            button: 'Zasugeruj z AI',
            toastSuccess: 'Pomysły zasugerowane!'
        },
        finishButton: 'Zakończ historię',
        test: {
            createButton: 'Utwórz test z historii',
            modalTitle: 'Generuj test',
            modalDescription: 'Wybierz typ testu, który chcesz wygenerować z tej historii.',
            typeLabel: 'Typ testu',
            types: {
                title: 'Typ testu',
                'multiple-choice': 'Wielokrotny wybór',
                'true-false': 'Prawda/Fałsz',
                'open-ended': 'Pytania otwarte',
                'mixed': 'Mieszany',
            },
            generateButton: 'Generuj test',
            generateError: 'Nie udało się wygenerować testu.',
            saveSuccess: 'Test zapisany pomyślnie!',
            saveError: 'Nie udało się zapisać testu.',
            previewTitle: 'Podgląd wygenerowanego testu',
            previewDescription: 'Przejrzyj wygenerowany test. Został on już zapisany i można go wyświetlić na stronie Testy.',
            rubricTitle: 'Kryteria oceniania',
            saveButton: 'Zapisz test',
        },
        illustrateButton: 'Ilustruj',
    },
    debateGenerator: {
        title: 'Generator debat',
        description: 'Generuj edukacyjne scenariusze debat, aby zachęcić do krytycznego myślenia.',
        topicLabel: 'Temat debaty',
        topicPlaceholder: 'np. Czy zwierzęta powinny być trzymane w zoo?',
        complexityLabel: 'Złożoność',
        complexities: {
            beginner: 'Początkujący',
            intermediate: 'Średniozaawansowany',
            advanced: 'Zaawansowany'
        },
        button: 'Generuj nową debatę',
        noDebates: {
            title: 'Gotowi do dyskusji?',
            description: 'Wprowadź temat i złożoność, aby wygenerować swój pierwszy scenariusz debaty.',
        },
        affirmativeStance: 'Stanowisko za',
        negativeStance: 'Stanowisko przeciw',
        guidingQuestions: 'Pytania pomocnicze',
        rules: 'Zasady debaty',
        toastDeleted: 'Debata usunięta.',
        toastDeleteFailed: 'Nie udało się usunąć debaty.',
        deleteDialog: {
            title: 'Usunąć tę debatę?',
            description: 'Ta akcja jest trwała i nie można jej cofnąć.',
        },
        startSession: "Rozpocznij Sesję na Żywo",
        manageSession: "Zarządzaj Sesją",
        turnStructureTitle: "Struktura Tur Debaty",
        currentTurn: "Aktualna Tura",
        notStarted: "Debata jeszcze się nie rozpoczęła",
        paused: "Debata wstrzymana",
        start: "Rozpocznij Debatę",
        nextTurn: "Następna Tura",
        pause: "Pauza",
        resume: "Wznów",
        liveSession: {
            title: "Sesja Debaty w Toku",
            description: "Udostępnij ten kod QR lub link swoim uczniom, aby rozpocząć debatę.",
            qrCode: "Kod QR",
            link: "Bezpośredni link",
            copy: "Kopiuj",
            copied: "Skopiowano!",
            studentsConnected: "Połączeni Uczniowie",
            noStudentsYet: "Jeszcze żaden uczeń się nie połączył.",
            affirmative: 'Za',
            negative: 'Przeciw',
            unassigned: 'Nieprzypisany',
            both: 'Obie',
            teacher: 'Nauczyciel',
            closeSession: "Zamknij Sesję",
            sessionClosed: "Sesja została zamknięta."
        }
    },
    digitalConviviality: {
        title: 'Obywatelstwo cyfrowe',
        description: 'Narzędzia do promowania pozytywnego i odpowiedzialnego zachowania w Internecie.',
        activities: {
            title: 'Działania',
            description: 'Wygeneruj zadanie, aby ćwiczyć umiejętności z zakresu obywatelstwa cyfrowego.',
        },
        conflictSimulation: {
            title: 'Symulacja konfliktu',
            description: 'Poćwicz radzenie sobie z trudnymi sytuacjami online, generując hipotetyczny scenariusz konfliktu.',
            topicsLabel: 'Tematy konfliktu (opcjonalnie)',
            topicsPlaceholder: 'np. cyberprzemoc, dezinformacja, plagiat',
            button: 'Generuj scenariusz',
            scenarioTitle: 'Wygenerowany scenariusz',
            strategiesTitle: 'Strategie interwencji',
            strategyLabel: 'Strategia',
            outcomeLabel: 'Symulowany wynik',
            noScenario: {
                title: 'Gotowy do ćwiczeń?',
                description: 'Wygeneruj scenariusz, aby przećwiczyć swoje umiejętności rozwiązywania konfliktów.',
            },
            deleteDialog: {
                title: 'Usunąć ten scenariusz?',
                description: 'Spowoduje to trwałe usunięcie tego scenariusza konfliktu z Twojej historii.',
                confirm: 'Usuń',
            },
            history: {
                title: 'Historia scenariuszy'
            }
        },
        pact: {
            title: 'Pakt cyfrowy',
            description: 'Wspólnie wygenerujcie zestaw zasad klasowych dla zdrowej interakcji cyfrowej.',
            studentCountLabel: 'Liczba uczniów',
            mainConcernsLabel: 'Główne obawy (opcjonalnie)',
            mainConcernsPlaceholder: 'np. korzystanie z mediów społecznościowych, poszanowanie prywatności',
            button: 'Generuj wersję roboczą paktu',
            saveDraftButton: 'Zapisz wersję roboczą',
            publishButton: 'Opublikuj',
            republishButton: 'Opublikuj ponownie',
            publishedAt: 'Opublikowano {date} (wersja {version})',
            noPacts: {
                title: 'Gotowi do zawarcia paktu?',
                description: 'Ustaw parametry swojej klasy i wygeneruj wersję roboczą swojego paktu cyfrowego convivencia.'
            },
            deleteDialog: {
                title: 'Usunąć ten pakt?',
                description: 'Spowoduje to trwałe usunięcie wygenerowanego paktu.',
                confirm: 'Usuń'
            },
            history: {
                title: 'Historia paktów',
                principles: 'Zasady przewodnie',
                norms: 'Szczegółowe normy',
                consequences: 'Konsekwencje naprawcze',
                level: 'Poziom',
                restorativeAction: 'Działanie naprawcze'
            }
        },
        typeLabel: 'Typ działania',
        typePlaceholder: 'Wybierz typ...',
        types: {
            'netiquette-challenge': 'Wyzwanie netykiety',
            'digital-collaboration': 'Gra współpracy cyfrowej',
            'positive-messaging': 'Przerabiacz pozytywnych wiadomości'
        },
        customPromptLabel: 'Konkretny fokus (opcjonalnie)',
        customPromptPlaceholder: 'np. Skup się na komentarzach w mediach społecznościowych...',
        button: 'Generuj działanie',
        history: {
            title: 'Historia działań',
            studentInstructions: 'Instrukcje dla uczniów',
            pedagogicalObjectives: 'Cele pedagogiczne',
            materials: 'Materiały',
            noMaterials: 'Brak materiałów.',
            steps: 'Kroki',
        },
        noActivities: {
            title: 'Gotowy do promowania dobrych nawyków cyfrowych?',
            description: 'Wybierz typ działania powyżej, aby wygenerować swoje pierwsze ćwiczenie z obywatelstwa cyfrowego.'
        },
        deleteDialog: {
            title: 'Usunąć to działanie?',
            description: 'Ta akcja jest trwała i nie można jej cofnąć.',
            confirm: 'Usuń'
        }
    },
    suggestions: {
        button: 'Zasugeruj z AI',
        toastSuccess: 'Temat zasugerowany!'
    }
} as const;