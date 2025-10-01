export default {
    title: 'Évaluations',
    tagline: 'Examinez et évaluez la participation des élèves.',
    evaluateButton: 'Évaluer',
    evaluatedStatus: 'Évalué',
    rejectedStatus: 'Rejeté',
    noChallenges: 'Aucun défi enregistré pour cet élève pour le moment.',
    noEvaluations: {
      title: 'Aucune évaluation pour le moment',
      description:
        'Une fois qu\'un élève accepte un défi, vous pouvez l\'évaluer ici.',
    },
    evaluationDialog: {
      title: 'Évaluer le défi',
      forStudent: 'pour {name}',
      challenge: 'Défi',
      rating: 'Note',
      feedback: 'Commentaires',
      feedbackPlaceholder: 'Entrez vos commentaires ici...',
      saveButton: 'Enregistrer l\'évaluation',
      mood: 'Humeur de l\'élève',
    },
    ratings: {
      needsSupport: 'A besoin de soutien',
      metExpectations: 'A satisfait aux attentes',
      exceededExpectations: 'A dépassé les attentes',
    },
    moods: {
      enthusiastic: 'Enthousiaste',
      focused: 'Concentré',
      nervous: 'Nerveux',
      frustrated: 'Frustré',
      happy: 'Heureux',
      tired: 'Fatigué',
    },
    pagination: {
        previous: 'Précédent',
        next: 'Suivant',
        page: 'Page {currentPage} sur {totalPages}',
    }
} as const;
