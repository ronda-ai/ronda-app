
export default {
    title: 'Activités de groupe',
    tagline: 'Formez des groupes intelligemment et générez des activités collaboratives.',
    generator: {
      title: 'Générateur de suggestions de groupe',
      description: 'L\'IA analysera votre classe pour suggérer des groupes équilibrés et une astuce d\'animation.',
      button: 'Générer de nouvelles suggestions',
    },
    manualMode: {
        title: 'Constructeur de groupe manuel',
        description: 'Créez vos propres groupes et obtenez de l\'aide de l\'IA.',
        selectLabel: 'Sélectionner des élèves pour un nouveau groupe',
        selectPlaceholder: 'Choisir des élèves...',
        createGroupButton: 'Créer un groupe',
        groupTitle: 'Nouveau groupe',
        analyzeButton: 'Analyser la dynamique',
        generateActivityButton: 'Générer une activité',
        warningTitle: 'Alerte relationnelle',
        conflictWarning: '{nameA} et {nameB} ont un conflit enregistré. Procédez avec prudence.',
        skillsLabel: 'Compétences collaboratives à développer',
        skillsPlaceholder: 'ex., Communication, Leadership',
        themesLabel: 'Thème de l\'activité (facultatif)',
        themesPlaceholder: 'ex., Mission spatiale, Résolution de mystère',
        activityGeneratedToast: 'Activité générée avec succès !',
    },
    aiSuggestions: {
        title: 'Suggestions générées par l\'IA',
    },
    history: {
      title: 'Historique des suggestions',
      description: 'Examinez les suggestions de groupe précédemment générées.',
      suggestionFor: 'Suggestion de {date}',
      teacherTipTitle: 'Astuce de l\'animateur',
      suggestedGroups: 'Groupes suggérés',
      group: 'Groupe',
      suggestedSkills: 'Compétences collaboratives suggérées',
      suggestedThemes: 'Thèmes d\'activité suggérés',
      useSuggestionButton: 'Utiliser cette suggestion',
      suggestionUsedToast: 'Suggestion appliquée au constructeur de groupe manuel !',
      noResults: {
        title: 'Prêt à collaborer ?',
        description: 'Cliquez sur le bouton ci-dessus pour générer le premier ensemble de suggestions de groupe pour votre classe.',
      },
      toastDeleted: 'Suggestion supprimée.',
      toastDeleteFailed: 'Échec de la suppression de la suggestion.',
      deleteDialog: {
        title: 'Supprimer cette suggestion ?',
        description: 'Cette action est permanente et ne peut pas être annulée.',
      },
    },
    viewActivitiesButton: 'Voir les activités générées',
    details: {
        title: 'Activités générées pour le groupe',
        description: 'Les activités suivantes ont été générées pour {members}.',
        deleteButton: 'Supprimer le plan d\'activités',
    }
} as const;
