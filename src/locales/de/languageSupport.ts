
export default {
      title: 'Sprachunterstützung',
      tagline: 'Generieren Sie zweisprachige Materialien zur Unterstützung der sprachlichen Inklusion.',
      form: {
          title: 'Assistent für sprachliche Inklusion',
          description: 'Wählen Sie einen Schüler aus und geben Sie dessen Sprache an, um personalisierte Unterstützungsmaterialien zu generieren.',
          studentLabel: 'Schüler',
          studentPlaceholder: 'Einen Schüler auswählen...',
          languageLabel: "Muttersprache des Schülers",
          languagePlaceholder: 'z.B. Spanisch, Französisch, Mandarin',
          focusAreasLabel: 'Schwerpunktbereiche',
          generateButton: 'Unterstützungsmaterial generieren',
      },
      focusAreas: {
          reading: 'Leseverständnis',
          writing: 'Schreibfähigkeiten',
          speaking: 'Mündlicher Ausdruck',
          listening: 'Hörverständnis',
          'social-emotional': 'Sozioemotionale Integration',
      },
      addFocusAreaDialog: {
        title: 'Neue Schwerpunktbereiche hinzufügen',
        description: 'Wählen Sie aus den KI-Vorschlägen aus oder fügen Sie Ihre eigenen Schwerpunktbereiche zur Liste hinzu.',
        customPromptLabel: 'KI anleiten (Optional)',
        customPromptPlaceholder: 'z.B. Konzentrieren Sie sich auf Bereiche des Zuhörens...',
        manualAreaLabel: 'Oder Bereich manuell hinzufügen',
        manualAreaPlaceholder: 'Einen neuen Bereich eingeben...',
        noSuggestions: 'Keine Vorschläge verfügbar. Versuchen Sie, Ihre Eingabe zu aktualisieren oder zu ändern.',
        add: 'Hinzufügen:',
        addSelected: 'Ausgewählte hinzufügen',
        toastSuccess: 'Schwerpunktbereiche erfolgreich hinzugefügt!',
        toastError: 'Fehler beim Hinzufügen der Schwerpunktbereiche.',
      },
      editFocusAreaDialog: {
        title: 'Schwerpunktbereich bearbeiten: {name}',
        areaNameLabel: 'Name des Schwerpunktbereichs',
        deleteButton: 'Bereich löschen',
        toastUpdateSuccess: 'Schwerpunktbereich erfolgreich aktualisiert!',
        toastUpdateError: 'Fehler beim Aktualisieren des Schwerpunktbereichs.',
        toastDeleteSuccess: 'Schwerpunktbereich erfolgreich gelöscht!',
        toastDeleteError: 'Fehler beim Löschen des Schwerpunktbereichs.',
        deleteDialog: {
            title: 'Sind Sie sicher?',
            description: 'Dies löscht den Schwerpunktbereich "{name}" endgültig aus der Liste.',
            cancel: 'Abbrechen',
            confirm: 'Löschen'
        }
      },
      generatingTitle: 'Unterstützungsmaterial wird generiert...',
      history: {
          title: 'Verlauf der generierten Materialien',
          description: 'Überprüfen Sie zuvor generierte Materialien für den ausgewählten Schüler.',
          selectStudentPrompt: {
            title: 'Einen Schüler auswählen',
            description: 'Wählen Sie einen Schüler aus dem Formular aus, um dessen Verlauf anzuzeigen und neue Materialien zu generieren.',
          },
          noResults: {
              title: 'Noch keine Materialien',
              description: 'Verwenden Sie das Formular, um das erste Unterstützungsmaterial für diesen Schüler zu generieren.',
          },
          header: 'Material für {language}',
          teacherGuide: 'Lehrerhandreichung',
          studentMaterial: 'Schülermaterial',
          feedbackTitle: "Feedback des Lehrers",
          feedbackPlaceholder: 'War dieses Material nützlich? Ihr Feedback hilft, zukünftige Vorschläge zu verbessern.',
          toastDeleted: 'Unterstützungsmaterial gelöscht.',
          toastDeleteFailed: 'Fehler beim Löschen des Unterstützungsmaterials.',
          deleteDialog: {
            title: 'Dieses Material löschen?',
            description: 'Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird das generierte Unterstützungsmaterial dauerhaft gelöscht.',
          },
          translationTitle: "Übersetzung für {language}",
          showTranslation: "Übersetzung anzeigen",
          hideTranslation: "Übersetzung ausblenden",
      }
} as const;
