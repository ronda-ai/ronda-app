
export default {
      title: 'Supporto Linguistico',
      tagline: 'Genera materiali bilingue per supportare l\'inclusione linguistica.',
      form: {
          title: 'Assistente per l\'Inclusione Linguistica',
          description: 'Seleziona uno studente e specifica la sua lingua per generare materiali di supporto personalizzati.',
          studentLabel: 'Studente',
          studentPlaceholder: 'Seleziona uno studente...',
          languageLabel: "Lingua Madre dello Studente",
          languagePlaceholder: 'es. Spagnolo, Francese, Mandarino',
          focusAreasLabel: 'Aree di Interesse',
          generateButton: 'Genera Materiale di Supporto',
      },
      focusAreas: {
          reading: 'Comprensione della Lettura',
          writing: 'Competenze di Scrittura',
          speaking: 'Espressione Orale',
          listening: 'Comprensione Orale',
          'social-emotional': 'Integrazione Socio-Emotiva',
      },
      addFocusAreaDialog: {
        title: 'Aggiungi Nuove Aree di Interesse',
        description: 'Seleziona dai suggerimenti dell\'IA o aggiungi le tue aree di interesse alla lista.',
        customPromptLabel: 'Guida l\'IA (Opzionale)',
        customPromptPlaceholder: 'es. Concentrati sulle aree di ascolto...',
        manualAreaLabel: 'O Aggiungi un\'Area Manualmente',
        manualAreaPlaceholder: 'Digita una nuova area...',
        noSuggestions: 'Nessun suggerimento disponibile. Prova ad aggiornare o cambiare il tuo prompt.',
        add: 'Aggiungi:',
        addSelected: 'Aggiungi Selezionati',
        toastSuccess: 'Aree di interesse aggiunte con successo!',
        toastError: 'Impossibile aggiungere le aree di interesse.',
      },
      editFocusAreaDialog: {
        title: 'Modifica Area di Interesse: {name}',
        areaNameLabel: 'Nome dell\'Area di Interesse',
        deleteButton: 'Elimina Area',
        toastUpdateSuccess: 'Area di interesse aggiornata con successo!',
        toastUpdateError: 'Impossibile aggiornare l\'area di interesse.',
        toastDeleteSuccess: 'Area di interesse eliminata con successo!',
        toastDeleteError: 'Impossibile eliminare l\'area di interesse.',
        deleteDialog: {
            title: 'Sei sicuro?',
            description: 'Questo eliminerà permanentemente l\'area di interesse "{name}" dalla lista.',
            cancel: 'Annulla',
            confirm: 'Elimina'
        }
      },
      generatingTitle: 'Generazione Materiale di Supporto...',
      history: {
          title: 'Cronologia Materiali Generati',
          description: 'Rivedi i materiali generati in precedenza per lo studente selezionato.',
          selectStudentPrompt: {
            title: 'Seleziona uno Studente',
            description: 'Scegli uno studente dal modulo per visualizzare la sua cronologia e generare nuovi materiali.',
          },
          noResults: {
              title: 'Ancora Nessun Materiale',
              description: 'Usa il modulo per generare il primo materiale di supporto per questo studente.',
          },
          header: 'Materiale per {language}',
          teacherGuide: 'Guida per l\'Insegnante',
          studentMaterial: 'Materiale per lo Studente',
          feedbackTitle: "Feedback dell'Insegnante",
          feedbackPlaceholder: 'Questo materiale è stato utile? Il tuo feedback aiuta a migliorare i suggerimenti futuri.',
          toastDeleted: 'Materiale di supporto eliminato.',
          toastDeleteFailed: 'Impossibile eliminare il materiale di supporto.',
          deleteDialog: {
            title: 'Eliminare questo materiale?',
            description: 'Questa azione non può essere annullata. Eliminerà permanentemente il materiale di supporto generato.',
          },
          translationTitle: "Traduzione per {language}",
          showTranslation: "Mostra Traduzione",
          hideTranslation: "Nascondi Traduzione",
      }
} as const;
