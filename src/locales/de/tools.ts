
export default {
    title: 'Werkzeuge',
    tagline: 'Nutzen Sie KI-Werkzeuge, um Ihren Unterricht zu verbessern.',
    activityAdapter: {
      title: 'Aktivitäten-Adapter',
      description: 'Passen Sie jede bestehende Aktivität an die Bedürfnisse Ihres Klassenzimmers an, sei es für einzelne Schüler oder die ganze Gruppe.',
      placeholder: 'Fügen Sie die Aktivität, die Sie anpassen möchten, hier ein oder schreiben Sie sie...',
      activityLabel: 'Anzupassende Aktivität',
      existingActivityLabel: 'Wählen Sie eine bestehende Aktivität oder einen Test aus',
      existingActivityPlaceholder: 'Wählen Sie eine Aktivität/einen Test zum Zusammenfassen und Anpassen...',
      studentLabel: 'Für bestimmte Schüler anpassen (Optional)',
      studentPlaceholder: 'Schüler auswählen...',
      customPromptLabel: 'Spezifisches Ziel für die Anpassung (Optional)',
      customPromptPlaceholder: 'z.B. daraus ein Spiel machen, Fokus auf das Schreiben legen...',
      button: 'Aktivität anpassen',
      generatingTitle: 'Anpassungen werden generiert...',
      activityType: 'Aktivität'
    },
     rubricGenerator: {
      title: 'Rubrik-Generator',
      description: 'Erstellen Sie eine faire und ausgewogene Bewertungsrubrik für jede Aktivität.',
      placeholder: 'Beschreiben Sie die Aktivität, für die eine Rubrik generiert werden soll...',
      button: 'Rubrik generieren',
      testType: 'Test'
    },
    history: {
      title: 'Verlauf',
      descriptionAdapter: 'Überprüfen Sie zuvor angepasste Aktivitäten.',
      descriptionRubric: 'Überprüfen Sie zuvor generierte Rubriken.',
      reasoning: 'Begründung',
      criterion: 'Kriterium',
      excellent: 'Ausgezeichnet',
      satisfactory: 'Zufriedenstellend',
      needsImprovement: 'Muss verbessert werden',
      scoringGuide: 'Bewertungsleitfaden',
      toastDeleteSuccess: 'Löschung erfolgreich.',
      toastDeleteFailed: 'Fehler beim Löschen.',
      noResults: {
        title: 'Noch keine Ergebnisse',
        description: 'Verwenden Sie das Werkzeug auf der linken Seite, um Ihr erstes Ergebnis zu generieren.',
      },
      deleteDialogAdapter: {
          title: 'Diese Anpassung löschen?',
          description: 'Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird die Anpassung der Aktivität dauerhaft gelöscht.',
          confirm: 'Löschen'
      },
      deleteDialogRubric: {
          title: 'Diese Rubrik löschen?',
          description: 'Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird die generierte Rubrik dauerhaft gelöscht.',
          confirm: 'Löschen'
      }
    }
} as const;
