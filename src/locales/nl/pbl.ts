
export default {
    title: 'PBL Lab',
    tagline: 'Orkestreer complexe projecten vanuit één idee.',
    tabs: {
        phase1: 'Fase 1: Planning',
        phase2: 'Fase 2: Teams',
        phase3: 'Fase 3: Ontwikkeling',
        phase4: 'Fase 4: Evaluatie',
    },
    phase1: {
        form: {
            title: 'Fase 1: Projectplanner',
            description: 'Definieer een centraal onderwerp en laat de AI een gestructureerd projectplan bouwen.',
            topicLabel: 'Centraal Projectonderwerp',
            topicPlaceholder: 'bijv. Klimaatverandering in onze stad, Geschiedenis van videogames...',
            skillsLabel: 'Te Ontwikkelen Sleutelvaardigheden',
            noSkills: 'Nog geen vaardigheden gedefinieerd. Ga naar de Activiteitengenerator om er enkele toe te voegen.',
            durationLabel: 'Geschatte Duur',
            durations: {
                'oneWeek': '1 Week',
                'twoWeeks': '2 Weken',
                'oneMonth': '1 Maand',
            },
            generateButton: 'Genereer Projectplan'
        },
        generating: {
            title: 'Projectplan genereren...'
        },
    },
    phase2: {
        title: 'Fase 2: Teamvorming',
        description: 'Gebruik AI om strategische groepen te vormen op basis van de profielen en relaties van uw studenten.',
        selectProject: 'Selecteer Project',
        selectProjectPlaceholder: 'Kies een project om teams voor te vormen...',
        teamSize: 'Teamgrootte',
        groupingCriteria: 'Groeperingscriteria',
        criteria: {
            balanced: 'Gebalanceerde Teams',
            'social-remediation': 'Sociale Sanering',
            synergy: 'Interessesynergie',
        },
        generateButton: 'Genereer Teams',
        noProjectSelected: 'Selecteer eerst een project.',
        results: {
            title: 'Voorgestelde Teams',
            teamName: 'Team {name}',
            rationale: 'Teamrationale',
            formation: 'Formatie',
            deleteDialog: {
                title: 'Deze teamformatie verwijderen?',
                description: 'Deze actie kan niet ongedaan worden gemaakt. Dit zal de teamformatie permanent verwijderen.',
            },
        },
        table: {
            student: 'Student',
            suggestedRole: 'Voorgestelde Rol',
            justification: 'Rechtvaardiging',
        }
    },
    phase3: {
        title: 'Fase 3: On-the-Fly Scaffolding',
        description: 'Genereer snelle interventieplannen voor teams die tijdens de projectontwikkeling met uitdagingen worden geconfronteerd.',
        selectTeam: 'Te Interveniëren Team',
        selectTeamPlaceholder: 'Selecteer studenten...',
        problemLabel: 'Beschrijf het Probleem',
        problemPlaceholder: 'bijv. Het team zit vast, er is een conflict, een student is ongemotiveerd...',
        generateButton: 'Genereer Interventie',
        suggestionTitle: 'Voorgestelde Interventie',
        microActivity: 'Micro-Activiteit om te Ontgrendelen',
        guidingQuestions: 'Leidende Vragen voor de Leraar',
        noSuggestion: 'Het gegenereerde interventieplan verschijnt hier.',
    },
    phase4: {
        title: 'Fase 4: Rubric Generator',
        description: 'Genereer een gedetailleerde evaluatierubric voor het eindproduct van een project.',
        generateButton: 'Genereer Rubric',
        rubricTitle: 'Voorgestelde Evaluatierubric',
        noRubric: 'De gegenereerde rubric verschijnt hier.',
    },
    history: {
        title: 'Projectgeschiedenis',
        description: 'Bekijk en beheer eerder gegenereerde projecten.',
        noResults: {
            title: 'Nog Geen Projecten',
            description: 'Gebruik het formulier om uw eerste projectgebaseerde leerplan te genereren.'
        },
        phases: 'Projectfasen',
        milestones: 'Belangrijke Mijlpalen',
        finalProduct: 'Suggestie voor Eindproduct',
        deleteDialog: {
            title: 'Dit projectplan verwijderen?',
            description: 'Deze actie kan niet ongedaan worden gemaakt. Dit zal het projectplan permanent verwijderen.',
        },
    },
} as const;
