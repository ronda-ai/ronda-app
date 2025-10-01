export default {
    classRoster: 'Turma',
    viewOnGitHub: 'Ver no GitHub',
    tagline: 'Uma forma divertida de incentivar a participação em sala de aula.',
    yearsOld: 'anos',
    aiConfig: {
      title: 'Configuração de IA',
      challengeConfigDescription: 'Defina o contexto para o próximo desafio gerado pela IA.',
      ageOrGrade: 'Idade ou Série',
      ageOrGradePlaceholder: 'ex.: 8 anos, 3º Ano',
      country: 'País',
      countryPlaceholder: 'ex.: Brasil, Portugal',
      customPrompt: 'Prompt Personalizado',
      customPromptPlaceholder: 'ex.: Focar em colaboração',
      negativePrompt: 'Prompt Negativo',
      negativePromptPlaceholder: 'ex.: Evitar problemas de matemática',
      subject: 'Matéria',
      subjectPlaceholder: 'Selecione uma matéria',
      spotlight: {
        title: 'Destaque',
        atDesk: 'Canto Aconchegante',
        inFront: 'Palco Central',
        doesNotMatter: "Não Importa",
      },
      model: {
        title: 'Modelo de IA',
        placeholder: 'Selecciona un modelo...',
         customPlaceholder: 'Personalizado'
      },
      ollamaBaseUrl:{
        title: 'Ollama Base URL',
        placeholder: 'e.g., http://localhost:11434'
      },
      saveButton: 'Salvar Configuração',
      toastSaved: 'Configuração de IA salva!',
      toastError: 'Falha ao salvar configuração de IA.',
      plugin: {
        title: 'Plugin',
        placeholder: 'Select a plugin...',
      }
    },
  } as const;
