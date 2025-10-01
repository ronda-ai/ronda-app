

export default {
    title: 'Klasa',
    tagline: 'Skonfiguruj ustawienia i kontekst swojej klasy.',
    form: {
      title: 'Ustawienia klasy',
      description: 'Podaj kontekst dotyczący Twojej klasy, aby pomóc AI w generowaniu bardziej trafnych treści.',
      className: 'Nazwa klasy',
      classNamePlaceholder: 'np. Grupa czytelnicza 3. klasy',
      classInterests: 'Zainteresowania klasy',
      classInterestsPlaceholder: 'np. Dinozaury, Kosmos, Superbohaterowie',
      analysisLevel: 'Poziom głębokości analizy',
      analysisLevelPlaceholder: 'Wybierz poziom...',
      analysisLevels: {
        low: 'Niski (ostatnie 5 obserwacji)',
        medium: 'Średni (ostatnie 10 obserwacji)',
        high: 'Wysoki (ostatnie 15 obserwacji)',
      }
    },
    theme: {
        title: 'Dostosowywanie interfejsu',
        galleryTitle: 'Galeria motywów',
        galleryDescription: 'Wybierz predefiniowany motyw, aby natychmiast zmienić wygląd aplikacji.',
        moreThemes: 'Przeglądaj więcej motywów...',
        names: {
            default: 'Domyślny',
            forest: 'Zaczarowany Las',
            ocean: 'Głęboki Ocean',
            sunset: 'Ciepły Zachód Słońca',
            rose: 'Płatek Róży',
            nebula: 'Kosmiczna Mgławica',
            minty: 'Świeża Mięta',
            sandstone: 'Pustynia Piaskowca',
            cyberpunk: 'Cyberpunk',
            vintage: 'Vintage',
            sakura: 'Sakura',
            jungle: 'Dżungla',
            arctic: 'Arktyka',
            volcano: 'Wulkan',
            cotton_candy: 'Wata cukrowa',
            golden_hour: 'Złota godzina',
            royal: 'Królewski',
            emerald: 'Szmaragd',
            coffee_shop: 'Kawiarnia',
            autumn: 'Jesień',
            coral_reef: 'Rafa koralowa',
            lavender_field: 'Pole lawendy',
            graphite: 'Grafit',
            strawberry: 'Truskawka',
            matcha: 'Matcha',
            peacock: 'Paw',
            sunny_day: 'Słoneczny dzień',
            '8bit': '8-Bit',
        }
    },
    studentList: {
        title: 'Lista uczniów',
        description: 'Zarządzaj profilami swoich uczniów i przeglądaj kluczowe informacje na pierwszy rzut oka.',
        searchPlaceholder: 'Szukaj według imienia, cechy, lęku...',
        noResults: 'Nie znaleziono uczniów pasujących do Twojego wyszukiwania.'
    },
    aiExpertDialog: {
        title: 'Zapytaj eksperta AI o {name}',
        description: 'Zadaj otwarte pytanie na temat tego ucznia, aby otrzymać wskazówki pedagogiczne lub psychologiczne.',
        studentProfile: 'Profil ucznia',
        qualities: 'Zalety',
        fears: 'Obawy',
        notes: 'Notatki',
        disability: 'Niepełnosprawność',
        neurodiversity: 'Neuroróżnorodność',
        questionLabel: 'Twoje pytanie',
        questionPlaceholder: 'np. Jak mogę pomóc temu uczniowi poczuć się pewniej na matematyce?',
        askButton: 'Zapytaj AI',
        answerTitle: 'Porada eksperta AI'
    }
} as const;
