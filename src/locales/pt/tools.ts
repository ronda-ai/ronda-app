
export default {
    title: 'Ferramentas',
    tagline: 'Use ferramentas de IA para aprimorar seu ensino.',
    activityAdapter: {
      title: 'Adaptador de Atividade',
      description: 'Adapte qualquer atividade existente para melhor atender às necessidades da sua sala de aula, seja para alunos específicos ou para todo o grupo.',
      placeholder: 'Cole ou escreva a atividade que deseja adaptar aqui...',
      activityLabel: 'Atividade para Adaptar',
      existingActivityLabel: 'Selecione uma atividade ou teste existente',
      existingActivityPlaceholder: 'Escolha uma atividade/teste para resumir e adaptar...',
      studentLabel: 'Adaptar para Alunos Específicos (Opcional)',
      studentPlaceholder: 'Selecionar alunos...',
      customPromptLabel: 'Objetivo Específico para a Adaptação (Opcional)',
      customPromptPlaceholder: 'ex.: Que seja um jogo, focar na escrita...',
      button: 'Adaptar Atividade',
      generatingTitle: 'Gerando Adaptações...',
      activityType: 'Atividade'
    },
     rubricGenerator: {
      title: 'Gerador de Rúbrica',
      description: 'Crie uma rúbrica de avaliação justa e equilibrada para qualquer atividade.',
      placeholder: 'Descreva a atividade para a qual gerar uma rúbrica...',
      button: 'Gerar Rúbrica',
      testType: 'Teste'
    },
    history: {
      title: 'Histórico',
      descriptionAdapter: 'Revise atividades adaptadas anteriormente.',
      descriptionRubric: 'Revise rubricas geradas anteriormente.',
      reasoning: 'Justificativa',
      criterion: 'Critério',
      excellent: 'Excelente',
      satisfactory: 'Satisfatório',
      needsImprovement: 'Precisa Melhorar',
      scoringGuide: 'Guia de Pontuação',
      toastDeleteSuccess: 'Exclusão bem-sucedida.',
      toastDeleteFailed: 'Falha ao excluir.',
      noResults: {
        title: 'Nenhum Resultado Ainda',
        description: 'Use a ferramenta à esquerda para gerar seu primeiro resultado.',
      },
      deleteDialogAdapter: {
          title: 'Excluir esta adaptação?',
          description: 'Esta ação não pode ser desfeita. Isso excluirá permanentemente a adaptação da atividade.',
          confirm: 'Excluir'
      },
      deleteDialogRubric: {
          title: 'Excluir esta rúbrica?',
          description: 'Esta ação não pode ser desfeita. Isso excluirá permanentemente a rúbrica gerada.',
          confirm: 'Excluir'
      }
    }
} as const;
