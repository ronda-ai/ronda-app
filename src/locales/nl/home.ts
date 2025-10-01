
export default {
    classRoster: 'Ronde',
    viewOnGitHub: 'Bekijk op GitHub',
    tagline: 'Een leuke manier om deelname in de klas aan te moedigen.',
    yearsOld: 'jaar oud',
    aiConfig: {
      title: 'Uitdagingsconfiguratie',
      challengeConfigDescription: 'Stel de context in voor de volgende door AI gegenereerde uitdaging.',
      ageOrGrade: 'Leeftijd of Klas',
      ageOrGradePlaceholder: 'bv. 8 jaar oud, 3e klas',
      country: 'Land',
      countryPlaceholder: 'bv. Nederland, België',
      customPrompt: 'Aangepaste Prompt',
      customPromptPlaceholder: 'bv. Focus op samenwerking',
      negativePrompt: 'Negatieve Prompt',
      negativePromptPlaceholder: 'bv. Vermijd wiskundige problemen',
      subject: 'Vak',
      subjectPlaceholder: 'Selecteer een vak',
      spotlight: {
        title: 'Spotlight',
        atDesk: 'Gezellige Hoek',
        inFront: 'Middelpunt',
        doesNotMatter: "Maakt niet uit",
      },
      model: {
        title: 'AI Model',
        placeholder: 'Selecteer een model...',
        customPlaceholder: 'Aangepast model'
      },
      ollamaBaseUrl: {
        title: 'Ollama Basis-URL',
        placeholder: 'bv. http://localhost:11434'
      },
      saveButton: 'Configuratie Opslaan',
      toastSaved: 'AI-configuratie opgeslagen!',
      toastError: 'Kon AI-configuratie niet opslaan.',
      plugin: {
        title: 'Plugin',
        placeholder: 'Selecteer een plugin...',
      }
    },
  } as const;
