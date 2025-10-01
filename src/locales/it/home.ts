export default {
    classRoster: 'Turno',
    viewOnGitHub: 'Vedi su GitHub',
    tagline: 'Un modo divertente per incoraggiare la partecipazione in classe.',
    yearsOld: 'anni',
    aiConfig: {
      title: 'Configurazione Sfida',
      challengeConfigDescription: 'Imposta il contesto per la prossima sfida generata dall\'IA.',
      ageOrGrade: 'Età o Classe',
      ageOrGradePlaceholder: 'es. 8 anni, 3ª elementare',
      country: 'Paese',
      countryPlaceholder: 'es. Italia, Svizzera',
      customPrompt: 'Prompt Personalizzato',
      customPromptPlaceholder: 'es. Concentrarsi sulla collaborazione',
      negativePrompt: 'Prompt Negativo',
      negativePromptPlaceholder: 'es. Evitare problemi di matematica',
      subject: 'Materia',
      subjectPlaceholder: 'Seleziona una materia',
      spotlight: {
        title: 'Scenario',
        atDesk: 'Angolo Tranquillo',
        inFront: 'Palcoscenico',
        doesNotMatter: "Non importa",
      },
      model: {
        title: 'Modello IA',
        placeholder: 'Seleziona un modello...',
        customPlaceholder: 'Modello personalizzato'
      },
      ollamaBaseUrl: {
        title: 'URL Base di Ollama',
        placeholder: 'es. http://localhost:11434'
      },
      saveButton: 'Salva Configurazione',
      toastSaved: 'Configurazione IA salvata!',
      toastError: 'Impossibile salvare la configurazione IA.',
      plugin: {
        title: 'Plugin',
        placeholder: 'Seleziona un plugin...',
      }
    },
  } as const;
