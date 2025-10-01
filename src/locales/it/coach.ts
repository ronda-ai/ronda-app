export default {
    title: 'Coach AI',
    tagline: 'Ottieni spunti e suggerimenti basati sull\'IA.',
    noStudentSelected: {
      title: 'Seleziona uno Studente',
      description:
        'Scegli uno studente dalla lista per visualizzare la sua analisi e ricevere suggerimenti.',
    },
    tabs: {
        classroom: 'Analisi di Classe',
        individual: 'Analisi Individuale'
    },
    coachSuggestion: {
      title: 'Suggerimento del Coach',
      description:
        'Genera un suggerimento personalizzato per questo studente basato sul suo profilo e rendimento.',
      button: 'Ottieni Suggerimento',
      toastDeleted: 'Suggerimento eliminato con successo.',
      toastDeleteFailed: 'Impossibile eliminare il suggerimento.',
      deleteDialog: {
        title: 'Eliminare questo suggerimento?',
        description: 'Questa azione non può essere annullata. Eliminerà permanentemente il suggerimento del coach.',
        confirm: 'Elimina',
      },
      noSuggestions: {
        title: 'Ancora Nessun Suggerimento',
        description:
          'Genera il primo suggerimento per questo studente per iniziare.',
      },
    },
    supportPlan: {
      title: 'Piano di Supporto',
      description:
        "Genera un piano d'azione multi-step per sostenere lo sviluppo di questo studente.",
      button: 'Genera Nuovo Piano',
      generating: 'Generazione del piano in corso, attendere prego...',
      planGenerated: 'Piano generato il {date}',
      feedbackTitle: "Feedback dell'insegnante",
      feedbackPlaceholder:
        'Cosa ha funzionato? Cosa no? Il tuo feedback aiuta l\'IA a imparare...',
      toastDeleted: 'Piano di supporto eliminato con successo.',
      toastDeleteFailed: 'Impossibile eliminare il piano di supporto.',
      noPlans: {
        title: 'Ancora Nessun Piano di Supporto',
        description:
          'Genera il primo piano di supporto per questo studente per iniziare.',
      },
      stepDialog: {
        title: 'Valuta Passo del Supporto',
        description: 'Come è andato questo passo?',
        status: 'Stato',
        feedback: 'Feedback sul passo (opzionale)',
        feedbackPlaceholder: 'Aggiungi una nota su questo passo...',
        saveButton: 'Salva Valutazione Passo',
        statuses: {
          pending: 'In attesa',
          achieved: 'Raggiunto',
          'partially-achieved': 'Parzialmente Raggiunto',
          'not-achieved': 'Non Raggiunto',
          discarded: 'Scartato',
        },
      },
      deleteDialog: {
        title: 'Sei sicuro di voler eliminare questo piano?',
        description:
          'Questa azione non può essere annullata. Eliminerà permanentemente il piano di supporto.',
        confirm: 'Elimina',
      },
    },
    moodAnalysis: {
      title: 'Analisi dell\'Umore',
      descriptionStudent:
        "Analizza l'umore di questo studente nelle diverse sfide per trovare schemi.",
      descriptionClassroom:
        'Ottieni un\'analisi a livello di classe sulle tendenze dell\'umore per migliorare la dinamica generale.',
      button: 'Analizza Tendenze',
      buttonClassroom: 'Analizza Tendenze Classe',
      analysisTitle: 'Approfondimento AI',
      noAnalyses: {
        title: 'Ancora Nessuna Analisi',
        descriptionStudent:
          'Genera la prima analisi dell\'umore per questo studente per iniziare.',
        descriptionClassroom:
          'Genera la prima analisi dell\'umore per la classe per iniziare.',
      },
       toastDeleted: 'Analisi eliminata con successo.',
       toastDeleteFailed: 'Impossibile eliminare l\'analisi.',
       deleteDialog: {
        title: 'Eliminare questa analisi?',
        description: 'Questa azione non può essere annullata. Eliminerà permanentemente l\'analisi generata.',
        confirm: 'Elimina',
      },
    },
    relationshipLab: {
      title: 'Laboratorio di Dinamiche Sociali',
      description: 'Uno spazio per analizzare e migliorare le relazioni tra gli studenti.',
      button: 'Apri Laboratorio',
      tagline: 'Orchestra interazioni sociali positive.',
      tabs: {
        multiStudent: 'Tra Pari',
        singleStudent: 'Individuale',
      },
      form: {
        title: 'Generatore di Strategie di Mediazione Relazionale',
        description: 'Seleziona studenti con una relazione tesa per ricevere un piano di intervento personalizzato.',
        studentsLabel: 'Seleziona Studenti (2-4)',
        studentsPlaceholder: 'Seleziona studenti...',
        focusLabel: 'Obiettivo Principale / Abilità da Rinforzare',
        focusPlaceholder: 'es. Comunicazione, Empatia, Collaborazione...',
        customPromptLabel: 'Prompt Personalizzato (Opzionale)',
        customPromptPlaceholder: 'es. Crea un\'attività non verbale, rendila un gioco...',
        generateButton: 'Genera Strategia',
      },
      individual: {
          form: {
              title: 'Generatore di Strategie Individuali',
              description: 'Seleziona un singolo studente per generare un piano che lo aiuti a integrarsi e a relazionarsi meglio con la classe.',
              studentsPlaceholder: 'Seleziona uno studente...',
              generateButton: 'Genera Strategia di Integrazione'
          },
          history: {
              title: 'Cronologia Strategie Individuali',
              description: 'Rivedi le strategie generate in precedenza per questo studente.',
               prompt: {
                  title: 'Pronto a Costruire Ponti?',
                  description: 'Seleziona uno studente per visualizzare la sua cronologia o generare una nuova strategia di integrazione sociale.',
              },
          },
          toastSuccess: 'Strategia di integrazione generata!',
          toastDeleteSuccess: 'Strategia eliminata con successo.',
          toastDeleteFailed: 'Impossibile eliminare la strategia.',
          deleteDialog: {
              title: 'Eliminare questa strategia?',
              description: 'Questa azione non può essere annullata ed eliminerà permanentemente la strategia.',
              confirm: 'Elimina'
          }
      },
      suggestions: {
          button: 'Suggerisci con l\'IA',
          toastSuccess: 'Suggerimento inserito nel modulo!'
      },
       studentInfo: {
          title: "Profilo degli Studenti Selezionati",
          qualities: 'Qualità',
          fears: 'Paure',
          none: 'Nessuna elencata',
      },
      history: {
        title: 'Cronologia Strategie',
        description: 'Rivedi le strategie generate in precedenza per gli studenti selezionati.',
        header: 'Strategia per {focus}',
        statusLabel: 'Stato Strategia',
        statusPlaceholder: 'Imposta stato...',
        feedbackLabel: 'Feedback dell\'Insegnante',
        feedbackPlaceholder: 'Come ha funzionato questa strategia in pratica?',
        saveFeedbackButton: 'Salva Valutazione',
        toastUpdateSuccess: 'Strategia aggiornata con successo!',
        toastUpdateFailed: 'Impossibile aggiornare la strategia.',
        prompt: {
            title: 'Pronto a Mediare?',
            description: 'Seleziona almeno due studenti nel modulo per visualizzare la loro cronologia o generare una nuova strategia.',
        },
        noResults: {
            title: 'Ancora Nessuna Strategia',
            description: 'Genera la prima strategia per questo gruppo di studenti.',
        },
         stepDialog: {
            title: 'Valuta Passo di Mediazione',
            description: 'Come è andato questo passo?',
            status: 'Stato',
            feedback: 'Feedback sul Passo (opzionale)',
            feedbackPlaceholder: 'Aggiungi una nota su questo passo...',
            saveButton: 'Salva Valutazione',
            statuses: {
                pending: 'In attesa',
                completed: 'Completato',
                skipped: 'Saltato',
            },
        },
      },
      details: {
          title: "Dettagli della Strategia per '{focus}'",
          adjustTitle: "Adatta Strategia",
          adjustPlaceholder: "es. Rendila più semplice, aggiungi una componente di disegno, concentrati di più sugli indizi non verbali...",
          adjustButton: "Genera Strategia Adattata",
      },
      status: {
        'not_started': 'Non Iniziata',
        'in_progress': 'In Corso',
        'successful': 'Riuscita',
        'partially_successful': 'Parzialmente Riuscita',
        'did_not_work': 'Non Ha Funzionato',
        'needs_adjustment': 'Necessita di Modifiche',
      },
      toastSuccess: 'Strategia di mediazione generata!',
    },
    qualitiesSuggestion: {
      title: 'Suggerimento Qualità',
      description: 'Scopri le qualità emergenti basate sul rendimento degli studenti.',
      button: 'Scopri Qualità',
      suggestionText:
        'Basandosi sul rendimento recente, l\'IA suggerisce le seguenti qualità:',
      noSuggestions: {
        title: 'Ancora Nessun Suggerimento di Qualità',
        description:
          'Genera il primo suggerimento di qualità per questo studente per iniziare.',
      },
      dialog: {
        title: 'Nuovi Suggerimenti di Qualità per {name}',
        description:
          'Basandosi sul rendimento recente, ecco alcune qualità che potresti considerare di aggiungere:',
        accept: 'Accetta',
        reject: 'Rifiuta',
        confirmation: 'Come vorresti aggiornare le qualità?',
        add: 'Aggiungi come Nuove',
        replace: 'Sostituisci Esistenti',
        confirm: 'Conferma Aggiornamento',
      },
    },
    concernAnalysis: {
      title: 'Analisi dei Modelli di Preoccupazione',
      description:
        "L'IA analizzerà l'intera cronologia dello studente alla ricerca di schemi negativi ricorrenti.",
      button: 'Analizza Preoccupazioni',
      noAnalyses: {
        title: 'Nessun Modello di Preoccupazione Rilevato',
        description:
          'Genera un\'analisi per verificare la presenza di potenziali problemi ricorrenti.',
      },
    },
    fearManagement: {
      title: 'Suggerimenti per la Gestione della Paura',
      description: 'Genera strategie empatiche per aiutare uno studente con le sue paure.',
      button: 'Ottieni Strategia',
      strategyFor: 'Strategia per:',
      feedbackTitle: 'Come è andata?',
      feedbackPlaceholder: 'Il tuo feedback aiuta l\'IA a imparare e migliorare...',
      toastFearUpdated: 'Profilo delle paure dello studente aggiornato!',
      toastFearUpdateFailed: 'Impossibile aggiornare le paure dello studente.',
      toastDeleted: 'Suggerimento eliminato con successo.',
      toastDeleteFailed: 'Impossibile eliminare il suggerimento.',
      noSuggestions: {
        title: 'Ancora Nessuna Strategia',
        description: 'Genera una strategia per aiutare questo studente a gestire le sue paure.',
        noFears: 'Questo studente non ha paure elencate. Aggiungi paure al suo profilo per ottenere suggerimenti.',
      },
      updateDialog: {
        title: 'Aggiornare il Profilo dello Studente?',
        confirm: 'Sì, aggiorna profilo',
      },
      deleteDialog: {
        title: 'Eliminare questo suggerimento?',
        description: 'Questa azione non può essere annullata.',
        confirm: 'Elimina',
      },
      dialog: {
        title: 'Gestire la Paura di {fear}',
        description: 'Rivedi le strategie esistenti o generane una nuova per {name}.',
        generateButton: 'Genera Nuovo Suggerimento',
        noSuggestions: {
            title: 'Ancora nessuna strategia',
            description: 'Genera il primo suggerimento AI per affrontare questa paura.'
        }
      }
    }
} as const;