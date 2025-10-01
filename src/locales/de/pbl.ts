
export default {
    title: 'PBL-Labor',
    tagline: 'Orchestrieren Sie komplexe Projekte aus einer einzigen Idee.',
    tabs: {
        phase1: 'Phase 1: Planung',
        phase2: 'Phase 2: Teams',
        phase3: 'Phase 3: Entwicklung',
        phase4: 'Phase 4: Bewertung',
    },
    phase1: {
        form: {
            title: 'Phase 1: Projektplaner',
            description: 'Definieren Sie ein zentrales Thema und lassen Sie die KI einen strukturierten Projektplan erstellen.',
            topicLabel: 'Zentrales Projektthema',
            topicPlaceholder: 'z.B. Klimawandel in unserer Stadt, Geschichte der Videospiele...',
            skillsLabel: 'Zu entwickelnde Schlüsselkompetenzen',
            noSkills: 'Noch keine Kompetenzen definiert. Gehen Sie zum Aktivitätengenerator, um welche hinzuzufügen.',
            durationLabel: 'Geschätzte Dauer',
            durations: {
                'oneWeek': '1 Woche',
                'twoWeeks': '2 Wochen',
                'oneMonth': '1 Monat',
            },
            generateButton: 'Projektplan erstellen'
        },
        generating: {
            title: 'Projektplan wird erstellt...'
        },
    },
    phase2: {
        title: 'Phase 2: Teambildung',
        description: 'Nutzen Sie KI, um strategische Gruppen basierend auf den Profilen und Beziehungen Ihrer Schüler zu bilden.',
        selectProject: 'Projekt auswählen',
        selectProjectPlaceholder: 'Wählen Sie ein Projekt zur Teambildung aus...',
        teamSize: 'Teamgröße',
        groupingCriteria: 'Gruppierungskriterien',
        criteria: {
            balanced: 'Ausgewogene Teams',
            'social-remediation': 'Soziale Sanierung',
            synergy: 'Interessensynergie',
        },
        generateButton: 'Teams erstellen',
        noProjectSelected: 'Bitte wählen Sie zuerst ein Projekt aus.',
        results: {
            title: 'Vorgeschlagene Teams',
            teamName: 'Team {name}',
            rationale: 'Teambegründung',
            formation: 'Formation',
            deleteDialog: {
                title: 'Diese Teambildung löschen?',
                description: 'Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird die Teambildung dauerhaft gelöscht.',
            },
        },
        table: {
            student: 'Schüler',
            suggestedRole: 'Vorgeschlagene Rolle',
            justification: 'Begründung',
        }
    },
    phase3: {
        title: 'Phase 3: Spontanes Scaffolding',
        description: 'Erstellen Sie schnelle Interventionspläne für Teams, die während der Projektentwicklung auf Herausforderungen stoßen.',
        selectTeam: 'Zu intervenierendes Team',
        selectTeamPlaceholder: 'Schüler auswählen...',
        problemLabel: 'Problem beschreiben',
        problemPlaceholder: 'z.B. Das Team steckt fest, es gibt einen Konflikt, ein Schüler ist unmotiviert...',
        generateButton: 'Intervention erstellen',
        suggestionTitle: 'Vorgeschlagene Intervention',
        microActivity: 'Mikro-Aktivität zum Entsperren',
        guidingQuestions: 'Leitfragen für den Lehrer',
        noSuggestion: 'Der generierte Interventionsplan wird hier angezeigt.',
    },
    phase4: {
        title: 'Phase 4: Rubrik-Generator',
        description: 'Erstellen Sie eine detaillierte Bewertungsrubrik für das Endprodukt eines Projekts.',
        generateButton: 'Rubrik erstellen',
        rubricTitle: 'Vorgeschlagene Bewertungsrubrik',
        noRubric: 'Die generierte Rubrik wird hier angezeigt.',
    },
    history: {
        title: 'Projektverlauf',
        description: 'Überprüfen und verwalten Sie zuvor erstellte Projekte.',
        noResults: {
            title: 'Noch keine Projekte',
            description: 'Verwenden Sie das Formular, um Ihren ersten projektbasierten Lernplan zu erstellen.'
        },
        phases: 'Projektphasen',
        milestones: 'Wichtige Meilensteine',
        finalProduct: 'Vorschlag für das Endprodukt',
        deleteDialog: {
            title: 'Diesen Projektplan löschen?',
            description: 'Diese Aktion kann nicht rückgängig gemacht werden. Dies löscht den Projektplan endgültig.',
        },
    },
} as const;
