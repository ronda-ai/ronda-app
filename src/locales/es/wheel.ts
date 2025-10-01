
export default {
    selectionMode: 'Modo de Selección',
    readyToSpin: '¿Listo para girar?',
    readyToSelect: '¿Listo para seleccionar?',
    spinTheWheel: '¡Gira la Rueda!',
    selectStudent: 'Seleccionar Alumno(s)',
    selectStudentSingular: 'Seleccionar Alumno',
    spinning: 'Girando...',
    modes: {
      random: 'Aleatorio',
      weighted: 'IA Ponderada',
      lightning: 'Ronda Relámpago',
      pair: 'Dúo Dinámico',
      personalizedIndividual: 'Individual Personalizado',
      personalizedMultiple: 'Múltiple Personalizado',
    },
    modeDescriptions: {
      random: 'Selecciona un estudiante de forma completely aleatoria.',
      weighted:
        'La IA selecciona a un estudiante, dando más probabilidades a quienes han participado menos.',
      lightning: 'Un desafío rápido y sencillo para un estudiante seleccionado al azar.',
      pair: 'Selecciona dos estudiantes al azar para colaborar en un desafío.',
      personalizedIndividual:
        'Selecciona manually un estudiante para un desafío altamente personalizado.',
      personalizedMultiple:
        'Selecciona manually hasta tres estudiantes para un desafío colaborativo personalizado.',
    },
} as const;
