export default {
    title: 'Einzelaktivitäten',
    tagline: 'Gestalten Sie personalisierte Aktivitäten für einen bestimmten Schüler.',
    step0: {
        title: 'Einen Schüler auswählen',
        description: 'Wählen Sie einen Schüler aus, um mit der Erstellung personalisierter Aktivitäten zu beginnen.',
    },
    step1: {
      selectLabel: 'Schüler',
      selectPlaceholder: 'Einen Schüler auswählen...',
    },
    generator: {
        title: 'Aktivitätengenerator für {name}',
        description: 'Definieren Sie die Parameter für die Aktivität oder nutzen Sie die KI, um Ideen vorzuschlagen.',
        topicLabel: 'Akademisches Thema',
        topicPlaceholder: 'z.B. Brüche, Photosynthese',
        skillsLabel: 'Zu entwickelnde Fähigkeiten',
        skillsPlaceholder: 'z.B. Kritisches Denken, Zusammenarbeit',
        themesLabel: 'Engagement-Themen',
        themesPlaceholder: 'z.B. Weltraum, Dinosaurier, Mysterien',
        customPromptLabel: 'Benutzerdefinierte Anweisung (optional)',
        customPromptPlaceholder: 'z.B. Fokus auf visuelle Elemente, eine praktische Aktivität gestalten',
        negativePromptLabel: 'Negative Anweisung (optional)',
        negativePromptPlaceholder: 'z.B. Schreibaufgaben vermeiden, keine Spinnen erwähnen',
        generateButton: 'Aktivitäten generieren',
        toastSuccess: 'Aktivitäten erfolgreich generiert!',
        noSkills: 'Noch keine Fähigkeiten verfügbar.',
        addSkills: 'Neue Fähigkeiten hinzufügen'
    },
    suggestions: {
        button: 'Mit KI vorschlagen',
        toastSuccess: 'Vorschläge übernommen!',
    },
    history: {
        title: "Verlauf der Aktivitätspläne",
        description: "Überprüfen und verwalten Sie zuvor generierte Aktivitätspläne für {name}.",
        toastDeleted: 'Aktivitätsplan gelöscht.',
        toastDeleteFailed: 'Fehler beim Löschen des Aktivitätsplans.',
        noResults: {
            title: "Noch keine Aktivitätspläne",
            description: "Generieren Sie den ersten Plan für diesen Schüler, um dessen Verlauf hier zu sehen."
        },
        deleteDialog: {
            title: "Diesen Aktivitätsplan löschen?",
            description: "Diese Aktion kann nicht rückgängig gemacht werden. Dies löscht den Aktivitätsplan dauerhaft.",
        },
        stepDialog: {
            title: 'Aktivitätsschritt bewerten',
            description: 'Wie ist diese Aktivität verlaufen?',
            status: 'Status',
            feedback: 'Feedback zum Schritt (optional)',
            feedbackPlaceholder: 'Fügen Sie eine Notiz zu dieser Aktivität hinzu...',
            saveButton: 'Bewertung speichern',
            statuses: {
                pending: 'Ausstehend',
                'in-progress': 'In Bearbeitung',
                completed: 'Abgeschlossen',
                skipped: 'Übersprungen'
            },
        },
    },
    democratizer: {
      title: 'Ressourcen-Demokratisierer',
      descriptionSingle: 'Passen Sie diese Aktivität an, um sie zugänglicher zu machen.',
      descriptionAll: 'Passen Sie alle Aktivitäten in diesem Plan an, um sie je nach unterschiedlichen Bedürfnissen oder Ressourcenbeschränkungen zugänglicher zu machen.',
      descriptionSelected: 'Passen Sie die {count} ausgewählten Aktivitäten in diesem Plan an, um sie zugänglicher zu machen.',
      prompt: 'Wählen Sie eine Anpassungsoption, um sie auf die Aktivitäten anzuwenden.',
      selectPlaceholder: 'Wählen Sie eine Anpassung...',
      activitiesToAdapt: "Anzupassende Aktivitäten:",
      adaptButton: 'Aktivitäten anpassen',
      toastSuccess: 'Aktivitäten erfolgreich angepasst!',
      options: {
        commonMaterials: 'Anpassen für gängige Haushaltsmaterialien',
        lowEnergy: 'Anpassen für energiesparende/ruhige Szenarien',
        socialInteraction: 'Soziale Interaktionskomponente erhöhen',
        simpleInstructions: 'Anweisungen vereinfachen',
      },
    }
} as const;
