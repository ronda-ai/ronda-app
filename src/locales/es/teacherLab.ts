
export default {
    title: 'Laboratorio Docente',
    tagline: 'Un espacio privado de reflexión y práctica profesional, guiado por IA.',
    tabs: {
        pulse: 'Pulso del Aula',
        domainA: 'Planificación',
        domainB: 'Ambiente',
        domainC: 'Enseñanza',
        domainD: 'Reflexión',
        mbeExpert: 'Experto MBE'
    },
    classroomPulse: {
        title: 'Pulso del Aula',
        description: 'Un resumen generado por IA de las fortalezas y desafíos potenciales actuales de tu clase, basado en todos los datos disponibles.',
        generating: 'Analizando datos de la clase para generar el pulso...',
        noData: 'Aún no hay suficientes datos. Añade estudiantes, cualidades y relaciones para generar el primer pulso.',
        strengths: 'Fortalezas Grupales',
        challenges: 'Desafíos Potenciales',
        button: 'Generar Pulso',
    },
    planningCopilot: {
        title: 'Copiloto de Planificación de Clases',
        description: 'Describe un objetivo de aprendizaje y obtén un menú de opciones pedagógicas para planificar tu clase.',
        objectiveLabel: 'Objetivo de Aprendizaje',
        objectivePlaceholder: 'ej. "Que los estudiantes comprendan las causas principales de la Primera Guerra Mundial"',
        generateButton: 'Generar Menú Pedagógico',
        generating: 'Generando menú pedagógico...',
        noMenu: 'Define un objetivo arriba para generar un menú de planes de clase.',
        menuTitle: 'Menú Pedagógico',
        activities: {
            start: 'Inicio',
            development: 'Desarrollo',
            closure: 'Cierre',
        },
        mbeJustification: 'Justificación MBE',
        adaptationSuggestion: 'Sugerencia de Adaptación',
    },
    classroomClimate: {
        title: 'Simulador de Clima de Aula',
        description: 'Practica el manejo de situaciones comunes de gestión de aula en un entorno seguro e interactivo.',
        button: 'Iniciar Nueva Simulación',
        resetButton: 'Reiniciar Simulación',
        scenarioTitle: 'Escenario',
        generationError: 'Hubo un error al generar la respuesta de la IA.',
        retryButton: 'Reintentar',
        scenarioDescriptionLabel: 'Situación a Simular',
        scenarioDescriptionPlaceholder: 'ej. Un alumno está siendo disruptivo, dos alumnos no trabajan bien juntos...',
        durations: {
            title: 'Duración de la Simulación',
            short: 'Corta (~5 turnos)',
            medium: 'Media (~10 turnos)',
            complex: 'Compleja (~15 turnos)',
        },
    },
    questionAnalysis: {
        title: 'Analizador de Calidad de Preguntas',
        description: "Pega las preguntas de tu clase para analizar su demanda cognitiva según la Taxonomía de Bloom.",
        placeholder: "Pega tus preguntas aquí, una por línea...",
        button: 'Analizar Preguntas',
        resultsTitle: "Resultados del Análisis",
        summaryTitle: "Resumen General",
        suggestionLabel: "Sugerencia",
        noResults: "El análisis de tus preguntas aparecerá aquí."
    },
    audioAnalysis: {
        title: "Analizador de Audio de Clase",
        description: "Sube una grabación de audio de tu clase para analizar los tiempos de habla y la calidad del diálogo.",
        selectFileButton: "Seleccionar Archivo de Audio",
        selectedFile: "Archivo Seleccionado",
        analyzeButton: "Analizar Audio",
        resultsTitle: "Resultados del Análisis de Audio",
        talkTime: "Distribución del Tiempo de Habla",
        teacher: "Profesor",
        student: "Alumnos",
        questionAnalysis: "Análisis de Preguntas",
        atmosphere: "Clima del Aula",
        recommendations: "Recomendaciones Pedagógicas",
        progress: {
            transcribing: "Transcribiendo audio...",
            analyzing: "Analizando transcripción...",
        }
    },
    reflectionAssistant: {
        title: 'Asistente de Reflexión Guiada',
        description: 'Anota tus pensamientos sobre una clase o situación, y la IA te hará preguntas socráticas para profundizar tu reflexión basándose en el MBE.',
        placeholder: '¿Cómo fue tu clase hoy? ¿Qué salió bien? ¿Cuáles fueron los desafíos?',
        sendButton: 'Enviar',
        noExports: 'Aún no hay contenido para exportar. ¡Genera primero algunos análisis o planes!',
        exportPlanning: 'Exportar Menú de Planificación',
        exportQuestions: 'Exportar Análisis de Preguntas',
        exportReflection: 'Exportar Registro de Reflexión',
    },
    collaboration: {
        title: "Colaboración Profesional",
        description: "Exporta tus planes y análisis generados para compartir y discutir con colegas."
    },
    mbeExpert: {
        title: "Consulta Experto MBE",
        description: "Haz una pregunta a un experto en el Marco para la Buena Enseñanza, alimentado con la documentación oficial.",
        questionLabel: "Tu consulta sobre el MBE",
        questionPlaceholder: "ej. ¿Cómo puedo aplicar el criterio B1 en una clase de matemáticas con alumnos conflictivos?",
        button: "Consultar al Experto",
        noResults: "La respuesta del experto aparecerá aquí.",
        generating: "Consultando al experto...",
        studentContextLabel: "Añadir contexto de un alumno (opcional)",
        studentContextPlaceholder: "Selecciona un alumno...",
        knowledgeBase: {
            title: "Base de Conocimiento",
            description: "Carga la documentación oficial del MBE para potenciar las respuestas del experto. La carga puede tardar varios minutos.",
            urlLabel: "URL del PDF del Documento MBE",
            urlPlaceholder: "Pega la URL del PDF aquí...",
            loadButton: "Cargar Conocimiento",
            toastLoading: "Cargando documento MBE. Esto puede tardar varios minutos...",
            toastSuccess: "{chunks} fragmentos del documento han sido cargados y vectorizados exitosamente.",
            toastError: "Error al cargar el documento MBE."
        }
    }
} as const;
