
export default {
    title: 'Laboratorium PBL',
    tagline: 'Orkiestruj złożone projekty z jednego pomysłu.',
    tabs: {
        phase1: 'Faza 1: Planowanie',
        phase2: 'Faza 2: Zespoły',
        phase3: 'Faza 3: Rozwój',
        phase4: 'Faza 4: Ocena',
    },
    phase1: {
        form: {
            title: 'Faza 1: Planer projektu',
            description: 'Zdefiniuj główny temat, a AI zbuduje ustrukturyzowany plan projektu.',
            topicLabel: 'Główny temat projektu',
            topicPlaceholder: 'np. Zmiany klimatyczne w naszym mieście, Historia gier wideo...',
            skillsLabel: 'Kluczowe umiejętności do rozwinięcia',
            noSkills: 'Nie zdefiniowano jeszcze żadnych umiejętności. Przejdź do Generatora aktywności, aby dodać.',
            durationLabel: 'Szacowany czas trwania',
            durations: {
                'oneWeek': '1 tydzień',
                'twoWeeks': '2 tygodnie',
                'oneMonth': '1 miesiąc',
            },
            generateButton: 'Generuj plan projektu'
        },
        generating: {
            title: 'Generowanie planu projektu...'
        },
    },
    phase2: {
        title: 'Faza 2: Formowanie zespołów',
        description: 'Użyj AI do formowania strategicznych grup na podstawie profili i relacji uczniów.',
        selectProject: 'Wybierz projekt',
        selectProjectPlaceholder: 'Wybierz projekt do utworzenia zespołów...',
        teamSize: 'Wielkość zespołu',
        groupingCriteria: 'Kryteria grupowania',
        criteria: {
            balanced: 'Zrównoważone zespoły',
            'social-remediation': 'Naprawa społeczna',
            synergy: 'Synergia zainteresowań',
        },
        generateButton: 'Generuj zespoły',
        noProjectSelected: 'Proszę najpierw wybrać projekt.',
        results: {
            title: 'Sugerowane zespoły',
            teamName: 'Zespół {name}',
            rationale: 'Uzasadnienie zespołu',
            formation: 'Formacja',
            deleteDialog: {
                title: 'Usunąć tę formację zespołu?',
                description: 'Ta akcja jest nieodwracalna. Spowoduje to trwałe usunięcie formacji zespołu.',
            },
        },
        table: {
            student: 'Uczeń',
            suggestedRole: 'Sugerowana rola',
            justification: 'Uzasadnienie',
        }
    },
    phase3: {
        title: 'Faza 3: Rusztowanie na bieżąco',
        description: 'Generuj szybkie plany interwencyjne dla zespołów napotykających wyzwania podczas rozwoju projektu.',
        selectTeam: 'Zespół do interwencji',
        selectTeamPlaceholder: 'Wybierz uczniów...',
        problemLabel: 'Opisz problem',
        problemPlaceholder: 'np. Zespół utknął, jest konflikt, uczeń jest zdemotywowany...',
        generateButton: 'Generuj interwencję',
        suggestionTitle: 'Sugerowana interwencja',
        microActivity: 'Mikro-aktywność do odblokowania',
        guidingQuestions: 'Pytania naprowadzające dla nauczyciela',
        noSuggestion: 'Wygenerowany plan interwencji pojawi się tutaj.',
    },
    phase4: {
        title: 'Faza 4: Generator rubryk',
        description: 'Wygeneruj szczegółową rubrykę oceny dla końcowego produktu projektu.',
        generateButton: 'Generuj rubrykę',
        rubricTitle: 'Sugerowana rubryka oceny',
        noRubric: 'Wygenerowana rubryka pojawi się tutaj.',
    },
    history: {
        title: 'Historia projektów',
        description: 'Przeglądaj i zarządzaj wcześniej wygenerowanymi projektami.',
        noResults: {
            title: 'Brak projektów',
            description: 'Użyj formularza, aby wygenerować swój pierwszy plan nauczania opartego na projektach.'
        },
        phases: 'Fazy projektu',
        milestones: 'Kluczowe etapy',
        finalProduct: 'Sugestia produktu końcowego',
        deleteDialog: {
            title: 'Usunąć ten plan projektu?',
            description: 'Ta akcja jest nieodwracalna. Spowoduje to trwałe usunięcie planu projektu.',
        },
    },
} as const;
