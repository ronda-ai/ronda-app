
export default {
    selectionMode: 'Selectiemodus',
    readyToSpin: 'Klaar om te draaien?',
    readyToSelect: 'Klaar om te selecteren?',
    spinTheWheel: 'Draai aan het Rad!',
    selectStudent: 'Selecteer Student(en)',
    selectStudentSingular: 'Selecteer Student',
    spinning: 'Draait...',
    modes: {
      random: 'Willekeurig',
      weighted: 'Gewogen AI',
      lightning: 'Bliksemronde',
      pair: 'Krachtduo',
      personalizedIndividual: 'Gepersonaliseerd Individueel',
      personalizedMultiple: 'Gepersonaliseerd Meerdere',
    },
    modeDescriptions: {
      random: 'Selecteert één student volledig willekeurig.',
      weighted:
        'De AI selecteert een student, waarbij degenen die minder hebben deelgenomen een grotere kans krijgen.',
      lightning: 'Een snelle, eenvoudige uitdaging voor een willekeurig geselecteerde student.',
      pair: 'Selecteert twee studenten willekeurig om samen te werken aan een uitdaging.',
      personalizedIndividual:
        'Selecteer handmatig één student voor een sterk gepersonaliseerde uitdaging.',
      personalizedMultiple:
        'Selecteer handmatig maximaal drie studenten voor een collaboratieve gepersonaliseerde uitdaging.',
    },
} as const;
