

export default {
    title: 'Laboratorio de Seguridad Escolar',
    description: 'Usa la IA para generar un mapa de riesgos integral para tu centro educativo.',
    tagline: 'Identifica y planifica proactivamente los riesgos de seguridad escolar.',
    tabs: {
        diagnosis: 'Diagnóstico de Riesgos',
        protocols: 'Protocolos de Acción',
        simulations: 'Simulacros',
        committees: 'Comités',
    },
    diagnosis: {
        title: 'Diagnóstico de Riesgos',
    },
    riskMap: {
        risk: 'Riesgo',
        priority: 'Prioridad',
        justification: 'Justificación',
    },
    form: {
        locationLabel: 'Contexto de Ubicación',
        locationPlaceholder: 'ej. Zona urbana en área sísmica, zona rural cerca de un río...',
        infrastructureLabel: 'Contexto de Infraestructura',
        infrastructurePlaceholder: 'ej. Edificio de 40 años, varios pisos, patios abiertos...',
        socialLabel: 'Contexto Social y Comunitario',
        socialPlaceholder: 'ej. Historial de bullying entre cursos, buena relación con la policía local, comunidad de padres activa...',
        analysisDepthLabel: 'Profundidad del Análisis',
        analysisDepth: {
            concise: 'Conciso',
            moderate: 'Moderado',
            exhaustive: 'Exhaustivo',
        },
        generateButton: 'Generar Mapa de Riesgos',
    },
    protocols: {
        title: 'Generador de Protocolos de Acción',
        description: 'Crea un plan de acción paso a paso para un riesgo específico.',
        riskLabel: 'Riesgo a Abordar',
        riskPlaceholder: 'ej. Sismo, Incendio, Caso de Acoso Escolar...',
        generateButton: 'Generar Protocolo',
        resultsTitle: 'Protocolo de Acción Generado',
        noResults: {
            title: '¿Listo para Planificar?',
            description: 'Introduce un riesgo arriba para generar un protocolo de acción detallado.',
        },
        beforeTitle: 'Antes del Evento (Prevención)',
        duringTitle: 'Durante del Evento (Acción)',
        afterTitle: 'Después del Evento (Recuperación)',
        historyTitle: 'Historial de Protocolos',
        noHistory: 'Aún no se han generado protocolos.',
    },
    results: {
        title: 'Historial de Mapas de Riesgo',
        noResults: {
            title: '¿Listo para Evaluar?',
            description: 'Completa el contexto de tu escuela arriba para generar un mapa de evaluación de riesgos preliminar.',
        }
    },
    conflictSimulation: {
        title: 'Simulación de Crisis',
        description: 'Practica cómo manejar situaciones de emergencia generando un escenario de crisis hipotético y tomando decisiones en tiempo real.',
        topicsLabel: 'Tipo de Crisis',
        topicsPlaceholder: 'ej. Terremoto, Incendio, Intruso activo...',
        button: 'Iniciar Simulación',
        resetButton: 'Reiniciar Simulación',
        simulationEnd: 'La simulación ha concluido. Has gestionado la situación con la información disponible. Considera reiniciar con otras opciones para explorar diferentes resultados.',
        scenarioTitle: 'Desarrollo del Escenario',
        strategiesTitle: 'Tus Opciones',
        outcomeLabel: 'Resultado Simulado',
        noScenario: {
            title: '¿Listo para Entrenar?',
            description: 'Define un tipo de crisis para comenzar la simulación.',
        },
        historyTitle: "Historial de Simulaciones",
        noHistory: "Aún no se han ejecutado simulaciones.",
        durations: {
            title: 'Duración de la Simulación',
            short: 'Corto (~5 turnos)',
            medium: 'Medio (~10 turnos)',
            complex: 'Complejo (~15 turnos)',
        },
        generationError: 'Hubo un error al generar la respuesta de la IA.',
        retryButton: 'Reintentar',
        simulationComplete: '¡Simulación Completada!',
    },
    committees: {
        title: 'Comités de Seguridad',
        description: 'Organiza brigadas de seguridad y asigna roles a estudiantes y personal.',
        createTitle: 'Crear Nueva Brigada',
        createButton: 'Crear Brigada',
        nameLabel: 'Nombre de la Brigada',
        namePlaceholder: 'ej. Brigada de Primeros Auxilios',
        noCommittees: 'Aún no se han creado comités. Use el formulario anterior para crear el primero.',
        members: 'Miembros',
        addMember: 'Añadir Miembro',
        selectStudentPlaceholder: 'Seleccionar estudiante...',
        toastCreateSuccess: '¡Brigada creada con éxito!',
        toastCreateError: 'Error al crear la brigada.',
        toastDeleteSuccess: 'Brigada eliminada.',
        toastDeleteError: 'Error al eliminar la brigada.',
    }
} as const;

  
