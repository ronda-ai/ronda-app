export default {
    title: 'KI-Coach',
    tagline: 'Erhalten Sie KI-gestützte Einblicke und Vorschläge.',
    noStudentSelected: {
      title: 'Schüler auswählen',
      description:
        'Wählen Sie einen Schüler aus der Liste aus, um seine Analyse anzuzeigen und Vorschläge zu erhalten.',
    },
    tabs: {
        classroom: 'Klassenanalyse',
        individual: 'Einzelanalyse'
    },
    coachSuggestion: {
      title: 'Coach-Vorschlag',
      description:
        'Generieren Sie einen personalisierten Vorschlag für diesen Schüler basierend auf seinem Profil und seiner Leistung.',
      button: 'Vorschlag erhalten',
      toastDeleted: 'Vorschlag erfolgreich gelöscht.',
      toastDeleteFailed: 'Fehler beim Löschen des Vorschlags.',
      deleteDialog: {
        title: 'Diesen Vorschlag löschen?',
        description: 'Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird der Coach-Vorschlag dauerhaft gelöscht.',
        confirm: 'Löschen',
      },
      noSuggestions: {
        title: 'Noch keine Vorschläge',
        description:
          'Generieren Sie den ersten Vorschlag für diesen Schüler, um zu beginnen.',
      },
    },
    supportPlan: {
      title: 'Unterstützungsplan',
      description:
        'Generieren Sie einen mehrstufigen, umsetzbaren Plan zur Unterstützung der Entwicklung dieses Schülers.',
      button: 'Neuen Plan generieren',
      generating: 'Plan wird generiert, bitte warten...',
      planGenerated: 'Plan generiert am {date}',
      feedbackTitle: "Feedback des Lehrers",
      feedbackPlaceholder:
        'Was hat funktioniert? Was nicht? Ihr Feedback hilft der KI zu lernen...',
      toastDeleted: 'Unterstützungsplan erfolgreich gelöscht.',
      toastDeleteFailed: 'Fehler beim Löschen des Unterstützungsplans.',
      noPlans: {
        title: 'Noch keine Unterstützungspläne',
        description:
          'Generieren Sie den ersten Unterstützungsplan für diesen Schüler, um zu beginnen.',
      },
      stepDialog: {
        title: 'Unterstützungsschritt bewerten',
        description: 'Wie ist dieser Schritt verlaufen?',
        status: 'Status',
        feedback: 'Feedback zum Schritt (optional)',
        feedbackPlaceholder: 'Fügen Sie eine Notiz zu diesem Schritt hinzu...',
        saveButton: 'Schrittbewertung speichern',
        statuses: {
          pending: 'Ausstehend',
          achieved: 'Erreicht',
          'partially-achieved': 'Teilweise erreicht',
          'not-achieved': 'Nicht erreicht',
          discarded: 'Verworfen',
        },
      },
      deleteDialog: {
        title: 'Sind Sie sicher, dass Sie diesen Plan löschen möchten?',
        description:
          'Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird der Unterstützungsplan dauerhaft gelöscht.',
        confirm: 'Löschen',
      },
    },
    moodAnalysis: {
      title: 'Stimmungstrendanalyse',
      descriptionStudent:
        'Analysieren Sie die Stimmung dieses Schülers bei verschiedenen Herausforderungen, um Muster zu finden.',
      descriptionClassroom:
        'Erhalten Sie eine klassenweite Analyse der Stimmungstrends, um die allgemeine Dynamik zu verbessern.',
      button: 'Trends analysieren',
      buttonClassroom: 'Klassentrends analysieren',
      analysisTitle: 'KI-gestützter Einblick',
      noAnalyses: {
        title: 'Noch keine Analysen',
        descriptionStudent:
          'Generieren Sie die erste Stimmungsanalyse für diesen Schüler, um zu beginnen.',
        descriptionClassroom:
          'Generieren Sie die erste Stimmungsanalyse für das Klassenzimmer, um zu beginnen.',
      },
       toastDeleted: 'Analyse erfolgreich gelöscht.',
       toastDeleteFailed: 'Fehler beim Löschen der Analyse.',
       deleteDialog: {
        title: 'Diese Analyse löschen?',
        description: 'Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird die generierte Analyse dauerhaft gelöscht.',
        confirm: 'Löschen',
      },
    },
    relationshipLab: {
      title: 'Labor für soziale Dynamik',
      description: 'Ein Raum zur Analyse und Verbesserung der Schülerbeziehungen.',
      button: 'Labor öffnen',
      tagline: 'Orchestrieren Sie positive soziale Interaktionen.',
      tabs: {
        multiStudent: 'Peer-to-Peer',
        singleStudent: 'Individuell',
      },
      form: {
        title: 'Generator für Beziehungsverbesserungsstrategien',
        description: 'Wählen Sie Schüler mit einer angespannten Beziehung aus, um einen individuellen Interventionsplan zu erhalten.',
        studentsLabel: 'Schüler auswählen (2-4)',
        studentsPlaceholder: 'Schüler auswählen...',
        focusLabel: 'Hauptziel / Zu stärkende Fähigkeit',
        focusPlaceholder: 'z.B. Kommunikation, Empathie, Zusammenarbeit...',
        customPromptLabel: 'Benutzerdefinierte Anweisung (Optional)',
        customPromptPlaceholder: 'z.B. Erstellen Sie eine nonverbale Aktivität, machen Sie es zu einem Spiel...',
        generateButton: 'Strategie generieren',
      },
      individual: {
          form: {
              title: 'Individueller Strategiegenerator',
              description: 'Wählen Sie einen einzelnen Schüler aus, um einen Plan zu erstellen, der ihm hilft, sich besser zu integrieren und Beziehungen aufzubauen.',
              studentsPlaceholder: 'Einen Schüler auswählen...',
              generateButton: 'Integrationsstrategie generieren'
          },
          history: {
              title: 'Individueller Strategieverlauf',
              description: 'Überprüfen Sie zuvor generierte Strategien für diesen Schüler.',
               prompt: {
                  title: 'Bereit zum Brückenbauen?',
                  description: 'Wählen Sie einen Schüler aus, um dessen Verlauf anzuzeigen oder eine neue soziale Integrationsstrategie zu generieren.',
              },
          },
          toastSuccess: 'Integrationsstrategie generiert!',
          toastDeleteSuccess: 'Strategie erfolgreich gelöscht.',
          toastDeleteFailed: 'Fehler beim Löschen der Strategie.',
          deleteDialog: {
              title: 'Diese Strategie löschen?',
              description: 'Diese Aktion kann nicht rückgängig gemacht werden und löscht die Strategie dauerhaft.',
              confirm: 'Löschen'
          }
      },
      suggestions: {
          button: 'Mit KI vorschlagen',
          toastSuccess: 'Vorschlag wurde in das Formular übernommen!'
      },
       studentInfo: {
          title: "Profil der ausgewählten Schüler",
          qualities: 'Qualitäten',
          fears: 'Ängste',
          none: 'Keine aufgeführt',
      },
      history: {
        title: 'Strategieverlauf',
        description: 'Überprüfen Sie zuvor generierte Strategien für die ausgewählten Schüler.',
        header: 'Strategie für {focus}',
        statusLabel: 'Strategiestatus',
        statusPlaceholder: 'Status festlegen...',
        feedbackLabel: 'Feedback des Lehrers',
        feedbackPlaceholder: 'Wie hat diese Strategie in der Praxis funktioniert?',
        saveFeedbackButton: 'Bewertung speichern',
        toastUpdateSuccess: 'Strategie erfolgreich aktualisiert!',
        toastUpdateFailed: 'Fehler beim Aktualisieren der Strategie.',
        prompt: {
            title: 'Bereit zur Vermittlung?',
            description: 'Wählen Sie mindestens zwei Schüler im Formular aus, um deren Verlauf anzuzeigen oder eine neue Strategie zu generieren.',
        },
        noResults: {
            title: 'Noch keine Strategien',
            description: 'Generieren Sie die erste Strategie für diese Schülergruppe.',
        },
         stepDialog: {
            title: 'Verbesserungsschritt bewerten',
            description: 'Wie ist dieser Schritt verlaufen?',
            status: 'Status',
            feedback: 'Feedback zum Schritt (optional)',
            feedbackPlaceholder: 'Fügen Sie eine Notiz zu diesem Schritt hinzu...',
            saveButton: 'Bewertung speichern',
            statuses: {
                pending: 'Ausstehend',
                completed: 'Abgeschlossen',
                skipped: 'Übersprungen',
            },
        },
      },
      details: {
          title: "Strategiedetails für '{focus}'",
          adjustTitle: "Strategie anpassen",
          adjustPlaceholder: "z.B. einfacher machen, eine Zeichenkomponente hinzufügen, sich mehr auf nonverbale Hinweise konzentrieren...",
          adjustButton: "Angepasste Strategie generieren",
      },
      status: {
        'not_started': 'Nicht begonnen',
        'in_progress': 'In Bearbeitung',
        'successful': 'Erfolgreich',
        'partially_successful': 'Teilweise erfolgreich',
        'did_not_work': 'Hat nicht funktioniert',
        'needs_adjustment': 'Muss angepasst werden',
      },
      toastSuccess: 'Verbesserungsstrategie generiert!',
    },
    qualitiesSuggestion: {
      title: 'Qualitätenvorschlag',
      description: 'Entdecken Sie aufkommende Qualitäten basierend auf der Schülerleistung.',
      button: 'Qualitäten entdecken',
      suggestionText:
        'Basierend auf der jüngsten Leistung schlägt die KI die folgenden Qualitäten vor:',
      noSuggestions: {
        title: 'Noch keine Qualitätsvorschläge',
        description:
          'Generieren Sie den ersten Qualitätsvorschlag für diesen Schüler, um zu beginnen.',
      },
      dialog: {
        title: 'Neue Qualitätsvorschläge für {name}',
        description:
          'Basierend auf der jüngsten Leistung, hier sind einige Qualitäten, die Sie hinzufügen könnten:',
        accept: 'Akzeptieren',
        reject: 'Ablehnen',
        confirmation: 'Wie möchten Sie die Qualitäten aktualisieren?',
        add: 'Als neue hinzufügen',
        replace: 'Bestehende ersetzen',
        confirm: 'Update bestätigen',
      },
    },
    concernAnalysis: {
      title: 'Analyse von Sorgenmustern',
      description:
        'Die KI analysiert die gesamte Historie des Schülers auf wiederkehrende negative Muster.',
      button: 'Sorgen analysieren',
      noAnalyses: {
        title: 'Keine Sorgenmuster erkannt',
        description:
          'Generieren Sie eine Analyse, um nach potenziellen wiederkehrenden Problemen zu suchen.',
      },
    },
    fearManagement: {
      title: 'Vorschläge zur Angstbewältigung',
      description: 'Generieren Sie empathische Strategien, um einem Schüler bei seinen Ängsten zu helfen.',
      button: 'Strategie erhalten',
      strategyFor: 'Strategie für:',
      feedbackTitle: 'Wie ist es gelaufen?',
      feedbackPlaceholder: 'Ihr Feedback hilft der KI zu lernen und sich zu verbessern...',
      toastFearUpdated: 'Schüler-Angstprofil aktualisiert!',
      toastFearUpdateFailed: 'Fehler beim Aktualisieren der Schülerängste.',
      toastDeleted: 'Vorschlag erfolgreich gelöscht.',
      toastDeleteFailed: 'Fehler beim Löschen des Vorschlags.',
      noSuggestions: {
        title: 'Noch keine Strategien',
        description: 'Generieren Sie eine Strategie, um diesem Schüler zu helfen, seine Ängste zu bewältigen.',
        noFears: 'Dieser Schüler hat keine Ängste aufgelistet. Fügen Sie Ängste zu seinem Profil hinzu, um Vorschläge zu erhalten.',
      },
      updateDialog: {
        title: 'Schülerprofil aktualisieren?',
        confirm: 'Ja, Profil aktualisieren',
      },
      deleteDialog: {
        title: 'Diesen Vorschlag löschen?',
        description: 'Diese Aktion kann nicht rückgängig gemacht werden.',
        confirm: 'Löschen',
      },
      dialog: {
        title: 'Umgang mit der Angst vor {fear}',
        description: 'Überprüfen Sie bestehende Strategien oder generieren Sie eine neue für {name}.',
        generateButton: 'Neuen Vorschlag generieren',
        noSuggestions: {
            title: 'Noch keine Strategien',
            description: 'Generieren Sie den ersten KI-Vorschlag, um diese Angst anzugehen.'
        }
      }
    }
} as const;