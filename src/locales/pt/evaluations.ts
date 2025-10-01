export default {
    title: 'Avaliações',
    tagline: 'Revise e avalie a participação dos alunos.',
    evaluateButton: 'Avaliar',
    evaluatedStatus: 'Avaliado',
    rejectedStatus: 'Rejeitado',
    noChallenges: 'Nenhum desafio registrado para este aluno ainda.',
    noEvaluations: {
      title: 'Nenhuma Avaliação Ainda',
      description:
        'Quando um aluno aceitar um desafio, você poderá avaliá-lo aqui.',
    },
    evaluationDialog: {
      title: 'Avaliar Desafio',
      forStudent: 'para {name}',
      challenge: 'Desafio',
      rating: 'Avaliação',
      feedback: 'Feedback',
      feedbackPlaceholder: 'Digite seu feedback aqui...',
      saveButton: 'Salvar Avaliação',
      mood: 'Humor do Aluno',
    },
    ratings: {
      needsSupport: 'Precisa de Apoio',
      metExpectations: 'Atendeu às Expectativas',
      exceededExpectations: 'Excedeu as Expectativas',
    },
    moods: {
      enthusiastic: 'Entusiasmado',
      focused: 'Focado',
      nervous: 'Nervoso',
      frustrated: 'Frustrado',
      happy: 'Feliz',
      tired: 'Cansado',
    },
    pagination: {
        previous: 'Anterior',
        next: 'Próximo',
        page: 'Página {currentPage} de {totalPages}',
    }
} as const;
