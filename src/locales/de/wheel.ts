export default {
    selectionMode: 'Auswahlmodus',
    readyToSpin: 'Bereit zum Drehen?',
    readyToSelect: 'Bereit zur Auswahl?',
    spinTheWheel: 'Dreh das Rad!',
    selectStudent: 'Schüler auswählen',
    selectStudentSingular: 'Schüler auswählen',
    spinning: 'Dreht...',
    modes: {
      random: 'Zufällig',
      weighted: 'Gewichtete KI',
      lightning: 'Blitzrunde',
      pair: 'Power-Duo',
      personalizedIndividual: 'Personalisiert Einzeln',
      personalizedMultiple: 'Personalisiert Mehrere',
    },
    modeDescriptions: {
      random: 'Wählt einen Schüler völlig zufällig aus.',
      weighted:
        'Die KI wählt einen Schüler aus und gibt denen, die weniger teilgenommen haben, eine höhere Chance.',
      lightning: 'Eine schnelle, einfache Herausforderung für einen zufällig ausgewählten Schüler.',
      pair: 'Wählt zwei Schüler zufällig aus, um an einer Herausforderung zusammenzuarbeiten.',
      personalizedIndividual:
        'Wählen Sie manuell einen Schüler für eine stark personalisierte Herausforderung aus.',
      personalizedMultiple:
        'Wählen Sie manuell bis zu drei Schüler für eine kollaborative personalisierte Herausforderung aus.',
    },
} as const;
