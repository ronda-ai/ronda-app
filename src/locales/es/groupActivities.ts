

export default {
    title: 'Actividades Grupales',
    tagline: 'Forma grupos de manera inteligente y genera actividades colaborativas.',
    generator: {
      title: 'Generador de Sugerencias de Grupos',
      description: 'La IA analizará tu clase para sugerir grupos equilibrados y un consejo de facilitación.',
      button: 'Generar Nuevas Sugerencias',
    },
    manualMode: {
        title: 'Constructor Manual de Grupos',
        description: 'Crea tus propios grupos y obtén asistencia con IA.',
        selectLabel: 'Selecciona estudiantes para un nuevo grupo',
        selectPlaceholder: 'Elige estudiantes...',
        createGroupButton: 'Crear Grupo',
        groupTitle: 'Nuevo Grupo',
        analyzeButton: 'Analizar Dinámicas',
        generateActivityButton: 'Generar Actividad',
        warningTitle: 'Alerta de Relación',
        conflictWarning: '{nameA} y {nameB} tienen un conflicto registrado. Procede con precaución.',
        skillsLabel: 'Habilidades Colaborativas a Desarrollar',
        skillsPlaceholder: 'ej. Comunicación, Liderazgo',
        themesLabel: 'Tema de la Actividad (Opcional)',
        themesPlaceholder: 'ej. Misión Espacial, Resolver Misterios',
        activityGeneratedToast: '¡Actividad generada con éxito!',
    },
    aiSuggestions: {
        title: 'Sugerencias Generadas por IA',
    },
    history: {
      title: 'Historial de Sugerencias',
      description: 'Revisa las sugerencias de grupos generadas anteriormente.',
      suggestionFor: 'Sugerencia de {date}',
      teacherTipTitle: 'Consejo del Facilitador',
      suggestedGroups: 'Grupos Sugeridos',
      group: 'Grupo',
      suggestedSkills: 'Habilidades Colaborativas Sugeridas',
      suggestedThemes: 'Temas de Actividad Sugeridos',
      useSuggestionButton: 'Usar esta Sugerencia',
      suggestionUsedToast: '¡Sugerencia aplicada al constructor manual de grupos!',
      noResults: {
        title: '¿Listos para colaborar?',
        description: 'Haz clic en el botón de arriba para generar el primer conjunto de sugerencias de grupos para tu clase.',
      },
      toastDeleted: 'Sugerencia eliminada.',
      toastDeleteFailed: 'Error al eliminar la sugerencia.',
      deleteDialog: {
        title: '¿Eliminar esta sugerencia?',
        description: 'Esta acción es permanente y no se puede deshacer.',
      },
    },
    viewActivitiesButton: 'Ver Actividades Generadas',
    details: {
        title: 'Actividades Generadas para el Grupo',
        description: 'Se generaron las siguientes actividades para {members}.',
        deleteButton: 'Eliminar Plan de Actividades',
    }
} as const;

