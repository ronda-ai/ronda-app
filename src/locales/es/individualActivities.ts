
export default {
    title: 'Actividades Individuales',
    tagline: 'Diseña actividades personalizadas para un estudiante específico.',
    step0: {
        title: 'Selecciona un Estudiante',
        description: 'Elige un estudiante para comenzar a generar actividades personalizadas.',
    },
    step1: {
      selectLabel: 'Estudiante',
      selectPlaceholder: 'Selecciona un estudiante...',
    },
     generator: {
        title: 'Generador de Actividades para {name}',
        description: 'Define los parámetros para la actividad, o usa la IA para sugerir ideas.',
        topicLabel: 'Tema Académico',
        topicPlaceholder: 'ej. Fracciones, Fotosíntesis',
        skillsLabel: 'Habilidades a Desarrollar',
        skillsPlaceholder: 'ej. Pensamiento Crítico, Colaboración',
        themesLabel: 'Temas de Interés',
        themesPlaceholder: 'ej. Espacio, Dinosaurios, Misterios',
        customPromptLabel: 'Instrucción Personalizada (Opcional)',
        customPromptPlaceholder: 'ej. Enfócate en elementos visuales, que sea una actividad práctica',
        negativePromptLabel: 'Instrucción Negativa (Opcional)',
        negativePromptPlaceholder: 'ej. Evitar tareas de escritura, no mencionar arañas',
        generateButton: 'Generar Actividades',
        toastSuccess: '¡Actividades generadas con éxito!',
        noSkills: 'Aún no hay habilidades disponibles.',
        addSkills: 'Añadir nuevas habilidades'
    },
    suggestions: {
        button: 'Sugerir con IA',
        toastSuccess: '¡Sugerencias aplicadas!',
    },
    history: {
        title: "Historial de Planes de Actividades",
        description: "Revisa y gestiona los planes de actividades generados previamente para {name}.",
        toastDeleted: 'Plan de actividades eliminado.',
        toastDeleteFailed: 'Error al eliminar el plan de actividades.',
        noResults: {
            title: "Aún no hay Planes de Actividades",
            description: "Genera el primer plan para este estudiante para ver su historial aquí."
        },
        deleteDialog: {
            title: "¿Eliminar este plan de actividades?",
            description: "Esta acción no se puede deshacer. Esto eliminará permanentemente el plan de actividades.",
        },
        stepDialog: {
            title: 'Evaluar Actividad',
            description: '¿Cómo resultó esta actividad?',
            status: 'Estado',
            feedback: 'Feedback del Paso (opcional)',
            feedbackPlaceholder: 'Añade una nota sobre esta actividad...',
            saveButton: 'Guardar Evaluación',
            statuses: {
                pending: 'Pendiente',
                'in-progress': 'En Progreso',
                completed: 'Completada',
                skipped: 'Saltada'
            },
        },
    },
    democratizer: {
      title: 'Democratizador de Recursos',
      descriptionSingle: 'Adapta esta actividad para hacerla más accesible.',
      descriptionAll: 'Adapta todas las actividades de este plan para hacerlas más accesibles según diferentes necesidades o limitaciones de recursos.',
      descriptionSelected: 'Adapta las {count} actividades seleccionadas de este plan para hacerlas más accesibles.',
      prompt: 'Selecciona una opción de adaptación para aplicar a las actividades.',
      selectPlaceholder: 'Elige una adaptación...',
      activitiesToAdapt: "Actividades a Adaptar:",
      adaptButton: 'Adaptar Actividades',
      toastSuccess: '¡Actividades adaptadas con éxito!',
      options: {
        commonMaterials: 'Adaptar para materiales caseros comunes',
        lowEnergy: 'Adaptar para escenarios de baja energía/calma',
        socialInteraction: 'Aumentar el componente de interacción social',
        simpleInstructions: 'Simplificar las instrucciones',
      },
    }
} as const;
