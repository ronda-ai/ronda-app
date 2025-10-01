
export default {
    title: 'Gereedschap',
    tagline: 'Gebruik AI-tools om uw onderwijs te verbeteren.',
    activityAdapter: {
      title: 'Activiteitenadapter',
      description: 'Pas elke bestaande activiteit aan om beter aan te sluiten bij de behoeften van uw klas, zowel voor specifieke studenten als voor de hele groep.',
      placeholder: 'Plak of schrijf hier de activiteit die u wilt aanpassen...',
      activityLabel: 'Aan te passen activiteit',
      existingActivityLabel: 'Selecteer een bestaande activiteit of toets',
      existingActivityPlaceholder: 'Kies een activiteit/toets om samen te vatten en aan te passen...',
      studentLabel: 'Aanpassen voor specifieke studenten (optioneel)',
      studentPlaceholder: 'Selecteer studenten...',
      customPromptLabel: 'Specifiek doel voor de aanpassing (optioneel)',
      customPromptPlaceholder: 'bv. Maak er een spel van, focus op schrijven...',
      button: 'Activiteit aanpassen',
      generatingTitle: 'Aanpassingen genereren...',
      activityType: 'Activiteit'
    },
     rubricGenerator: {
      title: 'Rubric Generator',
      description: 'Creëer een eerlijke en evenwichtige evaluatierubric voor elke activiteit.',
      placeholder: 'Beschrijf de activiteit waarvoor een rubric gegenereerd moet worden...',
      button: 'Genereer Rubric',
      testType: 'Toets'
    },
    history: {
      title: 'Geschiedenis',
      descriptionAdapter: 'Bekijk eerder aangepaste activiteiten.',
      descriptionRubric: 'Bekijk eerder gegenereerde rubrics.',
      reasoning: 'Redenering',
      criterion: 'Criterium',
      excellent: 'Uitstekend',
      satisfactory: 'Voldoende',
      needsImprovement: 'Heeft verbetering nodig',
      scoringGuide: 'Scoregids',
      toastDeleteSuccess: 'Succesvol verwijderd.',
      toastDeleteFailed: 'Verwijderen mislukt.',
      noResults: {
        title: 'Nog Geen Resultaten',
        description: 'Gebruik de tool aan de linkerkant om uw eerste resultaat te genereren.',
      },
      deleteDialogAdapter: {
          title: 'Deze aanpassing verwijderen?',
          description: 'Deze actie kan niet ongedaan worden gemaakt. Dit zal de activiteitenaanpassing permanent verwijderen.',
          confirm: 'Verwijderen'
      },
      deleteDialogRubric: {
          title: 'Deze rubric verwijderen?',
          description: 'Deze actie kan niet ongedaan worden gemaakt. Dit zal de gegenereerde rubric permanent verwijderen.',
          confirm: 'Verwijderen'
      }
    }
} as const;
