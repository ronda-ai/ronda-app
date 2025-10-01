export default {
    selectionMode: 'Mode de sélection',
    readyToSpin: 'Prêt à tourner ?',
    readyToSelect: 'Prêt à sélectionner ?',
    spinTheWheel: 'Faire tourner la roue !',
    selectStudent: 'Sélectionner un/des élève(s)',
    selectStudentSingular: 'Sélectionner un élève',
    spinning: 'Ça tourne...',
    modes: {
      random: 'Aléatoire',
      weighted: 'IA pondérée',
      lightning: 'Tour éclair',
      pair: 'Duo de choc',
      personalizedIndividual: 'Individuel personnalisé',
      personalizedMultiple: 'Multiple personnalisé',
    },
    modeDescriptions: {
      random: 'Sélectionne un élève de manière totalement aléatoire.',
      weighted:
        'L\'IA sélectionne un élève, en donnant plus de chances à ceux qui ont moins participé.',
      lightning: 'Un défi rapide et simple pour un élève sélectionné au hasard.',
      pair: 'Sélectionne deux élèves au hasard pour collaborer sur un défi.',
      personalizedIndividual:
        'Sélectionnez manuellement un élève pour un défi hautement personnalisé.',
      personalizedMultiple:
        'Sélectionnez manuellement jusqu\'à trois élèves pour un défi collaboratif personnalisé.',
    },
} as const;
