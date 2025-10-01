
export default {
    title: 'Herramientas',
    tagline: 'Usa herramientas de IA para potenciar tu enseñanza.',
    activityAdapter: {
      title: 'Adaptador de Actividades',
      description: 'Adapta cualquier actividad existente para ajustarla mejor a las necesidades de tu clase, ya sea para estudiantes específicos o para el grupo completo.',
      placeholder: 'Pega o escribe aquí la actividad que quieres adaptar...',
      activityLabel: 'Actividad a Adaptar',
      existingActivityLabel: 'Selecciona una actividad o prueba existente',
      existingActivityPlaceholder: 'Elige una actividad/prueba para resumir y adaptar...',
      studentLabel: 'Adaptar para Estudiantes Específicos (Opcional)',
      studentPlaceholder: 'Seleccionar estudiantes...',
      customPromptLabel: 'Objetivo Específico para la Adaptación (Opcional)',
      customPromptPlaceholder: 'ej. Que sea un juego, enfocar en la escritura...',
      button: 'Adaptar Actividad',
      generatingTitle: 'Generando Adaptaciones...',
      activityType: 'Actividad'
    },
     rubricGenerator: {
      title: 'Generador de Rúbricas',
      description: 'Crea una rúbrica de evaluación justa y equilibrada para cualquier actividad.',
      placeholder: 'Describe la actividad para la cual generar una rúbrica...',
      button: 'Generar Rúbrica',
      testType: 'Prueba'
    },
    history: {
      title: 'Historial',
      descriptionAdapter: 'Revisa actividades adaptadas previamente.',
      descriptionRubric: 'Revisa rúbricas generadas previamente.',
      reasoning: 'Justificación',
      criterion: 'Criterio',
      excellent: 'Excelente',
      satisfactory: 'Satisfactorio',
      needsImprovement: 'Necesita Mejorar',
      scoringGuide: 'Guía de Puntuación',
      toastDeleteSuccess: 'Eliminación exitosa.',
      toastDeleteFailed: 'Error al eliminar.',
      noResults: {
        title: 'Aún no hay Resultados',
        description: 'Usa la herramienta a la izquierda para generar tu primer resultado.',
      },
      deleteDialogAdapter: {
          title: '¿Eliminar esta adaptación?',
          description: 'Esta acción no se puede deshacer. Esto eliminará permanentemente la adaptación de la actividad.',
          confirm: 'Eliminar'
      },
      deleteDialogRubric: {
          title: '¿Eliminar esta rúbrica?',
          description: 'Esta acción no se puede deshacer. Esto eliminará permanentemente la rúbrica generada.',
          confirm: 'Eliminar'
      }
    }
} as const;
