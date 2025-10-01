

export default {
    title: 'Terrain de jeu',
    tagline: 'Participez à des jeux amusants et éducatifs avec l\'IA.',
    riddleBattle: {
        title: 'Bataille de devinettes',
        description: 'Générez une paire de devinettes que deux équipes devront résoudre. Qui sera le plus rapide ?',
        topicLabel: 'Sujet de la devinette (facultatif)',
        topicPlaceholder: 'ex., Animaux, Espace, Histoire',
        button: 'Commencer une nouvelle bataille',
        battleTitle: 'Bataille de devinettes !',
        topic: 'Sujet',
        teamBlue: 'Équipe bleue',
        teamRed: 'Équipe rouge',
        showAnswer: 'Afficher la réponse',
        hideAnswer: 'Masquer la réponse',
        toastDeleted: 'Bataille supprimée.',
        toastDeleteFailed: 'Échec de la suppression de la bataille.',
        toastEvaluationSaved: 'Évaluation enregistrée.',
        toastEvaluationFailed: 'Échec de l\'enregistrement de l\'évaluation.',
        noBattles: {
            title: 'Prêt pour un défi ?',
            description: 'Cliquez sur le bouton ci-dessus pour commencer la première bataille de devinettes.',
        },
        deleteDialog: {
            title: 'Supprimer cette bataille ?',
            description: 'Cette action est permanente et ne peut pas être annulée.',
        },
        evaluation: {
            title: 'Évaluation',
            winner: 'Gagnant',
            winnerLabel: 'Déclarer le gagnant',
            winnerPlaceholder: 'Sélectionner un gagnant...',
            tie: 'Égalité',
            moodLabel: 'Ambiance de la compétition',
            moodPlaceholder: 'Sélectionner l\'ambiance...',
            feedbackLabel: 'Commentaires',
            feedbackPlaceholder: 'Comment s\'est déroulé le jeu ? Était-ce équitable ?',
            moods: {
                competitive: 'Compétitive',
                fun: 'Amusante',
                collaborative: 'Collaborative',
                tense: 'Tendue',
                relaxed: 'Détendue',
            },
            confirm: 'Confirmer'
        }
    },
    lightningRound: {
        title: 'Tour éclair',
        description: 'Un jeu rapide avec des défis amusants pour dynamiser la classe.',
        durationLabel: 'Durée du tour (secondes)',
        intervalLabel: 'Intervalle des défis (secondes)',
        categoryLabel: 'Catégorie de défi',
        start: 'Commencer le tour éclair !',
        pause: 'Pause',
        resume: 'Reprendre',
        reset: 'Réinitialiser',
        noStudentsError: 'Au moins 2 élèves présents sont nécessaires pour jouer.',
        toastDeleted: 'Tour supprimé.',
        toastDeleteFailed: 'Échec de la suppression du tour.',
        categories: {
            sound: 'Sons',
            face: 'Visages',
            gesture: 'Gestes',
            imitation: 'Imitations',
        },
        gameScreen: {
            yourTurn: 'à ton tour !',
        },
        history: {
            title: 'Historique des tours',
            description: 'Examinez les tours précédemment générés.',
            roundFor: 'Tour du {date}',
            noRounds: 'Aucun tour joué pour le moment.',
        },
        deleteDialog: {
            title: 'Supprimer ce tour ?',
            description: 'Cette action est permanente et ne peut pas être annulée.',
        },
    },
    collaborativeStory: {
        title: 'Histoire collaborative',
        setup: {
            title: 'Commencer une nouvelle histoire',
            description: 'Définissez les personnages et le décor pour commencer votre aventure.',
            charactersLabel: 'Personnages principaux',
            charactersPlaceholder: 'ex., Un chevalier courageux, un dragon malin',
            settingLabel: 'Décor initial',
            settingPlaceholder: 'ex., Une grotte sombre et effrayante',
            lengthLabel: 'Longueur du chapitre',
            lengths: {
                short: 'Court',
                medium: 'Moyen',
                long: 'Long',
            },
            startButton: 'Commencer l\'histoire',
            allowDialogues: 'Autoriser les dialogues dans l\'histoire',
            narratorVoiceLabel: "Voix du narrateur",
            narratorVoicePlaceholder: "Sélectionnez une voix...",
            customPromptLabel: "Instruction personnalisée (facultatif)",
            customPromptPlaceholder: "ex. L'histoire doit être une comédie, ne doit pas contenir de violence...",
            negativePromptLabel: "Instruction négative (facultatif)",
            negativePromptPlaceholder: "ex. Éviter les fins tristes, ne pas mentionner les araignées...",
        },
        contribute: {
            title: 'Que se passe-t-il ensuite ?',
            description: 'Ajoutez les idées des élèves pour le prochain chapitre.',
            placeholder: 'Écrivez une idée d\'élève et appuyez sur Entrée...',
            continueButton: 'Continuer l\'histoire',
            suggestionButton: 'Suggestion de l\'IA'
        },
        story: {
            titlePlaceholder: 'L\'histoire apparaîtra ici',
            storyPlaceholder: 'Commencez par définir vos personnages et votre décor, puis lancez l\'histoire !',
        },
        history: {
            title: 'Historique des histoires',
            createdAt: 'Créée le',
            noStories: 'Aucune histoire pour le moment.',
        },
        deleteDialog: {
            title: 'Supprimer cette histoire ?',
            description: 'Cette action est permanente et ne peut pas être annulée.',
        },
        toastDeleted: 'Histoire supprimée.',
        toastDeleteFailed: 'Échec de la suppression de l\'histoire.',
        toastNarrationSuccess: 'La narration complète de l\'histoire est en cours de génération et apparaîtra sous peu.',
        newStoryButton: 'Commencer une nouvelle histoire',
        narrateButton: 'Narrer le chapitre',
        'narrateButton--loading': 'Narration...',
        narrateFullStoryButton: 'Narrer comme un livre audio',
        suggestions: {
            button: 'Suggérer avec l\'IA',
            toastSuccess: 'Idées suggérées !'
        },
        finishButton: 'Terminer l\'histoire',
        test: {
            createButton: 'Créer un test à partir de l\'histoire',
            modalTitle: 'Générer un test',
            modalDescription: 'Sélectionnez le type de test que vous souhaitez générer à partir de cette histoire.',
            typeLabel: 'Type de test',
            types: {
                title: 'Type de test',
                'multiple-choice': 'Choix multiples',
                'true-false': 'Vrai ou Faux',
                'open-ended': 'Questions ouvertes',
                'mixed': 'Mixte',
            },
            generateButton: 'Générer le test',
            generateError: 'Échec de la génération du test.',
            saveSuccess: 'Test enregistré avec succès !',
            saveError: 'Échec de l\'enregistrement du test.',
            previewTitle: 'Aperçu du test généré',
            previewDescription: 'Examinez le test généré. Il a déjà été enregistré et peut être consulté sur la page Tests.',
            rubricTitle: 'Grille d\'évaluation',
            saveButton: 'Enregistrer le test',
        },
        illustrateButton: 'Illustrer',
    },
    debateGenerator: {
        title: 'Générateur de débats',
        description: 'Générez des scénarios de débat éducatifs pour encourager la pensée critique.',
        topicLabel: 'Sujet du débat',
        topicPlaceholder: 'ex. Les animaux devraient-ils être gardés dans des zoos ?',
        complexityLabel: 'Complexité',
        complexities: {
            beginner: 'Débutant',
            intermediate: 'Intermédiaire',
            advanced: 'Avancé'
        },
        button: 'Générer un nouveau débat',
        noDebates: {
            title: 'Prêt à argumenter ?',
            description: 'Entrez un sujet et une complexité pour générer votre premier scénario de débat.',
        },
        affirmativeStance: 'Position affirmative',
        negativeStance: 'Position négative',
        guidingQuestions: 'Questions directrices',
        rules: 'Règles du débat',
        toastDeleted: 'Débat supprimé.',
        toastDeleteFailed: 'Échec de la suppression du débat.',
        deleteDialog: {
            title: 'Supprimer ce débat ?',
            description: 'Cette action est permanente et ne peut pas être annulée.',
        },
        startSession: "Démarrer la session en direct",
        manageSession: "Gérer la session",
        turnStructureTitle: "Structure des tours du débat",
        currentTurn: "Tour actuel",
        notStarted: "Le débat n'a pas commencé",
        paused: "Débat en pause",
        start: "Commencer le débat",
        nextTurn: "Tour suivant",
        pause: "Pause",
        resume: "Reprendre",
        liveSession: {
            title: "Session de débat en cours",
            description: "Partagez ce code QR ou ce lien avec vos élèves pour commencer le débat.",
            qrCode: "Code QR",
            link: "Lien direct",
            copy: "Copier",
            copied: "Copié !",
            studentsConnected: "Élèves connectés",
            noStudentsYet: "Aucun élève ne s'est encore connecté.",
            affirmative: 'Pour',
            negative: 'Contre',
            unassigned: 'Non assigné',
            both: 'Les deux',
            teacher: 'Professeur',
            closeSession: "Fermer la session",
            sessionClosed: "La session a été fermée."
        }
    },
    digitalConviviality: {
        title: 'Citoyenneté Numérique',
        description: 'Outils pour encourager un comportement en ligne positif et responsable.',
        activities: {
            title: 'Activités',
            description: 'Générez une activité pour pratiquer les compétences de citoyenneté numérique.',
        },
        conflictSimulation: {
            title: 'Simulation de Conflits',
            description: 'Pratiquez la gestion de situations en ligne difficiles en générant un scénario de conflit hypothétique.',
            topicsLabel: 'Sujets de Conflit (facultatif)',
            topicsPlaceholder: 'ex. cyberintimidation, désinformation, plagiat',
            button: 'Générer un scénario',
            scenarioTitle: 'Scénario Généré',
            strategiesTitle: 'Stratégies d\'Intervention',
            strategyLabel: 'Stratégie',
            outcomeLabel: 'Résultat Simulé',
            noScenario: {
                title: 'Prêt à pratiquer ?',
                description: 'Générez un scénario pour pratiquer vos compétences en résolution de conflits.',
            },
            deleteDialog: {
                title: 'Supprimer ce scénario ?',
                description: 'Cela supprimera définitivement ce scénario de conflit de votre historique.',
                confirm: 'Supprimer',
            },
            history: {
                title: 'Historique des scénarios'
            }
        },
        pact: {
            title: 'Pacte Numérique',
            description: 'Générez de manière collaborative un ensemble de règles de classe pour une interaction numérique saine.',
            studentCountLabel: 'Nombre d\'élèves',
            mainConcernsLabel: 'Principales préoccupations (facultatif)',
            mainConcernsPlaceholder: 'ex. utilisation des réseaux sociaux, respect de la vie privée',
            button: 'Générer une ébauche de pacte',
            saveDraftButton: 'Enregistrer le brouillon',
            publishButton: 'Publier',
            republishButton: 'Republier',
            publishedAt: 'Publié le {date} (v{version})',
            noPacts: {
                title: 'Prêt à conclure un pacte ?',
                description: 'Définissez les paramètres de votre classe et générez une ébauche de votre pacte de convivencia numérique.'
            },
            deleteDialog: {
                title: 'Supprimer ce pacte ?',
                description: 'Cela supprimera définitivement le pacte généré.',
                confirm: 'Supprimer'
            },
            history: {
                title: 'Historique des pactes',
                principles: 'Principes directeurs',
                norms: 'Normes spécifiques',
                consequences: 'Conséquences réparatrices',
                level: 'Niveau',
                restorativeAction: 'Action réparatrice'
            }
        },
        typeLabel: 'Type d\'activité',
        typePlaceholder: 'Sélectionnez un type...',
        types: {
            'netiquette-challenge': 'Défi de nétiquette',
            'digital-collaboration': 'Jeu de collaboration numérique',
            'positive-messaging': 'Réécrivain de messages positifs'
        },
        customPromptLabel: 'Focus spécifique (facultatif)',
        customPromptPlaceholder: 'ex. Se concentrer sur les commentaires des réseaux sociaux...',
        button: 'Générer une activité',
        history: {
            title: 'Historique des activités',
            studentInstructions: 'Instructions pour les élèves',
            pedagogicalObjectives: 'Objectifs Pédagogiques',
            materials: 'Matériaux',
            noMaterials: 'Aucun matériel fourni.',
            steps: 'Étapes',
        },
        noActivities: {
            title: 'Prêt à promouvoir de bonnes habitudes numériques ?',
            description: 'Sélectionnez un type d\'activité ci-dessus pour générer votre premier exercice de citoyenneté numérique.'
        },
        deleteDialog: {
            title: 'Supprimer cette activité ?',
            description: 'Cette action est permanente et ne peut pas être annulée.',
            confirm: 'Supprimer'
        }
    },
    suggestions: {
        button: 'Suggérer avec l\'IA',
        toastSuccess: 'Sujet suggéré !'
    }
} as const;
