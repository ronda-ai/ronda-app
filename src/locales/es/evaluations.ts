
export default {
    title: 'Evaluaciones',
    tagline: 'Revisa y evalúa la participación de los estudiantes.',
    evaluateButton: 'Evaluar',
    evaluatedStatus: 'Evaluado',
    rejectedStatus: 'Rechazado',
    noChallenges: 'Aún no hay desafíos registrados para este estudiante.',
    noEvaluations: {
      title: 'Aún no hay evaluaciones',
      description:
        'Cuando un estudiante acepte un desafío, podrás evaluarlo aquí.',
    },
    evaluationDialog: {
      title: 'Evaluar Desafío',
      forStudent: 'para {name}',
      challenge: 'Desafío',
      rating: 'Calificación',
      feedback: 'Comentarios',
      feedbackPlaceholder: 'Escribe tus comentarios aquí...',
      saveButton: 'Guardar Evaluación',
      mood: 'Ánimo del Estudiante',
    },
    ratings: {
      needsSupport: 'Necesita Apoyo',
      metExpectations: 'Cumplió Expectativas',
      exceededExpectations: 'Superó Expectativas',
    },
    moods: {
      enthusiastic: 'Entusiasmado',
      focused: 'Concentrado',
      nervous: 'Nervioso',
      frustrated: 'Frustrado',
      happy: 'Feliz',
      tired: 'Cansado',
    },
    pagination: {
        previous: 'Anterior',
        next: 'Siguiente',
        page: 'Página {currentPage} de {totalPages}',
    }
} as const;
