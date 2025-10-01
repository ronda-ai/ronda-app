
export default {
    classRoster: 'Runda',
    viewOnGitHub: 'Zobacz na GitHub',
    tagline: 'Zabawny sposób na zachęcanie do udziału w zajęciach.',
    yearsOld: 'lat',
    aiConfig: {
      title: 'Konfiguracja wyzwania',
      challengeConfigDescription: 'Ustaw kontekst dla następnego wyzwania generowanego przez AI.',
      ageOrGrade: 'Wiek lub klasa',
      ageOrGradePlaceholder: 'np. 8 lat, 3. klasa',
      country: 'Kraj',
      countryPlaceholder: 'np. Polska',
      customPrompt: 'Niestandardowe polecenie',
      customPromptPlaceholder: 'np. Skup się na współpracy',
      negativePrompt: 'Negatywne polecenie',
      negativePromptPlaceholder: 'np. Unikaj zadań matematycznych',
      subject: 'Przedmiot',
      subjectPlaceholder: 'Wybierz przedmiot',
      spotlight: {
        title: 'Miejsce w centrum uwagi',
        atDesk: 'Przytulny Kącik',
        inFront: 'Na Scenie',
        doesNotMatter: "Nie ma znaczenia",
      },
      model: {
        title: 'Model AI',
        placeholder: 'Wybierz model...',
        customPlaceholder: 'Model niestandardowy'
      },
      ollamaBaseUrl: {
        title: 'Bazowy adres URL Ollama',
        placeholder: 'np. http://localhost:11434'
      },
      saveButton: 'Zapisz konfigurację',
      toastSaved: 'Konfiguracja AI zapisana!',
      toastError: 'Nie udało się zapisać konfiguracji AI.',
      plugin: {
        title: 'Wtyczka',
        placeholder: 'Wybierz wtyczkę...',
      }
    },
  } as const;
