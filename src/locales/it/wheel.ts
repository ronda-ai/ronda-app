export default {
    selectionMode: 'Modalità di Selezione',
    readyToSpin: 'Pronto a girare?',
    readyToSelect: 'Pronto a selezionare?',
    spinTheWheel: 'Gira la Ruota!',
    selectStudent: 'Seleziona Studente(i)',
    selectStudentSingular: 'Seleziona Studente',
    spinning: 'Gira...',
    modes: {
      random: 'Casuale',
      weighted: 'IA Ponderata',
      lightning: 'Round Lampo',
      pair: 'Duo Potente',
      personalizedIndividual: 'Individuale Personalizzato',
      personalizedMultiple: 'Multiplo Personalizzato',
    },
    modeDescriptions: {
      random: 'Seleziona uno studente in modo completamente casuale.',
      weighted:
        'L\'IA seleziona uno studente, dando maggiori probabilità a chi ha partecipato meno.',
      lightning: 'Una sfida rapida e semplice per uno studente selezionato a caso.',
      pair: 'Seleziona due studenti a caso per collaborare a una sfida.',
      personalizedIndividual:
        'Seleziona manualmente uno studente per una sfida altamente personalizzata.',
      personalizedMultiple:
        'Seleziona manualmente fino a tre studenti per una sfida collaborativa personalizzata.',
    },
} as const;
