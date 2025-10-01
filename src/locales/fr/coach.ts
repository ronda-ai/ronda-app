export default {
    title: 'Coach IA',
    tagline: 'Obtenez des informations et des suggestions basées sur l\'IA.',
    noStudentSelected: {
      title: 'Sélectionner un élève',
      description:
        'Choisissez un élève dans la liste pour voir son analyse et obtenir des suggestions.',
    },
    tabs: {
        classroom: 'Analyse de la classe',
        individual: 'Analyse individuelle'
    },
    coachSuggestion: {
      title: 'Suggestion du coach',
      description:
        'Générez une suggestion personnalisée pour cet élève en fonction de son profil et de ses performances.',
      button: 'Obtenir une suggestion',
      toastDeleted: 'Suggestion supprimée avec succès.',
      toastDeleteFailed: 'Échec de la suppression de la suggestion.',
      deleteDialog: {
        title: 'Supprimer cette suggestion ?',
        description: 'Cette action ne peut pas être annulée. Cela supprimera définitivement la suggestion du coach.',
        confirm: 'Supprimer',
      },
      noSuggestions: {
        title: 'Aucune suggestion pour le moment',
        description:
          'Générez la première suggestion pour cet élève pour commencer.',
      },
    },
    supportPlan: {
      title: 'Plan de soutien',
      description:
        'Générez un plan d\'action en plusieurs étapes pour soutenir le développement de cet élève.',
      button: 'Générer un nouveau plan',
      generating: 'Génération du plan, veuillez patienter...',
      planGenerated: 'Plan généré {date}',
      feedbackTitle: "Commentaires de l'enseignant",
      feedbackPlaceholder:
        'Qu\'est-ce qui a fonctionné ? Qu\'est-ce qui n\'a pas fonctionné ? Vos commentaires aident l\'IA à apprendre...',
      toastDeleted: 'Plan de soutien supprimé avec succès.',
      toastDeleteFailed: 'Échec de la suppression du plan de soutien.',
      noPlans: {
        title: 'Aucun plan de soutien pour le moment',
        description:
          'Générez le premier plan de soutien pour cet élève pour commencer.',
      },
      stepDialog: {
        title: 'Évaluer l\'étape de soutien',
        description: 'Comment s\'est déroulée cette étape ?',
        status: 'Statut',
        feedback: 'Commentaires sur l\'étape (facultatif)',
        feedbackPlaceholder: 'Ajoutez une note sur cette étape...',
        saveButton: 'Enregistrer l\'évaluation de l\'étape',
        statuses: {
          pending: 'En attente',
          achieved: 'Atteint',
          'partially-achieved': 'Partiellement atteint',
          'not-achieved': 'Non atteint',
          discarded: 'Abandonné',
        },
      },
      deleteDialog: {
        title: 'Êtes-vous sûr de vouloir supprimer ce plan ?',
        description:
          'Cette action ne peut pas être annulée. Cela supprimera définitivement le plan de soutien.',
        confirm: 'Supprimer',
      },
    },
    moodAnalysis: {
      title: 'Analyse des tendances d\'humeur',
      descriptionStudent:
        'Analysez l\'humeur de cet élève à travers différents défis pour trouver des modèles.',
      descriptionClassroom:
        'Obtenez une analyse à l\'échelle de la classe sur les tendances d\'humeur pour améliorer la dynamique générale.',
      button: 'Analyser les tendances',
      buttonClassroom: 'Analyser les tendances de la classe',
      analysisTitle: 'Perspective de l\'IA',
      noAnalyses: {
        title: 'Aucune analyse pour le moment',
        descriptionStudent:
          'Générez la première analyse d\'humeur pour cet élève pour commencer.',
        descriptionClassroom:
          'Générez la première analyse d\'humeur pour la classe pour commencer.',
      },
       toastDeleted: 'Analyse supprimée avec succès.',
       toastDeleteFailed: 'Échec de la suppression de l\'analyse.',
       deleteDialog: {
        title: 'Supprimer cette analyse ?',
        description: 'Cette action ne peut pas être annulée. Cela supprimera définitivement l\'analyse générée.',
        confirm: 'Supprimer',
      },
    },
    relationshipLab: {
      title: 'Laboratoire de dynamiques sociales',
      description: 'Un espace pour analyser et améliorer les relations entre les élèves.',
      button: 'Ouvrir le laboratoire',
      tagline: 'Orchestrez des interactions sociales positives.',
      tabs: {
        multiStudent: 'Entre pairs',
        singleStudent: 'Individuel',
      },
      form: {
        title: 'Générateur de stratégies de remédiation des relations',
        description: 'Sélectionnez des élèves ayant une relation tendue pour recevoir un plan d\'intervention personnalisé.',
        studentsLabel: 'Sélectionner les élèves (2-4)',
        studentsPlaceholder: 'Sélectionner les élèves...',
        focusLabel: 'Objectif principal / Compétence à renforcer',
        focusPlaceholder: 'ex., Communication, Empathie, Collaboration...',
        customPromptLabel: 'Instruction personnalisée (facultatif)',
        customPromptPlaceholder: 'ex., Créer une activité non verbale, en faire un jeu...',
        generateButton: 'Générer une stratégie',
      },
      individual: {
          form: {
              title: 'Générateur de stratégies individuelles',
              description: 'Sélectionnez un seul élève pour générer un plan qui l\'aidera à s\'intégrer et à mieux interagir avec la classe.',
              studentsPlaceholder: 'Sélectionner un élève...',
              generateButton: 'Générer une stratégie d\'intégration'
          },
          history: {
              title: 'Historique des stratégies individuelles',
              description: 'Examinez les stratégies précédemment générées pour cet élève.',
               prompt: {
                  title: 'Prêt à construire des ponts ?',
                  description: 'Sélectionnez un élève pour voir son historique ou générer une nouvelle stratégie d\'intégration sociale.',
              },
          },
          toastSuccess: 'Stratégie d\'intégration générée !',
          toastDeleteSuccess: 'Stratégie supprimée avec succès.',
          toastDeleteFailed: 'Échec de la suppression de la stratégie.',
          deleteDialog: {
              title: 'Supprimer cette stratégie ?',
              description: 'Cette action ne peut pas être annulée et supprimera définitivement la stratégie.',
              confirm: 'Supprimer'
          }
      },
      suggestions: {
          button: 'Suggérer avec l\'IA',
          toastSuccess: 'Suggestion ajoutée au formulaire !'
      },
       studentInfo: {
          title: "Profil des élèves sélectionnés",
          qualities: 'Qualités',
          fears: 'Peurs',
          none: 'Aucune répertoriée',
      },
      history: {
        title: 'Historique des stratégies',
        description: 'Examinez les stratégies précédemment générées pour les élèves sélectionnés.',
        header: 'Stratégie pour {focus}',
        statusLabel: 'Statut de la stratégie',
        statusPlaceholder: 'Définir le statut...',
        feedbackLabel: 'Commentaires de l\'enseignant',
        feedbackPlaceholder: 'Comment cette stratégie a-t-elle fonctionné en pratique ?',
        saveFeedbackButton: 'Enregistrer l\'évaluation',
        toastUpdateSuccess: 'Stratégie mise à jour avec succès !',
        toastUpdateFailed: 'Échec de la mise à jour de la stratégie.',
        prompt: {
            title: 'Prêt à intervenir ?',
            description: 'Sélectionnez au moins deux élèves dans le formulaire pour voir leur historique ou générer une nouvelle stratégie.',
        },
        noResults: {
            title: 'Aucune stratégie pour le moment',
            description: 'Générez la première stratégie pour ce groupe d\'élèves.',
        },
         stepDialog: {
            title: 'Évaluer l\'étape de remédiation',
            description: 'Comment s\'est déroulée cette étape ?',
            status: 'Statut',
            feedback: 'Commentaires sur l\'étape (facultatif)',
            feedbackPlaceholder: 'Ajoutez une note sur cette étape...',
            saveButton: 'Enregistrer l\'évaluation',
            statuses: {
                pending: 'En attente',
                completed: 'Terminé',
                skipped: 'Passé',
            },
        },
      },
      details: {
          title: "Détails de la stratégie pour '{focus}'",
          adjustTitle: "Ajuster la stratégie",
          adjustPlaceholder: "ex., Rendre plus simple, ajouter un composant de dessin, se concentrer davantage sur les indices non verbaux...",
          adjustButton: "Générer une stratégie ajustée",
      },
      status: {
        'not_started': 'Non commencé',
        'in_progress': 'En cours',
        'successful': 'Réussi',
        'partially_successful': 'Partiellement réussi',
        'did_not_work': 'N\'a pas fonctionné',
        'needs_adjustment': 'Nécessite un ajustement',
      },
      toastSuccess: 'Stratégie de remédiation générée !',
    },
    qualitiesSuggestion: {
      title: 'Suggestion de qualités',
      description: 'Découvrez des qualités émergentes en fonction des performances des élèves.',
      button: 'Découvrir les qualités',
      suggestionText:
        'En fonction des performances récentes, l\'IA suggère les qualités suivantes :',
      noSuggestions: {
        title: 'Aucune suggestion de qualité pour le moment',
        description:
          'Générez la première suggestion de qualité pour cet élève pour commencer.',
      },
      dialog: {
        title: 'Nouvelles suggestions de qualités pour {name}',
        description:
          'En fonction des performances recentes, voici quelques qualités que vous pourriez envisager d\'ajouter :',
        accept: 'Accepter',
        reject: 'Rejeter',
        confirmation: 'Comment souhaitez-vous mettre à jour les qualités ?',
        add: 'Ajouter comme nouvelles',
        replace: 'Remplacer les existantes',
        confirm: 'Confirmer la mise à jour',
      },
    },
    concernAnalysis: {
      title: 'Analyse des schémas de préoccupation',
      description:
        'L\'IA analysera l\'historique complet de l\'élève pour détecter des schémas négatifs récurrents.',
      button: 'Analyser les préoccupations',
      noAnalyses: {
        title: 'Aucun schéma de préoccupation détecté',
        description:
          'Générez une analyse pour vérifier les problèmes récurrents potentiels.',
      },
    },
    fearManagement: {
      title: 'Suggestions de gestion de la peur',
      description: 'Générez des stratégies empathiques pour aider un élève avec ses peurs.',
      button: 'Obtenir une stratégie',
      strategyFor: 'Stratégie pour :',
      feedbackTitle: 'Comment ça s\'est passé ?',
      feedbackPlaceholder: 'Vos commentaires aident l\'IA à apprendre et à s\'améliorer...',
      toastFearUpdated: 'Profil de peur de l\'élève mis à jour !',
      toastFearUpdateFailed: 'Échec de la mise à jour des peurs de l\'élève.',
      toastDeleted: 'Suggestion supprimée avec succès.',
      toastDeleteFailed: 'Échec de la suppression de la suggestion.',
      noSuggestions: {
        title: 'Aucune stratégie pour le moment',
        description: 'Générez une stratégie pour aider cet élève à gérer ses peurs.',
        noFears: 'Cet élève n\'a aucune peur répertoriée. Ajoutez des peurs à son profil pour obtenir des suggestions.',
      },
      updateDialog: {
        title: 'Mettre à jour le profil de l\'élève ?',
        confirm: 'Oui, mettre à jour le profil',
      },
      deleteDialog: {
        title: 'Supprimer cette suggestion ?',
        description: 'Cette action ne peut pas être annulée.',
        confirm: 'Supprimer',
      },
      dialog: {
        title: 'Gérer la peur de {fear}',
        description: 'Examinez les stratégies existantes ou générez-en une nouvelle pour {name}.',
        generateButton: 'Générer une nouvelle suggestion',
        noSuggestions: {
            title: 'Aucune stratégie pour le moment',
            description: 'Générez la première suggestion de l\'IA pour aborder cette peur.'
        }
      }
    }
} as const;