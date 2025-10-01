
export default {
    title: 'Observaciones',
    tagline: 'Registra y revisa las observaciones de los estudiantes.',
    noStudentSelected: {
      title: 'Selecciona un Estudiante',
      description:
        'Elige un estudiante de la lista para registrar o ver sus observaciones.',
      selectDescription:
        'Elige un estudiante del menú desplegable para registrar o ver sus observaciones.',
    },
    newObservationTitle: 'Nueva Observación',
    newObservationDescription: 'Registra una nueva observación para {name}.',
    observationLabel: 'Observación',
    observationPlaceholder: 'Describe lo que observaste...',
    typeLabel: 'Tipo de Observación',
    typePlaceholder: 'Selecciona un tipo...',
    saveButton: 'Guardar Observación',
    clearButton: 'Limpiar',
    analyzeButton: 'Analizar con IA',
    improveButton: 'Mejorar con IA',
    analysisTitle: 'Análisis de IA',
    suggestedType: 'Tipo Sugerido',
    suggestedTags: 'Etiquetas Sugeridas',
    deepeningQuestion: 'Pregunta de Profundización',
    toastAnalysisSuccess: '¡Observación analizada!',
    toastImproveSuccess: '¡Observación mejorada!',
    historyTitle: 'Historial de Observaciones',
    noObservations: {
      title: 'No hay Observaciones Registradas',
      description:
        'Usa el formulario de arriba para registrar la primera observación de este estudiante.',
    },
    toastSuccess: '¡Observación guardada con éxito!',
    toastError: 'Error al guardar la observación.',
    toastDeleteSuccess: 'Observación eliminada con éxito.',
    toastDeleteError: 'Error al eliminar la observación.',
    types: {
      positive: 'Positiva',
      negative: 'Negativa',
      neutral: 'Neutral',
      academic: 'Académica',
      'social-emotional': 'Socioemocional',
    },
    deleteDialog: {
      title: '¿Estás seguro?',
      description: 'Esta acción no se puede deshacer. Esto eliminará permanentemente la observación.',
      confirm: 'Eliminar',
    },
    filterByType: 'Filtrar por Tipo',
    filterByTag: 'Filtrar por Etiqueta',
    allTypes: 'Todos los Tipos',
    allTags: 'Todas las Etiquetas',
} as const;
