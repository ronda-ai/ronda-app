
export default {
    classRoster: 'Ronda',
    viewOnGitHub: 'Ver en GitHub',
    tagline: 'Una forma divertida de fomentar la participación en clase.',
    yearsOld: 'años',
    aiConfig: {
      title: 'Configuración de Desafío',
      challengeConfigDescription: 'Establece el contexto para el próximo desafío generado por la IA.',
      ageOrGrade: 'Edad o Grado',
      ageOrGradePlaceholder: 'ej. 8 años, 3er grado',
      country: 'País',
      countryPlaceholder: 'ej. Chile, España',
      customPrompt: 'Instrucción Adicional',
      customPromptPlaceholder: 'ej. Enfocarse en la colaboración',
      negativePrompt: 'Instrucción Negativa',
      negativePromptPlaceholder: 'ej. Evitar problemas de matemáticas',
      subject: 'Asignatura',
      subjectPlaceholder: 'Selecciona una asignatura',
      spotlight: {
        title: 'El Escenario',
        atDesk: 'Rincón Acogedor',
        inFront: 'Escenario Principal',
        doesNotMatter: "No Importa",
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
      saveButton: 'Guardar Configuración',
      toastSaved: '¡Configuración de IA guardada!',
      toastError: 'Error al guardar la configuración de IA.',
      plugin: {
        title: 'Plugin',
        placeholder: 'Selecciona un plugin...',
      }
    },
  } as const;
