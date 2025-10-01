
export default {
    title: 'Treinador de IA',
    tagline: 'Obtenha insights e sugestões alimentadas por IA.',
    noStudentSelected: {
      title: 'Selecionar um Aluno',
      description:
        'Escolha um aluno da lista para visualizar sua análise e obter sugestões.',
    },
    tabs: {
        classroom: 'Análise de Turma',
        individual: 'Análise Individual'
    },
    coachSuggestion: {
      title: 'Sugestão do Treinador',
      description:
        'Gere uma sugestão personalizada para este aluno com base em seu perfil e desempenho.',
      button: 'Obter Sugestão',
      toastDeleted: 'Sugestão excluída com sucesso.',
      toastDeleteFailed: 'Falha ao excluir sugestão.',
      deleteDialog: {
        title: 'Excluir esta sugestão?',
        description: 'Esta ação não pode ser desfeita. Isso excluirá permanentemente a sugestão do treinador.',
        confirm: 'Excluir',
      },
      noSuggestions: {
        title: 'Nenhuma Sugestão Ainda',
        description:
          'Gere a primeira sugestão para este aluno para começar.',
      },
    },
    supportPlan: {
      title: 'Plano de Suporte',
      description:
        "Gere um plano acionável de várias etapas para apoiar o desenvolvimento deste aluno.",
      button: 'Gerar Novo Plano',
      generating: 'Gerando plano, aguarde...',
      planGenerated: 'Plano gerado {date}',
      feedbackTitle: "Feedback do Professor",
      feedbackPlaceholder:
        "O que funcionou? O que não funcionou? Seu feedback ajuda a IA a aprender...",
      toastDeleted: 'Plano de suporte excluído com sucesso.',
      toastDeleteFailed: 'Falha ao excluir plano de suporte.',
      noPlans: {
        title: 'Nenhum Plano de Suporte Ainda',
        description:
          'Gere o primeiro plano de suporte para este aluno para começar.',
      },
      stepDialog: {
        title: 'Avaliar Etapa de Suporte',
        description: 'Como foi esta etapa?',
        status: 'Status',
        feedback: 'Feedback da Etapa (opcional)',
        feedbackPlaceholder: 'Adicione uma nota sobre esta etapa...',
        saveButton: 'Salvar Avaliação da Etapa',
        statuses: {
          pending: 'Pendente',
          achieved: 'Concluído',
          'partially-achieved': 'Parcialmente Concluído',
          'not-achieved': 'Não Concluído',
          discarded: 'Descartado',
        },
      },
      deleteDialog: {
        title: 'Tem certeza que deseja excluir este plano?',
        description:
          'Esta ação não pode ser desfeita. Isso excluirá permanentemente o plano de suporte.',
        confirm: 'Excluir',
      },
    },
    moodAnalysis: {
      title: 'Análise de Tendência de Humor',
      descriptionStudent:
        "Analise o humor deste aluno em diferentes desafios para encontrar padrões.",
      descriptionClassroom:
        'Obtenha uma análise ampla da sala de aula sobre tendências de humor para melhorar a dinâmica geral.',
      button: 'Analisar Tendências',
      buttonClassroom: 'Analisar Tendências da Sala',
      analysisTitle: 'Insight com IA',
      noAnalyses: {
        title: 'Nenhuma Análise Ainda',
        descriptionStudent:
          'Gere a primeira análise de humor para este aluno para começar.',
        descriptionClassroom:
          'Gere a primeira análise de humor para a sala de aula para começar.',
      },
      toastDeleted: 'Análise excluída com sucesso.',
      toastDeleteFailed: 'Falha ao excluir análise.',
      deleteDialog: {
        title: 'Excluir esta análise?',
        description: 'Esta ação não pode ser desfeita. Isso excluirá permanentemente a análise gerada.',
        confirm: 'Excluir',
      },
    },
    relationshipLab: {
      title: 'Laboratório de Dinâmicas Sociais',
      description: 'Um espaço para analisar e melhorar os relacionamentos dos alunos.',
      button: 'Abrir Laboratório',
      tagline: 'Orquestre interações sociais positivas.',
      tabs: {
        multiStudent: 'Entre Pares',
        singleStudent: 'Individual',
      },
      form: {
        title: 'Gerador de Estratégia de Remediação de Relacionamento',
        description: 'Selecione alunos com um relacionamento tenso para receber um plano de intervenção personalizado.',
        studentsLabel: 'Selecionar Alunos (2-4)',
        studentsPlaceholder: 'Selecionar alunos...',
        focusLabel: 'Objetivo Principal / Habilidade a Reforçar',
        focusPlaceholder: 'ex.: Comunicação, Empatia, Colaboração...',
        customPromptLabel: 'Prompt Personalizado (Opcional)',
        customPromptPlaceholder: 'ex.: Criar uma atividade não verbal, transformar em jogo...',
        generateButton: 'Gerar Estratégia',
      },
      individual: {
          form: {
              title: 'Gerador de Estratégias Individuais',
              description: 'Selecione um único aluno para gerar um plano que o ajude a se integrar e se relacionar melhor com a turma.',
              studentsPlaceholder: 'Selecione um aluno...',
              generateButton: 'Gerar Estratégia de Integração'
          },
          history: {
              title: 'Histórico de Estratégias Individuais',
              description: 'Revise estratégias geradas anteriormente para este aluno.',
               prompt: {
                  title: 'Pronto para Construir Pontes?',
                  description: 'Selecione um aluno para visualizar seu histórico ou gerar uma nova estratégia de integração social.',
              },
          },
          toastSuccess: 'Estratégia de integração gerada!',
          toastDeleteSuccess: 'Estratégia excluída com sucesso.',
          toastDeleteFailed: 'Falha ao excluir a estratégia.',
          deleteDialog: {
              title: 'Excluir esta estratégia?',
              description: 'Esta ação não pode ser desfeita e excluirá permanentemente a estratégia.',
              confirm: 'Excluir'
          }
      },
      suggestions: {
          button: 'Sugerir com IA',
          toastSuccess: 'Sugestão preenchida no formulário!'
      },
       studentInfo: {
          title: "Perfil dos Alunos Selecionados",
          qualities: 'Qualidades',
          fears: 'Medos',
          none: 'Nenhum listado',
      },
      history: {
        title: 'Histórico de Estratégias',
        description: 'Revise estratégias geradas anteriormente para os alunos selecionados.',
        header: 'Estratégia para {focus}',
        statusLabel: 'Status da Estratégia',
        statusPlaceholder: 'Definir status...',
        feedbackLabel: 'Feedback do Professor',
        feedbackPlaceholder: 'Como esta estratégia funcionou na prática?',
        saveFeedbackButton: 'Salvar Avaliação',
        toastUpdateSuccess: 'Estratégia atualizada com sucesso!',
        toastUpdateFailed: 'Falha ao atualizar estratégia.',
        prompt: {
            title: 'Pronto para Remediar?',
            description: 'Selecione pelo menos dois alunos no formulário para visualizar seu histórico ou gerar uma nova estratégia.',
        },
        noResults: {
            title: 'Nenhuma Estratégia Ainda',
            description: 'Gere a primeira estratégia para este grupo de alunos.',
        },
         stepDialog: {
            title: 'Avaliar Etapa de Remediação',
            description: 'Como foi esta etapa?',
            status: 'Status',
            feedback: 'Feedback da Etapa (opcional)',
            feedbackPlaceholder: 'Adicione uma nota sobre esta etapa...',
            saveButton: 'Salvar Avaliação',
            statuses: {
                pending: 'Pendente',
                completed: 'Concluído',
                skipped: 'Ignorado',
            },
        },
      },
      details: {
          title: "Detalhes da Estratégia para '{focus}'",
          adjustTitle: "Ajustar Estratégia",
          adjustPlaceholder: "ex.: Simplificar, adicionar componente de desenho, focar mais em pistas não verbais...",
          adjustButton: "Gerar Estratégia Ajustada",
      },
      status: {
        'not_started': 'Não Iniciado',
        'in_progress': 'Em Andamento',
        'successful': 'Bem-sucedido',
        'partially_successful': 'Parcialmente Bem-sucedido',
        'did_not_work': 'Não Funcionou',
        'needs_adjustment': 'Precisa de Ajuste',
      },
      toastSuccess: 'Estratégia de remediação gerada!',
    },
    qualitiesSuggestion: {
      title: 'Sugestão de Qualidades',
      description: 'Descubra qualidades emergentes com base no desempenho do aluno.',
      button: 'Descobrir Qualidades',
      suggestionText:
        'Com base no desempenho recente, a IA sugere as seguintes qualidades:',
      noSuggestions: {
        title: 'Nenhuma Sugestão de Qualidade Ainda',
        description:
          'Gere a primeira sugestão de qualidades para este aluno para começar.',
      },
      dialog: {
        title: 'Novas Sugestões de Qualidade para {name}',
        description:
          'Com base no desempenho recente, aqui estão algumas qualidades que você pode considerar adicionar:',
        accept: 'Aceitar',
        reject: 'Rejeitar',
        confirmation: 'Como você gostaria de atualizar as qualidades?',
        add: 'Adicionar como Novo',
        replace: 'Substituir Existente',
        confirm: 'Confirmar Atualização',
      },
    },
    concernAnalysis: {
      title: 'Análise de Padrão de Preocupação',
      description:
        "A IA analisará todo o histórico do aluno em busca de padrões negativos recorrentes.",
      button: 'Analisar Preocupações',
      noAnalyses: {
        title: 'Nenhum Padrão de Preocupação Detectado',
        description:
          'Gere uma análise para verificar possíveis problemas recorrentes.',
      },
    },
    fearManagement: {
      title: 'Sugestões de Gerenciamento de Medo',
      description: 'Gere estratégias empáticas para ajudar um aluno com seus medos.',
      button: 'Obter Estratégia',
      strategyFor: 'Estratégia para:',
      feedbackTitle: 'Como foi?',
      feedbackPlaceholder: 'Seu feedback ajuda a IA a aprender e melhorar...',
      toastFearUpdated: 'Perfil de medo do aluno atualizado!',
      toastFearUpdateFailed: 'Falha ao atualizar medos do aluno.',
      toastDeleted: 'Sugestão excluída com sucesso.',
      toastDeleteFailed: 'Falha ao excluir sugestão.',
      noSuggestions: {
        title: 'Nenhuma Estratégia Ainda',
        description: 'Gere uma estratégia para ajudar este aluno a gerenciar seus medos.',
        noFears: 'Este aluno não tem medos listados. Adicione medos em seu perfil para obter sugestões.',
      },
      updateDialog: {
        title: 'Atualizar Perfil do Aluno?',
        confirm: 'Sim, atualizar perfil',
      },
      deleteDialog: {
        title: 'Excluir esta sugestão?',
        description: 'Esta ação não pode ser desfeita.',
        confirm: 'Excluir',
      },
      dialog: {
        title: 'Gerenciando Medo de {fear}',
        description: 'Revise estratégias existentes ou gere uma nova para {name}.',
        generateButton: 'Gerar Nova Sugestão',
        noSuggestions: {
            title: 'Nenhuma estratégia ainda',
            description: 'Gere a primeira sugestão de IA para abordar este medo.'
        }
      }
    }
} as const;
