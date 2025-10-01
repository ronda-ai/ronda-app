
export default {
    title: 'AI Coach',
    tagline: 'Krijg door AI aangedreven inzichten en suggesties.',
    noStudentSelected: {
      title: 'Selecteer een Student',
      description:
        'Kies een student uit de lijst om hun analyse te bekijken en suggesties te krijgen.',
    },
    tabs: {
        classroom: 'Klassenanalyse',
        individual: 'Individuele Analyse'
    },
    coachSuggestion: {
      title: 'Suggestie van de Coach',
      description:
        'Genereer een gepersonaliseerde suggestie voor deze student op basis van hun profiel en prestaties.',
      button: 'Krijg Suggestie',
      toastDeleted: 'Suggestie succesvol verwijderd.',
      toastDeleteFailed: 'Kon suggestie niet verwijderen.',
      deleteDialog: {
        title: 'Deze suggestie verwijderen?',
        description: 'Deze actie kan niet ongedaan worden gemaakt. Dit zal de coachsuggestie permanent verwijderen.',
        confirm: 'Verwijderen',
      },
      noSuggestions: {
        title: 'Nog Geen Suggesties',
        description:
          'Genereer de eerste suggestie voor deze student om te beginnen.',
      },
    },
    supportPlan: {
      title: 'Ondersteuningsplan',
      description:
        'Genereer een meerstappenplan om de ontwikkeling van deze student te ondersteunen.',
      button: 'Genereer Nieuw Plan',
      generating: 'Plan genereren, een ogenblik geduld...',
      planGenerated: 'Plan gegenereerd op {date}',
      feedbackTitle: 'Feedback van de Leraar',
      feedbackPlaceholder:
        'Wat werkte? Wat niet? Uw feedback helpt de AI te leren...',
      toastDeleted: 'Ondersteuningsplan succesvol verwijderd.',
      toastDeleteFailed: 'Kon ondersteuningsplan niet verwijderen.',
      noPlans: {
        title: 'Nog Geen Ondersteuningsplannen',
        description:
          'Genereer het eerste ondersteuningsplan voor deze student om te beginnen.',
      },
      stepDialog: {
        title: 'Evalueer Ondersteuningsstap',
        description: 'Hoe is deze stap verlopen?',
        status: 'Status',
        feedback: 'Feedback op de stap (optioneel)',
        feedbackPlaceholder: 'Voeg een notitie toe over deze stap...',
        saveButton: 'Stapevaluatie Opslaan',
        statuses: {
          pending: 'In behandeling',
          achieved: 'Behaald',
          'partially-achieved': 'Gedeeltelijk Behaald',
          'not-achieved': 'Niet Behaald',
          discarded: 'Verworpen',
        },
      },
      deleteDialog: {
        title: 'Weet u zeker dat u dit plan wilt verwijderen?',
        description:
          'Deze actie kan niet ongedaan worden gemaakt. Dit zal het ondersteuningsplan permanent verwijderen.',
        confirm: 'Verwijderen',
      },
    },
    moodAnalysis: {
      title: 'Analyse van Stemmingstrends',
      descriptionStudent:
        'Analyseer de stemming van deze student bij verschillende uitdagingen om patronen te vinden.',
      descriptionClassroom:
        'Krijg een klasbrede analyse van stemmingstrends om de algemene dynamiek te verbeteren.',
      button: 'Analyseer Trends',
      buttonClassroom: 'Analyseer Klastrends',
      analysisTitle: 'Inzicht door AI',
      noAnalyses: {
        title: 'Nog Geen Analyses',
        descriptionStudent:
          'Genereer de eerste stemmingsanalyse voor deze student om te beginnen.',
        descriptionClassroom:
          'Genereer de eerste stemmingsanalyse voor de klas om te beginnen.',
      },
       toastDeleted: 'Analyse succesvol verwijderd.',
       toastDeleteFailed: 'Kon analyse niet verwijderen.',
       deleteDialog: {
        title: 'Deze analyse verwijderen?',
        description: 'Deze actie kan niet ongedaan worden gemaakt. Dit zal de gegenereerde analyse permanent verwijderen.',
        confirm: 'Verwijderen',
      },
    },
    relationshipLab: {
      title: 'Laboratorium voor Sociale Dynamiek',
      description: 'Een ruimte om studentenrelaties te analyseren en te verbeteren.',
      button: 'Open Laboratorium',
      tagline: 'Orchestreer positieve sociale interacties.',
      tabs: {
        multiStudent: 'Peer-to-Peer',
        singleStudent: 'Individueel',
      },
      form: {
        title: 'Generator voor Relatieherstelstrategieën',
        description: 'Selecteer studenten met een gespannen relatie om een aangepast interventieplan te ontvangen.',
        studentsLabel: 'Selecteer Studenten (2-4)',
        studentsPlaceholder: 'Selecteer studenten...',
        focusLabel: 'Hoofddoel / Vaardigheid om te Versterken',
        focusPlaceholder: 'bv. Communicatie, Empathie, Samenwerking...',
        customPromptLabel: 'Aangepaste Prompt (Optioneel)',
        customPromptPlaceholder: 'bv. Maak een non-verbale activiteit, maak er een spel van...',
        generateButton: 'Genereer Strategie',
      },
      individual: {
          form: {
              title: 'Individuele Strategiegenerator',
              description: 'Selecteer een enkele student om een plan te genereren dat hen helpt beter te integreren en om te gaan met de klas.',
              studentsPlaceholder: 'Selecteer een student...',
              generateButton: 'Genereer Integratiestrategie'
          },
          history: {
              title: 'Individuele Strategiegeschiedenis',
              description: 'Bekijk eerder gegenereerde strategieën voor deze student.',
               prompt: {
                  title: 'Klaar om Bruggen te Bouwen?',
                  description: 'Selecteer een student om hun geschiedenis te bekijken of een nieuwe sociale integratiestrategie te genereren.',
              },
          },
          toastSuccess: 'Integratiestrategie gegenereerd!',
          toastDeleteSuccess: 'Strategie succesvol verwijderd.',
          toastDeleteFailed: 'Kon strategie niet verwijderen.',
          deleteDialog: {
              title: 'Deze strategie verwijderen?',
              description: 'Deze actie kan niet ongedaan worden gemaakt en zal de strategie permanent verwijderen.',
              confirm: 'Verwijderen'
          }
      },
      suggestions: {
          button: 'Stel voor met AI',
          toastSuccess: 'Suggestie ingevuld in het formulier!'
      },
       studentInfo: {
          title: "Profiel van Geselecteerde Studenten",
          qualities: 'Kwaliteiten',
          fears: 'Angsten',
          none: 'Geen vermeld',
      },
      history: {
        title: 'Strategiegeschiedenis',
        description: 'Bekijk eerder gegenereerde strategieën voor de geselecteerde studenten.',
        header: 'Strategie voor {focus}',
        statusLabel: 'Strategiestatus',
        statusPlaceholder: 'Stel status in...',
        feedbackLabel: 'Feedback van de Leraar',
        feedbackPlaceholder: 'Hoe werkte deze strategie in de praktijk?',
        saveFeedbackButton: 'Sla Evaluatie op',
        toastUpdateSuccess: 'Strategie succesvol bijgewerkt!',
        toastUpdateFailed: 'Kon strategie niet bijwerken.',
        prompt: {
            title: 'Klaar om te Bemiddelen?',
            description: 'Selecteer ten minste twee studenten in het formulier om hun geschiedenis te bekijken of een nieuwe strategie te genereren.',
        },
        noResults: {
            title: 'Nog Geen Strategieën',
            description: 'Genereer de eerste strategie voor deze groep studenten.',
        },
         stepDialog: {
            title: 'Evalueer Herstelstap',
            description: 'Hoe is deze stap verlopen?',
            status: 'Status',
            feedback: 'Feedback op stap (optioneel)',
            feedbackPlaceholder: 'Voeg een notitie toe over deze stap...',
            saveButton: 'Sla Evaluatie op',
            statuses: {
                pending: 'In behandeling',
                completed: 'Voltooid',
                skipped: 'Overgeslagen',
            },
        },
      },
      details: {
          title: "Strategiedetails voor '{focus}'",
          adjustTitle: "Strategie Aanpassen",
          adjustPlaceholder: "bv. Maak het eenvoudiger, voeg een tekencomponent toe, focus meer op non-verbale signalen...",
          adjustButton: "Genereer Aangepaste Strategie",
      },
      status: {
        'not_started': 'Niet Gestart',
        'in_progress': 'In Uitvoering',
        'successful': 'Succesvol',
        'partially_successful': 'Gedeeltelijk Succesvol',
        'did_not_work': 'Werkte Niet',
        'needs_adjustment': 'Heeft Aanpassing Nodig',
      },
      toastSuccess: 'Herstelstrategie gegenereerd!',
    },
    qualitiesSuggestion: {
      title: 'Kwaliteitssuggestie',
      description: 'Ontdek opkomende kwaliteiten op basis van de prestaties van de student.',
      button: 'Ontdek Kwaliteiten',
      suggestionText:
        'Op basis van recente prestaties stelt de AI de volgende kwaliteiten voor:',
      noSuggestions: {
        title: 'Nog Geen Kwaliteitssuggesties',
        description:
          'Genereer de eerste kwaliteitssuggestie voor deze student om te beginnen.',
      },
      dialog: {
        title: 'Nieuwe Kwaliteitssuggesties voor {name}',
        description:
          'Op basis van recente prestaties zijn hier enkele kwaliteiten die u kunt overwegen toe te voegen:',
        accept: 'Accepteren',
        reject: 'Weigeren',
        confirmation: 'Hoe wilt u de kwaliteiten bijwerken?',
        add: 'Toevoegen als Nieuw',
        replace: 'Bestaande Vervangen',
        confirm: 'Update Bevestigen',
      },
    },
    concernAnalysis: {
      title: 'Analyse van Zorgpatronen',
      description:
        'De AI analyseert de volledige geschiedenis van de student op terugkerende negatieve patronen.',
      button: 'Analyseer op Zorgen',
      noAnalyses: {
        title: 'Geen Zorgpatronen Gedetecteerd',
        description:
          'Genereer een analyse om te controleren op mogelijke terugkerende problemen.',
      },
    },
    fearManagement: {
      title: 'Suggesties voor Angstbeheersing',
      description: 'Genereer empathische strategieën om een student met zijn angsten te helpen.',
      button: 'Krijg Strategie',
      strategyFor: 'Strategie voor:',
      feedbackTitle: 'Hoe is het gegaan?',
      feedbackPlaceholder: 'Uw feedback helpt de AI te leren en te verbeteren...',
      toastFearUpdated: 'Angstprofiel van student bijgewerkt!',
      toastFearUpdateFailed: 'Kon angsten van student niet bijwerken.',
      toastDeleted: 'Suggestie succesvol verwijderd.',
      toastDeleteFailed: 'Kon suggestie niet verwijderen.',
      noSuggestions: {
        title: 'Nog Geen Strategieën',
        description: 'Genereer een strategie om deze student te helpen zijn angsten te beheersen.',
        noFears: 'Deze student heeft geen angsten vermeld. Voeg angsten toe in hun profiel om suggesties te krijgen.',
      },
      updateDialog: {
        title: 'Studentenprofiel Bijwerken?',
        confirm: 'Ja, profiel bijwerken',
      },
      deleteDialog: {
        title: 'Deze suggestie verwijderen?',
        description: 'Deze actie kan niet ongedaan worden gemaakt.',
        confirm: 'Verwijderen',
      },
      dialog: {
        title: 'Omgaan met angst voor {fear}',
        description: 'Bekijk bestaande strategieën of genereer een nieuwe voor {name}.',
        generateButton: 'Genereer Nieuwe Suggestie',
        noSuggestions: {
            title: 'Nog geen strategieën',
            description: 'Genereer de eerste AI-suggestie om deze angst aan te pakken.'
        }
      }
    }
} as const;
