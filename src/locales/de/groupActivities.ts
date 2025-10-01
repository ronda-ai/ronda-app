
export default {
    title: 'Gruppenaktivitäten',
    tagline: 'Bilden Sie intelligent Gruppen und generieren Sie kollaborative Aktivitäten.',
    generator: {
      title: 'Gruppenvorschlagsgenerator',
      description: 'Die KI analysiert Ihre Klasse, um ausgewogene Gruppen und einen Moderationstipp vorzuschlagen.',
      button: 'Neue Vorschläge generieren',
    },
    manualMode: {
        title: 'Manueller Gruppen-Ersteller',
        description: 'Erstellen Sie Ihre eigenen Gruppen und erhalten Sie KI-gestützte Unterstützung.',
        selectLabel: 'Schüler für eine neue Gruppe auswählen',
        selectPlaceholder: 'Schüler auswählen...',
        createGroupButton: 'Gruppe erstellen',
        groupTitle: 'Neue Gruppe',
        analyzeButton: 'Dynamik analysieren',
        generateActivityButton: 'Aktivität generieren',
        warningTitle: 'Beziehungswarnung',
        conflictWarning: '{nameA} und {nameB} haben einen registrierten Konflikt. Seien Sie vorsichtig.',
        skillsLabel: 'Zu entwickelnde kollaborative Fähigkeiten',
        skillsPlaceholder: 'z.B. Kommunikation, Führung',
        themesLabel: 'Aktivitätsthema (Optional)',
        themesPlaceholder: 'z.B. Weltraummission, Rätsel lösen',
        activityGeneratedToast: 'Aktivität erfolgreich generiert!',
    },
    aiSuggestions: {
        title: 'KI-generierte Vorschläge',
    },
    history: {
      title: 'Vorschlagsverlauf',
      description: 'Überprüfen Sie zuvor generierte Gruppenvorschläge.',
      suggestionFor: 'Vorschlag von {date}',
      teacherTipTitle: 'Moderatorentipp',
      suggestedGroups: 'Vorgeschlagene Gruppen',
      group: 'Gruppe',
      suggestedSkills: 'Vorgeschlagene kollaborative Fähigkeiten',
      suggestedThemes: 'Vorgeschlagene Aktivitätsthemen',
      useSuggestionButton: 'Diesen Vorschlag verwenden',
      suggestionUsedToast: 'Vorschlag auf den manuellen Gruppen-Ersteller angewendet!',
      noResults: {
        title: 'Bereit zur Zusammenarbeit?',
        description: 'Klicken Sie auf die Schaltfläche oben, um die erste Reihe von Gruppenvorschlägen für Ihre Klasse zu generieren.',
      },
      toastDeleted: 'Vorschlag gelöscht.',
      toastDeleteFailed: 'Fehler beim Löschen des Vorschlags.',
      deleteDialog: {
        title: 'Diesen Vorschlag löschen?',
        description: 'Diese Aktion ist permanent und kann nicht rückgängig gemacht werden.',
      },
    },
    viewActivitiesButton: 'Generierte Aktivitäten anzeigen',
    details: {
        title: 'Generierte Aktivitäten für die Gruppe',
        description: 'Folgende Aktivitäten wurden für {members} generiert.',
        deleteButton: 'Aktivitätsplan löschen',
    }
} as const;
