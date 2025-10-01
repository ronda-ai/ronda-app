
export default {
    title: 'Individuele Activiteiten',
    tagline: 'Ontwerp gepersonaliseerde activiteiten voor een specifieke student.',
    step0: {
        title: 'Selecteer een Student',
        description: 'Kies een student om te beginnen met het genereren van gepersonaliseerde activiteiten.',
    },
    step1: {
      selectLabel: 'Student',
      selectPlaceholder: 'Selecteer een student...',
    },
    generator: {
        title: 'Activiteitengenerator voor {name}',
        description: 'Definieer de parameters voor de activiteit, of gebruik de AI om ideeën voor te stellen.',
        topicLabel: 'Academisch Onderwerp',
        topicPlaceholder: 'bv. Breuken, Fotosynthese',
        skillsLabel: 'Te Ontwikkelen Vaardigheden',
        skillsPlaceholder: 'bv. Kritisch Denken, Samenwerking',
        themesLabel: 'Betrokkenheidsthema\'s',
        themesPlaceholder: 'bv. Ruimte, Dinosauriërs, Mysteries',
        customPromptLabel: 'Aangepaste Prompt (Optioneel)',
        customPromptPlaceholder: 'bv. Focus op visuele elementen, maak er een hands-on activiteit van',
        negativePromptLabel: 'Negatieve Prompt (Optioneel)',
        negativePromptPlaceholder: 'bv. Vermijd schrijftaken, vermeld geen spinnen',
        generateButton: 'Genereer Activiteiten',
        toastSuccess: 'Activiteiten succesvol gegenereerd!',
        noSkills: 'Nog geen vaardigheden beschikbaar.',
        addSkills: 'Nieuwe vaardigheden toevoegen'
    },
    suggestions: {
        button: 'Stel voor met AI',
        toastSuccess: 'Suggesties ingevuld!',
    },
    history: {
        title: "Geschiedenis van Activiteitenplannen",
        description: "Bekijk en beheer eerder gegenereerde activiteitenplannen voor {name}.",
        toastDeleted: 'Activiteitenplan verwijderd.',
        toastDeleteFailed: 'Kon activiteitenplan niet verwijderen.',
        noResults: {
            title: "Nog Geen Activiteitenplannen",
            description: "Genereer het eerste plan voor deze student om hier hun geschiedenis te zien."
        },
        deleteDialog: {
            title: "Dit activiteitenplan verwijderen?",
            description: "Deze actie kan niet ongedaan worden gemaakt. Dit zal het activiteitenplan permanent verwijderen.",
        },
        stepDialog: {
            title: 'Evalueer Activiteitsstap',
            description: 'Hoe is deze activiteit verlopen?',
            status: 'Status',
            feedback: 'Feedback op de stap (optioneel)',
            feedbackPlaceholder: 'Voeg een notitie toe over deze activiteit...',
            saveButton: 'Evaluatie Opslaan',
            statuses: {
                pending: 'In behandeling',
                'in-progress': 'In uitvoering',
                completed: 'Voltooid',
                skipped: 'Overgeslagen'
            },
        },
    },
    democratizer: {
      title: 'Resource Democratizer',
      descriptionSingle: 'Pas deze activiteit aan om deze toegankelijker te maken.',
      descriptionAll: 'Pas alle activiteiten in dit plan aan om ze toegankelijker te maken op basis van verschillende behoeften of resourcebeperkingen.',
      descriptionSelected: 'Pas de {count} geselecteerde activiteiten in dit plan aan om ze toegankelijker te maken.',
      prompt: 'Selecteer een aanpassingsoptie om toe te passen op de activiteiten.',
      selectPlaceholder: 'Kies een aanpassing...',
      activitiesToAdapt: "Activiteiten om aan te passen:",
      adaptButton: 'Pas Activiteiten aan',
      toastSuccess: 'Activiteiten succesvol aangepast!',
      options: {
        commonMaterials: 'Aanpassen voor gangbare huishoudelijke materialen',
        lowEnergy: 'Aanpassen voor rustige/laag-energetische scenario\'s',
        socialInteraction: 'Verhoog de component van sociale interactie',
        simpleInstructions: 'Vereenvoudig de instructies',
      },
    }
} as const;
