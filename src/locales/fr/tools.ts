
export default {
    title: 'Outils',
    tagline: 'Utilisez les outils de l\'IA pour améliorer votre enseignement.',
    activityAdapter: {
      title: 'Adaptateur d\'activités',
      description: 'Adaptez n\'importe quelle activité existante pour mieux répondre aux besoins de votre classe, que ce soit pour des élèves spécifiques ou pour l\'ensemble du groupe.',
      placeholder: 'Collez ou écrivez l\'activité que vous souhaitez adapter ici...',
      activityLabel: 'Activité à adapter',
      existingActivityLabel: 'Sélectionnez une activité ou un test existant',
      existingActivityPlaceholder: 'Choisissez une activité/un test à résumer et à adapter...',
      studentLabel: 'Adapter pour des élèves spécifiques (facultatif)',
      studentPlaceholder: 'Sélectionner des élèves...',
      customPromptLabel: 'Objectif spécifique de l\'adaptation (facultatif)',
      customPromptPlaceholder: 'ex., En faire un jeu, se concentrer sur l\'écriture...',
      button: 'Adapter l\'activité',
      generatingTitle: 'Génération d\'adaptations...',
      activityType: 'Activité'
    },
     rubricGenerator: {
      title: 'Générateur de grilles d\'évaluation',
      description: 'Créez une grille d\'évaluation juste et équilibrée pour n\'importe quelle activité.',
      placeholder: 'Décrivez l\'activité pour laquelle générer une grille d\'évaluation...',
      button: 'Générer une grille d\'évaluation',
      testType: 'Test'
    },
    history: {
      title: 'Historique',
      descriptionAdapter: 'Examinez les activités précédemment adaptées.',
      descriptionRubric: 'Examinez les grilles d\'évaluation précédemment générées.',
      reasoning: 'Justification',
      criterion: 'Critère',
      excellent: 'Excellent',
      satisfactory: 'Satisfaisant',
      needsImprovement: 'Besoin d\'amélioration',
      scoringGuide: 'Guide de notation',
      toastDeleteSuccess: 'Suppression réussie.',
      toastDeleteFailed: 'Échec de la suppression.',
      noResults: {
        title: 'Aucun résultat pour le moment',
        description: 'Utilisez l\'outil à gauche pour générer votre premier résultat.',
      },
      deleteDialogAdapter: {
          title: 'Supprimer cette adaptation ?',
          description: 'Cette action ne peut pas être annulée. Cela supprimera définitivement l\'adaptation de l\'activité.',
          confirm: 'Supprimer'
      },
      deleteDialogRubric: {
          title: 'Supprimer cette grille d\'évaluation ?',
          description: 'Cette action ne peut pas être annulée. Cela supprimera définitivement la grille d\'évaluation générée.',
          confirm: 'Supprimer'
      }
    }
} as const;
