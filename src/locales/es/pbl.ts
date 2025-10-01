
export default {
    title: 'Laboratorio ABP',
    tagline: 'Orquesta proyectos complejos a partir de una sola idea.',
    tabs: {
        phase1: 'Fase 1: Planificación',
        phase2: 'Fase 2: Equipos',
        phase3: 'Fase 3: Desarrollo',
        phase4: 'Fase 4: Evaluación',
    },
    phase1: {
        form: {
            title: 'Fase 1: Planificador de Proyectos',
            description: 'Define un tema central y deja que la IA construya un plan de proyecto estructurado.',
            topicLabel: 'Tema Central del Proyecto',
            topicPlaceholder: 'ej. El cambio climático en nuestra ciudad, Historia de los videojuegos...',
            skillsLabel: 'Habilidades Clave a Desarrollar',
            noSkills: 'Aún no se han definido habilidades. Ve al Generador de Actividades para añadir algunas.',
            durationLabel: 'Duración Estimada',
            durations: {
                'oneWeek': '1 Semana',
                'twoWeeks': '2 Semanas',
                'oneMonth': '1 Mes',
            },
            generateButton: 'Generar Plan de Proyecto'
        },
        generating: {
            title: 'Generando Plan de Proyecto...'
        },
    },
     phase2: {
        title: 'Fase 2: Formación de Equipos',
        description: 'Usa la IA para formar grupos estratégicos basados en los perfiles y relaciones de tus estudiantes.',
        selectProject: 'Seleccionar Proyecto',
        selectProjectPlaceholder: 'Elige un proyecto para formar equipos...',
        teamSize: 'Tamaño del Equipo',
        groupingCriteria: 'Criterio de Agrupación',
        criteria: {
            balanced: 'Equipos Equilibrados',
            'social-remediation': 'Remediación Social',
            synergy: 'Sinergia de Intereses',
        },
        generateButton: 'Generar Equipos',
        noProjectSelected: 'Por favor, selecciona un proyecto primero.',
        results: {
            title: 'Equipos Sugeridos',
            teamName: 'Equipo {name}',
            rationale: 'Justificación del Equipo',
            formation: 'Formación',
            deleteDialog: {
                title: '¿Eliminar esta formación de equipo?',
                description: 'Esta acción no se puede deshacer. Esto eliminará permanentemente la formación del equipo.',
            },
        },
        table: {
            student: 'Estudiante',
            suggestedRole: 'Rol Sugerido',
            justification: 'Justificación',
        }
    },
    phase3: {
        title: 'Fase 3: Andamiaje sobre la Marcha',
        description: 'Genera planes de intervención rápidos para equipos que enfrentan desafíos durante el desarrollo del proyecto.',
        selectTeam: 'Equipo a Intervenir',
        selectTeamPlaceholder: 'Seleccionar estudiantes...',
        problemLabel: 'Describe el Problema',
        problemPlaceholder: 'ej. El equipo está atascado, hay un conflicto, un estudiante está desmotivado...',
        generateButton: 'Generar Intervención',
        suggestionTitle: 'Intervención Sugerida',
        microActivity: 'Micro-Actividad para Desbloquear',
        guidingQuestions: 'Preguntas Guía para el Docente',
        noSuggestion: 'El plan de intervención generado aparecerá aquí.',
    },
    phase4: {
        title: 'Fase 4: Generador de Rúbricas',
        description: 'Genera una rúbrica de evaluación detallada para el producto final de un proyecto.',
        generateButton: 'Generar Rúbrica',
        rubricTitle: 'Rúbrica de Evaluación Sugerida',
        noRubric: 'La rúbrica generada aparecerá aquí.',
    },
    history: {
        title: 'Historial de Proyectos',
        description: 'Revisa y gestiona los proyectos generados anteriormente.',
        noResults: {
            title: 'Aún no hay Proyectos',
            description: 'Usa el formulario para generar tu primer plan de Aprendizaje Basado en Proyectos.'
        },
        phases: 'Fases del Proyecto',
        milestones: 'Hitos Clave',
        finalProduct: 'Sugerencia de Producto Final',
        deleteDialog: {
            title: '¿Eliminar este plan de proyecto?',
            description: 'Esta acción no se puede deshacer. Esto eliminará permanentemente el plan de proyecto.',
        },
    },
} as const;
