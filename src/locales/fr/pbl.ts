
export default {
    title: 'Labo APP',
    tagline: 'Orchestrez des projets complexes à partir d\'une seule idée.',
    tabs: {
        phase1: 'Phase 1 : Planification',
        phase2: 'Phase 2 : Équipes',
        phase3: 'Phase 3 : Développement',
        phase4: 'Phase 4 : Évaluation',
    },
    phase1: {
        form: {
            title: 'Phase 1 : Planificateur de projet',
            description: 'Définissez un sujet central et laissez l\'IA construire un plan de projet structuré.',
            topicLabel: 'Sujet central du projet',
            topicPlaceholder: 'ex. Le changement climatique dans notre ville, Histoire des jeux vidéo...',
            skillsLabel: 'Compétences clés à développer',
            noSkills: 'Aucune compétence définie pour le moment. Allez au générateur d\'activités pour en ajouter.',
            durationLabel: 'Durée estimée',
            durations: {
                'oneWeek': '1 semaine',
                'twoWeeks': '2 semaines',
                'oneMonth': '1 mois',
            },
            generateButton: 'Générer un plan de projet'
        },
        generating: {
            title: 'Génération du plan de projet...'
        },
    },
    phase2: {
        title: 'Phase 2 : Formation des équipes',
        description: 'Utilisez l\'IA pour former des groupes stratégiques en fonction des profils et des relations de vos élèves.',
        selectProject: 'Sélectionner un projet',
        selectProjectPlaceholder: 'Choisissez un projet pour former des équipes...',
        teamSize: 'Taille de l\'équipe',
        groupingCriteria: 'Critères de regroupement',
        criteria: {
            balanced: 'Équipes équilibrées',
            'social-remediation': 'Remédiation sociale',
            synergy: 'Synergie d\'intérêts',
        },
        generateButton: 'Générer les équipes',
        noProjectSelected: 'Veuillez d\'abord sélectionner un projet.',
        results: {
            title: 'Équipes suggérées',
            teamName: 'Équipe {name}',
            rationale: 'Justification de l\'équipe',
            formation: 'Formation',
            deleteDialog: {
                title: 'Supprimer cette formation d\'équipe ?',
                description: 'Cette action ne peut pas être annulée. Cela supprimera définitivement la formation de l\'équipe.',
            },
        },
        table: {
            student: 'Élève',
            suggestedRole: 'Rôle suggéré',
            justification: 'Justification',
        }
    },
    phase3: {
        title: 'Phase 3 : Échafaudage à la volée',
        description: 'Générez des plans d\'intervention rapides pour les équipes rencontrant des difficultés lors du développement du projet.',
        selectTeam: 'Équipe à intervenir',
        selectTeamPlaceholder: 'Sélectionner les élèves...',
        problemLabel: 'Décrivez le problème',
        problemPlaceholder: 'ex. L\'équipe est bloquée, il y a un conflit, un élève est démotivé...',
        generateButton: 'Générer une intervention',
        suggestionTitle: 'Intervention suggérée',
        microActivity: 'Micro-activité pour débloquer',
        guidingQuestions: 'Questions directrices pour l\'enseignant',
        noSuggestion: 'Le plan d\'intervention généré apparaîtra ici.',
    },
    phase4: {
        title: 'Phase 4 : Générateur de grille d\'évaluation',
        description: 'Générez une grille d\'évaluation détaillée pour le produit final d\'un projet.',
        generateButton: 'Générer la grille d\'évaluation',
        rubricTitle: 'Grille d\'évaluation suggérée',
        noRubric: 'La grille d\'évaluation générée apparaîtra ici.',
    },
    history: {
        title: 'Historique des projets',
        description: 'Examinez et gérez les projets précédemment générés.',
        noResults: {
            title: 'Aucun projet pour le moment',
            description: 'Utilisez le formulaire pour générer votre premier plan d\'Apprentissage Par Projets.'
        },
        phases: 'Phases du projet',
        milestones: 'Jalons clés',
        finalProduct: 'Suggestion de produit final',
        deleteDialog: {
            title: 'Supprimer ce plan de projet ?',
            description: 'Cette action ne peut pas être annulée. Cela supprimera définitivement le plan de projet.',
        },
    },
} as const;
