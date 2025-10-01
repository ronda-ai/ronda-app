export default {
    selectionMode: 'Selection Mode',
    readyToSpin: 'Ready to spin?',
    readyToSelect: 'Ready to select?',
    spinTheWheel: 'Spin the Wheel!',
    selectStudent: 'Select Student(s)',
    selectStudentSingular: 'Select Student',
    spinning: 'Spinning...',
    modes: {
      random: 'Random',
      weighted: 'Weighted AI',
      lightning: 'Lightning Round',
      pair: 'Power Duo',
      personalizedIndividual: 'Personalized Individual',
      personalizedMultiple: 'Personalized Multiple',
    },
    modeDescriptions: {
      random: 'Selects one student completely at random.',
      weighted:
        'The AI selects a student, giving a higher chance to those who have participated less.',
      lightning: 'A quick, simple challenge for a randomly selected student.',
      pair: 'Selects two students at random to collaborate on a challenge.',
      personalizedIndividual:
        'Manually select one student for a highly personalized challenge.',
      personalizedMultiple:
        'Manually select up to three students for a collaborative personalized challenge.',
    },
} as const;
