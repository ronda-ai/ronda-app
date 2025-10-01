

export default {
    title: 'Klaslokaal',
    tagline: 'Configureer de instellingen en context van uw klaslokaal.',
    form: {
      title: 'Klaslokaalinstellingen',
      description: 'Geef context over uw klaslokaal om de AI te helpen relevantere inhoud te genereren.',
      className: 'Klasnaam',
      classNamePlaceholder: 'bijv. Leesgroep 3e klas',
      classInterests: 'Interesses van de klas',
      classInterestsPlaceholder: 'bijv. Dinosauriërs, Ruimte, Superhelden',
      analysisLevel: 'Analyse diepteniveau',
      analysisLevelPlaceholder: 'Selecteer een niveau...',
      analysisLevels: {
        low: 'Laag (laatste 5 observaties)',
        medium: 'Gemiddeld (laatste 10 observaties)',
        high: 'Hoog (laatste 15 observaties)',
      }
    },
    theme: {
        title: 'Interface Aanpassing',
        galleryTitle: 'Thema Galerij',
        galleryDescription: 'Selecteer een vooraf gedefinieerd thema om direct het uiterlijk van de applicatie te veranderen.',
        moreThemes: 'Meer thema\'s ontdekken...',
        names: {
            default: 'Standaard',
            forest: 'Betoverd Bos',
            ocean: 'Diepe Oceaan',
            sunset: 'Warme Zonsondergang',
            rose: 'Rozenblaadje',
            nebula: 'Kosmische Nevel',
            minty: 'Frisse Munt',
            sandstone: 'Zandsteenwoestijn',
            cyberpunk: 'Cyberpunk',
            vintage: 'Vintage',
            sakura: 'Sakura',
            jungle: 'Jungle',
            arctic: 'Arctisch',
            volcano: 'Vulkaan',
            cotton_candy: 'Suikerspin',
            golden_hour: 'Gouden Uur',
            royal: 'Koninklijk',
            emerald: 'Smaragd',
            coffee_shop: 'Koffiehuis',
            autumn: 'Herfst',
            coral_reef: 'Koraalrif',
            lavender_field: 'Lavendelveld',
            graphite: 'Grafiet',
            strawberry: 'Aardbei',
            matcha: 'Matcha',
            peacock: 'Pauw',
            sunny_day: 'Zonnige Dag',
            '8bit': '8-Bit',
        }
    },
    studentList: {
        title: 'Studentenlijst',
        description: 'Beheer uw studentenprofielen en bekijk belangrijke informatie in één oogopslag.',
        searchPlaceholder: 'Zoek op naam, kwaliteit, angst...',
        noResults: 'Geen studenten gevonden die aan uw zoekopdracht voldoen.'
    },
    aiExpertDialog: {
        title: 'Vraag AI Expert over {name}',
        description: 'Stel een open vraag over deze student om pedagogische of psychologische begeleiding te ontvangen.',
        studentProfile: 'Studentenprofiel',
        qualities: 'Kwaliteiten',
        fears: 'Angsten',
        notes: 'Notities',
        disability: 'Beperking',
        neurodiversity: 'Neurodiversiteit',
        questionLabel: 'Uw Vraag',
        questionPlaceholder: 'bijv. Hoe kan ik deze student helpen meer zelfvertrouwen te krijgen in wiskunde?',
        askButton: 'Vraag AI',
        answerTitle: 'Advies van AI Expert'
    }
} as const;
