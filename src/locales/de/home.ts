export default {
    classRoster: 'Runde',
    viewOnGitHub: 'Auf GitHub ansehen',
    tagline: 'Eine unterhaltsame Art, die Teilnahme im Klassenzimmer zu fördern.',
    yearsOld: 'Jahre alt',
    aiConfig: {
      title: 'Herausforderungskonfiguration',
      challengeConfigDescription: 'Legen Sie den Kontext für die nächste von der KI generierte Herausforderung fest.',
      ageOrGrade: 'Alter oder Klasse',
      ageOrGradePlaceholder: 'z.B. 8 Jahre alt, 3. Klasse',
      country: 'Land',
      countryPlaceholder: 'z.B. Deutschland, Österreich',
      customPrompt: 'Benutzerdefinierte Anweisung',
      customPromptPlaceholder: 'z.B. Fokus auf Zusammenarbeit',
      negativePrompt: 'Negative Anweisung',
      negativePromptPlaceholder: 'z.B. Matheaufgaben vermeiden',
      subject: 'Fach',
      subjectPlaceholder: 'Ein Fach auswählen',
      spotlight: {
        title: 'Spotlight',
        atDesk: 'Kuschelecke',
        inFront: 'Bühne',
        doesNotMatter: "Spielt keine Rolle",
      },
      model: {
        title: 'KI-Modell',
        placeholder: 'Wählen Sie ein Modell...',
        customPlaceholder: 'Benutzerdefiniertes Modell'
      },
      ollamaBaseUrl: {
        title: 'Ollama-Basis-URL',
        placeholder: 'z.B. http://localhost:11434'
      },
      saveButton: 'Konfiguration speichern',
      toastSaved: 'KI-Konfiguration gespeichert!',
      toastError: 'Fehler beim Speichern der KI-Konfiguration.',
      plugin: {
        title: 'Plugin',
        placeholder: 'Wählen Sie ein Plugin...',
      }
    },
  } as const;
