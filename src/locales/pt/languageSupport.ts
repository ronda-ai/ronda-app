
export default {
      title: 'Suporte de Idioma',
      tagline: 'Gere materiais bilíngues para apoiar a inclusão linguística.',
      form: {
          title: 'Assistente de Inclusão Linguística',
          description: 'Selecione um aluno e especifique seu idioma para gerar materiais de suporte personalizados.',
          studentLabel: 'Aluno',
          studentPlaceholder: 'Selecionar um aluno...',
          languageLabel: 'Idioma Nativo do Aluno',
          languagePlaceholder: 'ex.: Espanhol, Francês, Mandarim',
          focusAreasLabel: 'Áreas de Foco',
          generateButton: 'Gerar Material de Suporte',
      },
      focusAreas: {
          reading: 'Compreensão de Leitura',
          writing: 'Habilidades de Escrita',
          speaking: 'Expressão Oral',
          listening: 'Compreensão Auditiva',
          'social-emotional': 'Integração Socioemocional',
      },
      addFocusAreaDialog: {
        title: 'Adicionar Novas Áreas de Foco',
        description: 'Selecione a partir das sugestões da IA ou adicione suas próprias áreas de foco à lista.',
        customPromptLabel: 'Guiar a IA (Opcional)',
        customPromptPlaceholder: 'ex. Foco em áreas de audição...',
        manualAreaLabel: 'Ou Adicionar uma Área Manualmente',
        manualAreaPlaceholder: 'Digite uma nova área...',
        noSuggestions: 'Nenhuma sugestão disponível. Tente atualizar ou alterar seu prompt.',
        add: 'Adicionar:',
        addSelected: 'Adicionar Selecionados',
        toastSuccess: 'Áreas de foco adicionadas com sucesso!',
        toastError: 'Falha ao adicionar áreas de foco.',
      },
      editFocusAreaDialog: {
        title: 'Editar Área de Foco: {name}',
        areaNameLabel: 'Nome da Área de Foco',
        deleteButton: 'Excluir Área',
        toastUpdateSuccess: 'Área de foco atualizada com sucesso!',
        toastUpdateError: 'Falha ao atualizar a área de foco.',
        toastDeleteSuccess: 'Área de foco excluída com sucesso!',
        toastDeleteError: 'Falha ao excluir a área de foco.',
        deleteDialog: {
            title: 'Tem certeza?',
            description: 'Isso excluirá permanentemente a área de foco "{name}" da lista.',
            cancel: 'Cancelar',
            confirm: 'Excluir'
        }
      },
      generatingTitle: 'Gerando Material de Suporte...',
      history: {
          title: 'Histórico de Materiais Gerados',
          description: 'Revise materiais gerados anteriormente para o aluno selecionado.',
          selectStudentPrompt: {
            title: 'Selecionar um Aluno',
            description: 'Escolha um aluno do formulário para visualizar seu histórico e gerar novos materiais.',
          },
          noResults: {
              title: 'Nenhum Material Ainda',
              description: 'Use o formulário para gerar o primeiro material de suporte para este aluno.',
          },
          header: 'Material para {language}',
          teacherGuide: 'Guia do Professor',
          studentMaterial: 'Material do Aluno',
          feedbackTitle: "Feedback do Professor",
          feedbackPlaceholder: 'Este material foi útil? Seu feedback ajuda a melhorar sugestões futuras.',
          toastDeleted: 'Material de suporte excluído.',
          toastDeleteFailed: 'Falha ao excluir material de suporte.',
          deleteDialog: {
            title: 'Excluir este material?',
            description: 'Esta ação não pode ser desfeita. Isso excluirá permanentemente o material de suporte gerado.',
          },
          translationTitle: "Tradução para {language}",
          showTranslation: "Mostrar Tradução",
          hideTranslation: "Ocultar Tradução",
      }
} as const;
