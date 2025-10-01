export default {
    selectionMode: 'Modo de Seleção',
    readyToSpin: 'Pronto para girar?',
    readyToSelect: 'Pronto para selecionar?',
    spinTheWheel: 'Girar a Roda!',
    selectStudent: 'Selecionar Aluno(s)',
    selectStudentSingular: 'Selecionar Aluno',
    spinning: 'Girando...',
    modes: {
      random: 'Aleatório',
      weighted: 'IA Ponderada',
      lightning: 'Rodada Relâmpago',
      pair: 'Dupla Dinâmica',
      personalizedIndividual: 'Individual Personalizado',
      personalizedMultiple: 'Múltiplo Personalizado',
    },
    modeDescriptions: {
      random: 'Seleciona um aluno completamente aleatório.',
      weighted:
        'A IA seleciona um aluno, dando maior chance àqueles que participaram menos.',
      lightning: 'Um desafio rápido e simples para um aluno selecionado aleatoriamente.',
      pair: 'Seleciona dois alunos aleatoriamente para colaborar em um desafio.',
      personalizedIndividual:
        'Selecione manualmente um aluno para um desafio altamente personalizado.',
      personalizedMultiple:
        'Selecione manualmente até três alunos para um desafio colaborativo personalizado.',
    },
} as const;
