
export default {
    title: 'Coach de IA',
    tagline: 'Obtén ideas y sugerencias con IA.',
    noStudentSelected: {
      title: 'Selecciona un Estudiante',
      description:
        'Elige a un estudiante de la lista para ver su análisis y obtener sugestiones.',
    },
    tabs: {
        classroom: 'Análisis Grupal',
        individual: 'Análisis Individual'
    },
    coachSuggestion: {
      title: 'Sugerencia del Coach',
      description:
        'Genera una sugerencia personalizada para este estudiante basada en su perfil y rendimiento.',
      button: 'Obtener Sugerencia',
      toastDeleted: 'Sugerencia eliminada con éxito.',
      toastDeleteFailed: 'Error al eliminar la sugerencia.',
      deleteDialog: {
        title: '¿Eliminar esta sugerencia?',
        description: 'Esta acción no se puede deshacer. Esto eliminará permanentemente la sugerencia del coach.',
        confirm: 'Eliminar',
      },
      noSuggestions: {
        title: 'Aún no hay Sugerencias',
        description:
          'Genera la primera sugerencia para este estudiante para comenzar.',
      },
    },
    supportPlan: {
      title: 'Plan de Apoyo',
      description:
        'Genera un plan accionable de varios pasos para apoyar el desarrollo de este estudiante.',
      button: 'Generar Nuevo Plan',
      generating: 'Generando plan, por favor espera...',
      planGenerated: 'Plan generado {date}',
      feedbackTitle: "Feedback del Profesor",
      feedbackPlaceholder:
        '¿Qué funcionó? ¿Qué no? Tu feedback ayuda a la IA a aprender...',
      toastDeleted: 'Plan de apoyo eliminado con éxito.',
      toastDeleteFailed: 'Error al eliminar el plan de apoyo.',
      noPlans: {
        title: 'Aún no hay Planes de Apoyo',
        description:
          'Genera el primer plan de apoyo para este estudiante para comenzar.',
      },
      stepDialog: {
        title: 'Evaluar Paso de Apoyo',
        description: '¿Cómo resultó este paso?',
        status: 'Estado',
        feedback: 'Feedback del Paso (opcional)',
        feedbackPlaceholder: 'Añade una nota sobre este paso...',
        saveButton: 'Guardar Evaluación del Paso',
        statuses: {
          pending: 'Pendiente',
          achieved: 'Logrado',
          'partially-achieved': 'Logrado Parcialmente',
          'not-achieved': 'No Logrado',
          discarded: 'Descartado',
        },
      },
      deleteDialog: {
        title: '¿Estás seguro de que quieres eliminar este plan?',
        description:
          'Esta acción no se puede deshacer. Esto eliminará permanentemente el plan de apoyo.',
        confirm: 'Eliminar',
      },
    },
    moodAnalysis: {
      title: 'Análisis de Tendencias de Ánimo',
      descriptionStudent:
        'Analiza el ánimo de este estudiante en diferentes desafíos para encontrar patrones.',
      descriptionClassroom:
        'Obtén un análisis de toda la clase sobre las tendencias de ánimo para mejorar la dinámica general.',
      button: 'Analizar Tendencias',
      buttonClassroom: 'Analizar Tendencias del Aula',
      analysisTitle: 'Análisis de la IA',
      noAnalyses: {
        title: 'Aún no hay Análisis',
        descriptionStudent:
          'Genera el primer análisis de ánimo para este estudiante para empezar.',
        descriptionClassroom:
          'Genera el primer análisis de ánimo para el aula para empezar.',
      },
      toastDeleted: 'Análisis eliminado con éxito.',
      toastDeleteFailed: 'Error al eliminar el análisis.',
      deleteDialog: {
        title: '¿Eliminar este análisis?',
        description: 'Esta acción no se puede deshacer. Esto eliminará permanentemente el análisis generado.',
        confirm: 'Eliminar',
      },
    },
    relationshipLab: {
      title: 'Laboratorio de Dinámicas Sociales',
      description: 'Un espacio para analizar y mejorar las relaciones entre estudiantes.',
      button: 'Abrir Laboratorio',
      tagline: 'Orquesta interacciones sociales positivas.',
      tabs: {
        multiStudent: 'Entre Pares',
        singleStudent: 'Individual',
      },
      form: {
        title: 'Generador de Estrategias de Remediación de Relaciones',
        description: 'Selecciona estudiantes con una relación tensa para recibir un plan de intervención personalizado.',
        studentsLabel: 'Seleccionar Estudiantes (2-4)',
        studentsPlaceholder: 'Seleccionar estudiantes...',
        focusLabel: 'Objetivo Principal / Habilidad a Reforzar',
        focusPlaceholder: 'ej. Comunicación, Empatía, Colaboración...',
        customPromptLabel: 'Instrucción Personalizada (Opcional)',
        customPromptPlaceholder: 'ej. Crear una actividad no verbal, que sea un juego...',
        generateButton: 'Generar Estrategia',
      },
      individual: {
          form: {
              title: 'Generador de Estrategias Individuales',
              description: 'Selecciona un único alumno para generar un plan que lo ayude a integrarse y relacionarse mejor con la clase.',
              studentsPlaceholder: 'Selecciona un alumno...',
              generateButton: 'Generar Estrategia de Integración'
          },
          history: {
              title: 'Historial de Estrategias Individuales',
              description: 'Revisa estrategias generadas anteriormente para este alumno.',
               prompt: {
                  title: '¿Listo para Construir Puentes?',
                  description: 'Selecciona un alumno para visualizar su historial o generar una nueva estrategia de integración social.',
              },
          },
          toastSuccess: '¡Estrategia de integración generada!',
                    toastDeleteSuccess: 'Estrategia eliminada con éxito.',
                              toastDeleteFailed: 'Error al eliminar la estrategia.',
                                        deleteDialog: {
                                                      title: '¿Eliminar esta estrategia?',
                                                                    description: 'Esta acción no se puede deshacer y eliminará permanentemente la estrategia.',
                                                                                  confirm: 'Eliminar'
          }
      },
      suggestions: {
          button: 'Sugerir Foco con IA',
          toastSuccess: '¡Sugerencia aplicada en el formulario!'
      },
       studentInfo: {
          title: "Perfil de los Estudiantes Seleccionados",
          qualities: 'Cualidades',
          fears: 'Miedos',
          none: 'Ninguno registrado',
      },
      history: {
        title: 'Historial de Estrategias',
        description: 'Revisa estrategias generadas previamente para los estudiantes seleccionados.',
        header: 'Estrategia para {focus}',
        statusLabel: 'Estado de la Estrategia',
        statusPlaceholder: 'Fijar estado...',
        feedbackLabel: 'Feedback del Profesor',
        feedbackPlaceholder: '¿Cómo funcionó esta estrategia en la práctica?',
        saveFeedbackButton: 'Guardar Evaluación',
        toastUpdateSuccess: '¡Estrategia actualizada con éxito!',
        toastUpdateFailed: 'Error al actualizar la estrategia.',
        toastDeleteSuccess: 'Estrategia eliminada con éxito.',
        toastDeleteFailed: 'Error al eliminar la estrategia.',
        prompt: {
            title: '¿Listos para Mediar?',
            description: 'Selecciona al menos dos estudiantes en el formulario para ver su historial o generar una nueva estrategia.',
        },
        noResults: {
            title: 'Aún no hay Estrategias',
            description: 'Genera la primera estrategia para este grupo de estudiantes.',
        },
         stepDialog: {
            title: 'Evaluar Paso de Remediación',
            description: '¿Cómo resultó este paso?',
            status: 'Estado',
            feedback: 'Feedback del Paso (opcional)',
            feedbackPlaceholder: 'Añade una nota sobre este paso...',
            saveButton: 'Guardar Evaluación',
            statuses: {
                pending: 'Pendiente',
                completed: 'Completado',
                skipped: 'Saltado',
            },
        },
      },
      deleteDialog: {
        title: '¿Eliminar esta estrategia de grupo?',
        description: 'Esta acción no se puede deshacer. Esto eliminará permanentemente la estrategia de remediación.',
        confirm: 'Eliminar',
      },
      details: {
          title: "Detalles de la Estrategia para '{focus}'",
          adjustTitle: "Ajustar Estrategia",
          adjustPlaceholder: "ej. Hacerlo más simple, añadir un componente de dibujo, enfocarse más en señales no verbales...",
          adjustButton: "Generar Estrategia Ajustada",
      },
      status: {
        'not_started': 'No Iniciada',
        'in_progress': 'En Progreso',
        'successful': 'Exitosa',
        'partially_successful': 'Parcialmente Exitosa',
        'did_not_work': 'No Funcionó',
        'needs_adjustment': 'Necesita Ajuste',
      },
      toastSuccess: '¡Estrategia de remediación generada!',
    },
    qualitiesSuggestion: {
      title: 'Sugerencia de Cualidades',
      description:
        'Descubre cualidades emergentes basadas en el rendimiento del estudiante.',
      button: 'Descubrir Cualidades',
      suggestionText:
        'Basado en el rendimiento reciente, la IA sugiere las siguientes cualidades:',
      noSuggestions: {
        title: 'Aún no hay Sugerencias de Cualidades',
        description:
          'Genera la primera sugerencia de cualidad para este estudiante para comenzar.',
      },
      dialog: {
        title: 'Nuevas Sugerencias de Cualidades para {name}',
        description:
          'Basado en el rendimiento reciente, aquí tienes algunas cualidades que podrías considerar añadir:',
        accept: 'Aceptar',
        reject: 'Rechazar',
        confirmation: '¿Cómo te gustaría actualizar las cualidades?',
        add: 'Añadir como nuevas',
        replace: 'Reemplazar existentes',
        confirm: 'Confirmar Actualización',
      },
    },
    concernAnalysis: {
      title: 'Análisis de Patrones de Preocupación',
      description:
        'La IA analizará el historial completo del estudiante en busca de patrones negativos recurrentes.',
      button: 'Analizar Preocupaciones',
      noAnalyses: {
        title: 'No se Detectaron Patrones de Preocupación',
        description:
          'Genera un análisis para revisar posibles problemas recurrentes.',
      },
    },
    fearManagement: {
      title: 'Sugerencias para Manejar Miedos',
      description: 'Genera estrategias empáticas para ayudar a un estudiante con sus miedos.',
      button: 'Obtener Estrategia',
      strategyFor: 'Estrategia para:',
      feedbackTitle: '¿Cómo resultó?',
      feedbackPlaceholder: 'Tu feedback ayuda a la IA a aprender y mejorar...',
      toastFearUpdated: '¡Perfil de miedos del estudiante actualizado!',
      toastFearUpdateFailed: 'Error al actualizar los miedos del estudiante.',
      toastDeleted: 'Sugerencia eliminada con éxito.',
      toastDeleteFailed: 'Error al eliminar la sugerencia.',
      noSuggestions: {
        title: 'Aún no hay Estrategias',
        description: 'Genera una estrategia para ayudar a este estudiante a manejar sus miedos.',
        noFears: 'Este estudiante no tiene miedos registrados. Añade miedos en su perfil para obtener sugerencias.',
      },
      updateDialog: {
        title: '¿Actualizar Perfil del Estudiante?',
        confirm: 'Sí, actualizar perfil',
      },
      deleteDialog: {
        title: '¿Eliminar esta sugerencia?',
        description: 'Esta acción no se puede deshacer.',
        confirm: 'Eliminar',
      },
      dialog: {
        title: 'Manejando el Miedo a {fear}',
        description: 'Revisa estrategias existentes o genera una nueva para {name}.',
        generateButton: 'Generar Nueva Sugerencia',
        noSuggestions: {
            title: 'Aún no hay estrategias',
            description: 'Genera la primera sugerencia de la IA para abordar este miedo.'
        }
      }
    }
} as const;
