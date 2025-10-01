
export default {
    selectionMode: 'Tryb wyboru',
    readyToSpin: 'Gotowy do kręcenia?',
    readyToSelect: 'Gotowy do wyboru?',
    spinTheWheel: 'Zakręć kołem!',
    selectStudent: 'Wybierz ucznia (uczniów)',
    selectStudentSingular: 'Wybierz ucznia',
    spinning: 'Kręci się...',
    modes: {
      random: 'Losowy',
      weighted: 'Ważony AI',
      lightning: 'Błyskawiczna runda',
      pair: 'Duet mocy',
      personalizedIndividual: 'Spersonalizowany indywidualny',
      personalizedMultiple: 'Spersonalizowany grupowy',
    },
    modeDescriptions: {
      random: 'Wybiera jednego ucznia całkowicie losowo.',
      weighted:
        'AI wybiera ucznia, dając większe szanse tym, którzy uczestniczyli mniej.',
      lightning: 'Szybkie, proste wyzwanie dla losowo wybranego ucznia.',
      pair: 'Losowo wybiera dwóch uczniów do współpracy nad wyzwaniem.',
      personalizedIndividual:
        'Ręcznie wybierz jednego ucznia do wysoce spersonalizowanego wyzwania.',
      personalizedMultiple:
        'Ręcznie wybierz do trzech uczniów do spersonalizowanego wyzwania grupowego.',
    },
} as const;
