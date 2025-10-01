export default {
    classRoster: 'Tour',
    viewOnGitHub: 'Voir sur GitHub',
    tagline: 'Une façon amusante d\'encourager la participation en classe.',
    yearsOld: 'ans',
    aiConfig: {
      title: 'Configuration du défi',
      challengeConfigDescription: 'Définissez le contexte du prochain défi généré par l\'IA.',
      ageOrGrade: 'Âge ou classe',
      ageOrGradePlaceholder: 'ex., 8 ans, CE2',
      country: 'Pays',
      countryPlaceholder: 'ex., France, Canada',
      customPrompt: 'Instruction personnalisée',
      customPromptPlaceholder: 'ex., Mettre l\'accent sur la collaboration',
      negativePrompt: 'Instruction négative',
      negativePromptPlaceholder: 'ex., Éviter les problèmes de mathématiques',
      subject: 'Matière',
      subjectPlaceholder: 'Sélectionnez une matière',
      spotlight: {
        title: 'Mise en avant',
        atDesk: 'Coin Douillet',
        inFront: 'Scène Principale',
        doesNotMatter: "Peu importe",
      },
      model: {
        title: 'Modèle d\'IA',
        placeholder: 'Sélectionnez un modèle...',
        customPlaceholder: 'Modèle personnalisé'
      },
      ollamaBaseUrl: {
        title: 'URL de base d\'Ollama',
        placeholder: 'ex., http://localhost:11434'
      },
      saveButton: 'Enregistrer la configuration',
      toastSaved: 'Configuration de l\'IA enregistrée !',
      toastError: 'Échec de l\'enregistrement de la configuration de l\'IA.',
      plugin: {
        title: 'Plugin',
        placeholder: 'Sélectionnez un plugin...',
      }
    },
  } as const;
