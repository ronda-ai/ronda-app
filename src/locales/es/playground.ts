

export default {
    title: 'Playground',
    tagline: 'Participa en juegos divertidos y educativos con IA.',
    riddleBattle: {
        title: 'Batalla de Adivinanzas',
        description: 'Genera un par de adivinanzas para que dos equipos las resuelvan. ¿Quién será más rápido?',
        topicLabel: 'Tema de la Adivinanza (Opcional)',
        topicPlaceholder: 'ej. Animales, Espacio, Historia',
        button: 'Iniciar Nueva Batalla',
        battleTitle: '¡Batalla de Adivinanzas!',
        topic: 'Tema',
        teamBlue: 'Equipo Azul',
        teamRed: 'Equipo Rojo',
        showAnswer: 'Mostrar Respuesta',
        hideAnswer: 'Ocultar Respuesta',
        toastDeleted: 'Batalla eliminada.',
        toastDeleteFailed: 'Error al eliminar la batalla.',
        toastEvaluationSaved: 'Evaluación guardada.',
        toastEvaluationFailed: 'Error al guardar la evaluación.',
        noBattles: {
            title: '¿Listos para un Desafío?',
            description: 'Haz clic en el botón de arriba para iniciar la primera Batalla de Adivinanzas.',
        },
        deleteDialog: {
            title: '¿Eliminar esta batalla?',
            description: 'Esta acción es permanente y no se puede deshacer.',
        },
        evaluation: {
            title: 'Evaluación',
            winner: 'Ganador',
            winnerLabel: 'Declarar Ganador',
            winnerPlaceholder: 'Selecciona un ganador...',
            tie: 'Empate',
            moodLabel: 'Ambiente de la Competición',
            moodPlaceholder: 'Selecciona el ambiente...',
            feedbackLabel: 'Feedback',
            feedbackPlaceholder: '¿Cómo estuvo el juego? ¿Fue justo?',
            moods: {
                competitive: 'Competitivo',
                fun: 'Divertido',
                collaborative: 'Colaborativo',
                tense: 'Tenso',
                relaxed: 'Relajado',
            },
            confirm: 'Confirmar'
        }
    },
    lightningRound: {
        title: 'Ronda Relámpago',
        description: 'Un juego de ritmo rápido con desafíos divertidos para energizar el aula.',
        durationLabel: 'Duración de la Ronda (segundos)',
        intervalLabel: 'Intervalo del Desafío (segundos)',
        categoryLabel: 'Categoría del Desafío',
        start: '¡Iniciar Ronda Relámpago!',
        pause: 'Pausar',
        resume: 'Reanudar',
        reset: 'Reiniciar',
        noStudentsError: 'Se necesitan al menos 2 estudiantes presentes para jugar.',
        toastDeleted: 'Ronda eliminada.',
        toastDeleteFailed: 'Error al eliminar la ronda.',
        categories: {
            sound: 'Sonidos',
            face: 'Caras',
            gesture: 'Gestos',
            imitation: 'Imitaciones',
        },
        gameScreen: {
            yourTurn: '¡tu turno!',
        },
        history: {
            title: 'Historial de Rondas',
            description: 'Revisa las rondas generadas anteriormente.',
            roundFor: 'Ronda de {date}',
            noRounds: 'Aún no se han jugado rondas.',
        },
        deleteDialog: {
            title: '¿Eliminar esta ronda?',
            description: 'Esta acción es permanente y no se puede deshacer.',
        },
    },
    collaborativeStory: {
        title: 'Cuentacuentos Colaborativo',
        setup: {
            title: 'Iniciar una Nueva Historia',
            description: 'Define los personajes y el escenario para comenzar tu aventura.',
            charactersLabel: 'Personajes Principales',
            charactersPlaceholder: 'ej. Un caballero valiente, un dragón inteligente',
            settingLabel: 'Escenario Inicial',
            settingPlaceholder: 'ej. Una cueva oscura y espeluznante',
            lengthLabel: 'Longitud del Capítulo',
            lengths: {
                short: 'Corto',
                medium: 'Medio',
                long: 'Largo',
            },
            startButton: 'Comenzar Historia',
            allowDialogues: 'Permitir diálogos en la historia',
            narratorVoiceLabel: "Voz del Narrador",
            narratorVoicePlaceholder: "Selecciona una voz...",
            customPromptLabel: "Instrucción Personalizada (Opcional)",
            customPromptPlaceholder: "ej. La historia debe ser una comedia, no debe contener violencia...",
            negativePromptLabel: "Instrucción Negativa (Opcional)",
            negativePromptPlaceholder: "ej. Evitar finales tristes, no mencionar arañas...",
        },
        contribute: {
            title: '¿Qué Sucede Después?',
            description: 'Añade las ideas de los estudiantes para el próximo capítulo.',
            placeholder: 'Escribe la idea de un estudiante y presiona enter...',
            continueButton: 'Continuar Historia',
            suggestionButton: 'Sugerencia IA'
        },
        story: {
            titlePlaceholder: 'La Historia Aparecerá Aquí',
            storyPlaceholder: 'Comienza definiendo tus personajes y escenario, ¡y luego inicia la historia!',
        },
        history: {
            title: 'Historial de Historias',
            createdAt: 'Creada',
            noStories: 'Aún no hay historias.',
        },
        deleteDialog: {
            title: '¿Eliminar esta historia?',
            description: 'Esta acción es permanente y no se puede deshacer.',
        },
        toastDeleted: 'Historia eliminada.',
        toastDeleteFailed: 'Error al eliminar la historia.',
        toastNarrationSuccess: 'La narración completa de la historia se está generando y aparecerá en breve.',
        newStoryButton: 'Iniciar una Nueva Historia',
        narrateButton: 'Narrar Capítulo',
        'narrateButton--loading': 'Narrando...',
        narrateFullStoryButton: 'Narrar como Audiolibro',
        suggestions: {
            button: 'Sugerir con IA',
            toastSuccess: '¡Ideas sugeridas!'
        },
        finishButton: 'Finalizar Historia',
        test: {
            createButton: 'Crear Prueba desde la Historia',
            modalTitle: 'Generar Prueba',
            modalDescription: 'Selecciona el tipo de prueba que quieres generar a partir de esta historia.',
            typeLabel: 'Tipo de Prueba',
            types: {
                title: 'Tipo de Prueba',
                'multiple-choice': 'Opción Múltiple',
                'true-false': 'Verdadero o Falso',
                'open-ended': 'Preguntas Abiertas',
                'mixed': 'Mixta',
            },
            generateButton: 'Generar Prueba',
            generateError: 'Error al generar la prueba.',
            saveSuccess: '¡Prueba guardada con éxito!',
            saveError: 'Error al guardar la prueba.',
            previewTitle: 'Vista Previa de la Prueba Generada',
            previewDescription: 'Revisa la prueba generada. Ya ha sido guardada y puedes verla en la página de Pruebas.',
            rubricTitle: 'Rúbrica de Evaluación',
            saveButton: 'Guardar Prueba',
        },
        illustrateButton: 'Ilustrar',
    },
    debateGenerator: {
        title: 'Generador de Debates',
        description: 'Genera escenarios de debate educativos para fomentar el pensamiento crítico.',
        topicLabel: 'Tema del Debate',
        topicPlaceholder: 'ej. ¿Deberían los animales estar en zoológicos?',
        complexityLabel: 'Complejidad',
        complexities: {
            beginner: 'Principiante',
            intermediate: 'Intermedio',
            advanced: 'Avanzado'
        },
        button: 'Generar Nuevo Debate',
        noDebates: {
            title: '¿Listos para Argumentar?',
            description: 'Introduce un tema y una complejidad para generar tu primer escenario de debate.',
        },
        affirmativeStance: 'Postura a Favor',
        negativeStance: 'Postura en Contra',
        guidingQuestions: 'Preguntas Guía',
        rules: 'Reglas del Debate',
        toastDeleted: 'Debate eliminado.',
        toastDeleteFailed: 'Error al eliminar el debate.',
        deleteDialog: {
            title: '¿Eliminar este debate?',
            description: 'Esta acción es permanente y no se puede deshacer.',
        },
        startSession: "Iniciar Sesión en Vivo",
        manageSession: "Gestionar Sesión",
        turnStructureTitle: "Estructura de Turnos del Debate",
        currentTurn: "Turno Actual",
        notStarted: "El debate no ha comenzado",
        paused: "Debate en Pausa",
        start: "Iniciar Debate",
        nextTurn: "Siguiente Turno",
        pause: "Pausar",
        resume: "Reanudar",
        liveSession: {
            title: "Sesión de Debate en Curso",
            description: "Comparte este código QR o enlace con tus alumnos para comenzar el debate.",
            qrCode: "Código QR",
            link: "Enlace Directo",
            copy: "Copiar",
            copied: "¡Copiado!",
            studentsConnected: "Alumnos Conectados",
            noStudentsYet: "Aún no se ha conectado ningún alumno.",
            affirmative: 'A Favor',
            negative: 'En Contra',
            unassigned: 'Sin asignar',
            both: 'Ambos',
            teacher: 'Profesor',
            closeSession: "Cerrar Sesión",
            sessionClosed: "La sesión ha sido cerrada."
        }
    },
    digitalConviviality: {
        title: 'Convivencia Digital',
        description: 'Herramientas para fomentar un comportamiento en línea positivo y responsable.',
        activities: {
            title: 'Actividades',
            description: 'Genera una actividad para practicar habilidades de ciudadanía digital.',
        },
        conflictSimulation: {
            title: 'Simulación de Conflictos',
            description: 'Practica cómo manejar situaciones online difíciles generando un escenario de conflicto hipotético.',
            topicsLabel: 'Temas del Conflicto (Opcional)',
            topicsPlaceholder: 'ej. ciberacoso, desinformación, plagio',
            button: 'Generar Escenario',
            scenarioTitle: 'Escenario Generado',
            strategiesTitle: 'Estrategias de Intervención',
            strategyLabel: 'Estrategia',
            outcomeLabel: 'Resultado Simulado',
            noScenario: {
                title: '¿Listo para Practicar?',
                description: 'Genera un escenario para practicar tus habilidades de resolución de conflictos.',
            },
            deleteDialog: {
                title: '¿Eliminar este escenario?',
                description: 'Esto eliminará permanentemente este escenario de conflicto de tu historial.',
                confirm: 'Eliminar',
            },
            history: {
                title: 'Historial de Escenarios'
            }
        },
        pact: {
            title: 'Pacto Digital',
            description: 'Genera colaborativamente un conjunto de reglas de clase para una interacción digital saludable.',
            studentCountLabel: 'Número de Alumnos',
            mainConcernsLabel: 'Preocupaciones Principales (Opcional)',
            mainConcernsPlaceholder: 'ej. uso de redes sociales, respeto a la privacidad',
            button: 'Generar Borrador del Pacto',
            saveDraftButton: 'Guardar Borrador',
            publishButton: 'Publicar',
            republishButton: 'Republicar',
            publishedAt: 'Publicado el {date} (v{version})',
            noPacts: {
                title: '¿Listos para un Pacto?',
                description: 'Establece los parámetros de tu clase y genera un borrador de tu pacto de convivencia digital.'
            },
            deleteDialog: {
                title: '¿Eliminar este Pacto?',
                description: 'Esto eliminará permanentemente el pacto generado.',
                confirm: 'Eliminar'
            },
            history: {
                title: 'Historial de Pactos',
                principles: 'Principios Rectores',
                norms: 'Normas Específicas',
                consequences: 'Consecuencias Restaurativas',
                level: 'Nivel',
                restorativeAction: 'Acción Restaurativa'
            }
        },
        typeLabel: 'Tipo de Actividad',
        typePlaceholder: 'Seleccione un tipo...',
        types: {
            'netiquette-challenge': 'Desafío de Netiqueta',
            'digital-collaboration': 'Juego de Colaboración Digital',
            'positive-messaging': 'Reescritor de Mensajes Positivos'
        },
        customPromptLabel: 'Foco Específico (Opcional)',
        customPromptPlaceholder: 'ej. Enfocarse en comentarios de redes sociales...',
        button: 'Generar Actividad',
        history: {
            title: 'Historial de Actividades',
            studentInstructions: 'Instrucciones para los Alumnos',
            pedagogicalObjectives: 'Objetivos Pedagógicos',
            materials: 'Materiales',
            noMaterials: 'No se proporcionaron materiales.',
            steps: 'Pasos',
        },
        noActivities: {
            title: '¿Listo para Promover Buenos Hábitos Digitales?',
            description: 'Selecciona un tipo de actividad arriba para generar tu primer ejercicio de ciudadanía digital.'
        },
        deleteDialog: {
            title: '¿Eliminar esta actividad?',
            description: 'Esta acción es permanente y no se puede deshacer.',
            confirm: 'Eliminar'
        }
    },
    suggestions: {
        button: 'Sugerir con IA',
        toastSuccess: '¡Tema sugerido!'
    }
} as const;
