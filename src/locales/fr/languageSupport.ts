
export default {
      title: 'Soutien linguistique',
      tagline: 'Générez du matériel bilingue pour soutenir l\'inclusion linguistique.',
      form: {
          title: 'Assistant d\'inclusion linguistique',
          description: 'Sélectionnez un élève et spécifiez sa langue pour générer du matériel de soutien personnalisé.',
          studentLabel: 'Élève',
          studentPlaceholder: 'Sélectionner un élève...',
          languageLabel: "Langue maternelle de l'élève",
          languagePlaceholder: 'ex., Espagnol, Français, Mandarin',
          focusAreasLabel: 'Domaines d\'intervention',
          generateButton: 'Générer du matériel de soutien',
      },
      focusAreas: {
          reading: 'Compréhension écrite',
          writing: 'Compétences en écriture',
          speaking: 'Expression orale',
          listening: 'Compréhension orale',
          'social-emotional': 'Intégration socio-émotionnelle',
      },
      addFocusAreaDialog: {
        title: 'Ajouter de nouveaux domaines d\'intervention',
        description: 'Sélectionnez parmi les suggestions de l\'IA ou ajoutez vos propres domaines d\'intervention à la liste.',
        customPromptLabel: 'Guider l\'IA (facultatif)',
        customPromptPlaceholder: 'ex., Se concentrer sur les domaines de l\'écoute...',
        manualAreaLabel: 'Ou ajouter un domaine manuellement',
        manualAreaPlaceholder: 'Saisir un nouveau domaine...',
        noSuggestions: 'Aucune suggestion disponible. Essayez d\'actualiser ou de modifier votre instruction.',
        add: 'Ajouter :',
        addSelected: 'Ajouter la sélection',
        toastSuccess: 'Domaines d\'intervention ajoutés avec succès !',
        toastError: 'Échec de l\'ajout des domaines d\'intervention.',
      },
      editFocusAreaDialog: {
        title: 'Modifier le domaine d\'intervention : {name}',
        areaNameLabel: 'Nom du domaine d\'intervention',
        deleteButton: 'Supprimer le domaine',
        toastUpdateSuccess: 'Domaine d\'intervention mis à jour avec succès !',
        toastUpdateError: 'Échec de la mise à jour du domaine d\'intervention.',
        toastDeleteSuccess: 'Domaine d\'intervention supprimé avec succès !',
        toastDeleteError: 'Échec de la suppression du domaine d\'intervention.',
        deleteDialog: {
            title: 'Êtes-vous sûr(e) ?',
            description: 'Cela supprimera définitivement le domaine d\'intervention "{name}" de la liste.',
            cancel: 'Annuler',
            confirm: 'Supprimer'
        }
      },
      generatingTitle: 'Génération de matériel de soutien...',
      history: {
          title: 'Historique du matériel généré',
          description: 'Examinez le matériel précédemment généré pour l\'élève sélectionné.',
          selectStudentPrompt: {
            title: 'Sélectionner un élève',
            description: 'Choisissez un élève dans le formulaire pour voir son historique et générer de nouveaux matériels.',
          },
          noResults: {
              title: 'Aucun matériel pour le moment',
              description: 'Utilisez le formulaire pour générer le premier matériel de soutien pour cet élève.',
          },
          header: 'Matériel pour {language}',
          teacherGuide: 'Guide de l\'enseignant',
          studentMaterial: 'Matériel de l\'élève',
          feedbackTitle: "Commentaires de l'enseignant",
          feedbackPlaceholder: 'Ce matériel a-t-il été utile ? Vos commentaires aident à améliorer les suggestions futures.',
          toastDeleted: 'Matériel de soutien supprimé.',
          toastDeleteFailed: 'Échec de la suppression du matériel de soutien.',
          deleteDialog: {
            title: 'Supprimer ce matériel ?',
            description: 'Cette action ne peut pas être annulée. Cela supprimera définitivement le matériel de soutien généré.',
          },
          translationTitle: "Traduction pour {language}",
          showTranslation: "Afficher la traduction",
          hideTranslation: "Masquer la traduction",
      }
} as const;
