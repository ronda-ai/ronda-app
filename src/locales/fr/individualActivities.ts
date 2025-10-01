export default {
    title: 'Activités individuelles',
    tagline: 'Concevez des activités personnalisées pour un élève spécifique.',
    step0: {
        title: 'Sélectionner un élève',
        description: 'Choisissez un élève pour commencer à générer des activités personnalisées.',
    },
    step1: {
      selectLabel: 'Élève',
      selectPlaceholder: 'Sélectionner un élève...',
    },
    generator: {
        title: 'Générateur d\'activités pour {name}',
        description: 'Définissez les paramètres de l\'activité, ou utilisez l\'IA pour suggérer des idées.',
        topicLabel: 'Sujet académique',
        topicPlaceholder: 'ex., Fractions, Photosynthèse',
        skillsLabel: 'Compétences à développer',
        skillsPlaceholder: 'ex., Pensée critique, Collaboration',
        themesLabel: 'Thèmes d\'engagement',
        themesPlaceholder: 'ex., Espace, Dinosaures, Mystères',
        customPromptLabel: 'Instruction personnalisée (facultatif)',
        customPromptPlaceholder: 'ex., Se concentrer sur les éléments visuels, en faire une activité pratique',
        negativePromptLabel: 'Instruction négative (facultatif)',
        negativePromptPlaceholder: 'ex., Éviter les tâches d\'écriture, ne pas mentionner les araignées',
        generateButton: 'Générer des activités',
        toastSuccess: 'Activités générées avec succès !',
        noSkills: 'Aucune compétence disponible pour le moment.',
        addSkills: 'Ajouter de nouvelles compétences'
    },
    suggestions: {
        button: 'Suggérer avec l\'IA',
        toastSuccess: 'Suggestions ajoutées !',
    },
    history: {
        title: "Historique des plans d'activités",
        description: "Examinez et gérez les plans d'activités précédemment générés pour {name}.",
        toastDeleted: 'Plan d\'activités supprimé.',
        toastDeleteFailed: 'Échec de la suppression du plan d\'activités.',
        noResults: {
            title: "Aucun plan d'activités pour le moment",
            description: "Générez le premier plan pour cet élève pour voir son historique ici."
        },
        deleteDialog: {
            title: "Supprimer ce plan d'activités ?",
            description: "Cette action ne peut pas être annulée. Cela supprimera définitivement le plan d'activités.",
        },
        stepDialog: {
            title: 'Évaluer l\'étape de l\'activité',
            description: 'Comment s\'est déroulée cette activité ?',
            status: 'Statut',
            feedback: 'Commentaires sur l\'étape (facultatif)',
            feedbackPlaceholder: 'Ajoutez une note sur cette activité...',
            saveButton: 'Enregistrer l\'évaluation',
            statuses: {
                pending: 'En attente',
                'in-progress': 'En cours',
                completed: 'Terminé',
                skipped: 'Passé'
            },
        },
    },
    democratizer: {
      title: 'Démocratiseur de ressources',
      descriptionSingle: 'Adaptez cette activité pour la rendre plus accessible.',
      descriptionAll: 'Adaptez toutes les activités de ce plan pour les rendre plus accessibles en fonction des différents besoins ou des limitations de ressources.',
      descriptionSelected: 'Adaptez les {count} activités sélectionnées de ce plan pour les rendre plus accessibles.',
      prompt: 'Sélectionnez une option d\'adaptation à appliquer aux activités.',
      selectPlaceholder: 'Choisissez une adaptation...',
      activitiesToAdapt: "Activités à adapter :",
      adaptButton: 'Adapter les activités',
      toastSuccess: 'Activités adaptées avec succès !',
      options: {
        commonMaterials: 'Adapter pour des matériaux ménagers courants',
        lowEnergy: 'Adapter pour des scénarios calmes/à faible énergie',
        socialInteraction: 'Augmenter la composante d\'interaction sociale',
        simpleInstructions: 'Simplifier les instructions',
      },
    }
} as const;
