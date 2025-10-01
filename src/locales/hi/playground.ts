

export default {
    title: 'खेल का मैदान',
    tagline: 'AI के साथ मजेदार और शैक्षिक खेलों में शामिल हों।',
    riddleBattle: {
        title: 'पहेली लड़ाई',
        description: 'दो टीमों को हल करने के लिए पहेलियों की एक जोड़ी उत्पन्न करें। कौन तेज होगा?',
        topicLabel: 'पहेली विषय (वैकल्पिक)',
        topicPlaceholder: 'जैसे, जानवर, अंतरिक्ष, इतिहास',
        button: 'नई लड़ाई शुरू करें',
        battleTitle: 'पहेली लड़ाई!',
        topic: 'विषय',
        teamBlue: 'नीली टीम',
        teamRed: 'लाल टीम',
        showAnswer: 'उत्तर दिखाएं',
        hideAnswer: 'उत्तर छिपाएं',
        toastDeleted: 'लड़ाई हटा दी गई।',
        toastDeleteFailed: 'लड़ाई हटाने में विफल।',
        toastEvaluationSaved: 'मूल्यांकन सहेजा गया।',
        toastEvaluationFailed: 'मूल्यांकन सहेजने में विफल।',
        noBattles: {
            title: 'एक चुनौती के लिए तैयार हैं?',
            description: 'पहली पहेली लड़ाई शुरू करने के लिए ऊपर दिए गए बटन पर क्लिक करें।',
        },
        deleteDialog: {
            title: 'इस लड़ाई को हटाएं?',
            description: 'यह क्रिया स्थायी है और इसे पूर्ववत नहीं किया जा सकता है।',
        },
        evaluation: {
            title: 'मूल्यांकन',
            winner: 'विजेता',
            winnerLabel: 'विजेता घोषित करें',
            winnerPlaceholder: 'एक विजेता चुनें...',
            tie: 'टाई',
            moodLabel: 'प्रतियोगिता का माहौल',
            moodPlaceholder: 'माहौल चुनें...',
            feedbackLabel: 'प्रतिक्रिया',
            feedbackPlaceholder: 'खेल कैसा था? क्या यह निष्पक्ष था?',
            moods: {
                competitive: 'प्रतिस्पर्धी',
                fun: 'मजेदार',
                collaborative: 'सहयोगी',
                tense: 'तनावपूर्ण',
                relaxed: 'शांत',
            },
            confirm: 'पुष्टि करें'
        }
    },
    lightningRound: {
        title: 'बिजली का दौर',
        description: 'कक्षा को ऊर्जावान बनाने के लिए मजेदार चुनौतियों वाला एक तेज गति वाला खेल।',
        durationLabel: 'दौर की अवधि (सेकंड)',
        intervalLabel: 'चुनौती अंतराल (सेकंड)',
        categoryLabel: 'चुनौती श्रेणी',
        start: 'बिजली का दौर शुरू करें!',
        pause: 'रोकें',
        resume: 'फिर से शुरू करें',
        reset: 'रीसेट',
        noStudentsError: 'खेलने के लिए कम से कम 2 उपस्थित छात्रों की आवश्यकता है।',
        toastDeleted: 'राउंड हटा दिया गया।',
        toastDeleteFailed: 'राउंड हटाने में विफल।',
        categories: {
            sound: 'ध्वनियाँ',
            face: 'चेहरे',
            gesture: 'इशारे',
            imitation: 'नकल',
        },
        gameScreen: {
            yourTurn: 'आपकी बारी!',
        },
        history: {
            title: 'राउंड का इतिहास',
            description: 'पहले से उत्पन्न राउंड की समीक्षा करें।',
            roundFor: '{date} से राउंड',
            noRounds: 'अभी तक कोई राउंड नहीं खेला गया।',
        },
        deleteDialog: {
            title: 'इस राउंड को हटाएं?',
            description: 'यह क्रिया स्थायी है और इसे पूर्ववत नहीं किया जा सकता है।',
        },
    },
    collaborativeStory: {
        title: 'सहयोगी कहानी सुनाना',
        setup: {
            title: 'एक नई कहानी शुरू करें',
            description: 'अपने साहसिक कार्य को शुरू करने के लिए पात्रों और सेटिंग को परिभाषित करें।',
            charactersLabel: 'मुख्य पात्र',
            charactersPlaceholder: 'जैसे, एक बहादुर शूरवीर, एक चतुर ड्रैगन',
            settingLabel: 'प्रारंभिक सेटिंग',
            settingPlaceholder: 'जैसे, एक अंधेरी और डरावनी गुफा',
            lengthLabel: 'अध्याय की लंबाई',
            lengths: {
                short: 'छोटा',
                medium: 'मध्यम',
                long: 'लंबा',
            },
            startButton: 'कहानी शुरू करें',
            allowDialogues: 'कहानी में संवादों की अनुमति दें',
            narratorVoiceLabel: "कथावाचक की आवाज़",
            narratorVoicePlaceholder: "एक आवाज़ चुनें...",
            customPromptLabel: "कस्टम प्रॉम्प्ट (वैकल्पिक)",
            customPromptPlaceholder: "उदा., कहानी एक कॉमेडी होनी चाहिए, इसमें हिंसा नहीं होनी चाहिए...",
            negativePromptLabel: "नकारात्मक प्रॉम्प्ट (वैकल्पिक)",
            negativePromptPlaceholder: "उदा., दुखद अंत से बचें, मकड़ियों का उल्लेख न करें...",
        },
        contribute: {
            title: 'आगे क्या होता है?',
            description: 'अगले अध्याय के लिए छात्रों के विचार जोड़ें।',
            placeholder: 'एक छात्र का विचार लिखें और एंटर दबाएं...',
            continueButton: 'कहानी जारी रखें',
            suggestionButton: 'AI सुझाव'
        },
        story: {
            titlePlaceholder: 'कहानी यहाँ दिखाई देगी',
            storyPlaceholder: 'अपने पात्रों और सेटिंग को परिभाषित करके शुरू करें, फिर कहानी शुरू करें!',
        },
        history: {
            title: 'कहानी का इतिहास',
            createdAt: 'बनाया गया',
            noStories: 'अभी तक कोई कहानी नहीं।',
        },
        deleteDialog: {
            title: 'इस कहानी को हटाएं?',
            description: 'यह क्रिया स्थायी है और इसे पूर्ववत नहीं किया जा सकता है।',
        },
        toastDeleted: 'कहानी हटा दी गई।',
        toastDeleteFailed: 'कहानी हटाने में विफल।',
        toastNarrationSuccess: 'पूरी कहानी का वर्णन उत्पन्न हो रहा है और जल्द ही दिखाई देगा।',
        newStoryButton: 'एक नई कहानी शुरू करें',
        narrateButton: 'अध्याय सुनाएँ',
        'narrateButton--loading': 'सुनाया जा रहा है...',
        narrateFullStoryButton: 'ऑडियोबुक के रूप में सुनाएँ',
        suggestions: {
            button: 'AI के साथ सुझाव दें',
            toastSuccess: 'विचार सुझाए गए!'
        },
        finishButton: 'कहानी समाप्त करें',
        test: {
            createButton: 'कहानी से परीक्षण बनाएं',
            modalTitle: 'परीक्षण उत्पन्न करें',
            modalDescription: 'इस कहानी से आप जिस प्रकार का परीक्षण उत्पन्न करना चाहते हैं उसे चुनें।',
            typeLabel: 'परीक्षण का प्रकार',
            types: {
                title: 'परीक्षण का प्रकार',
                'multiple-choice': 'बहुविकल्पी',
                'true-false': 'सही या गलत',
                'open-ended': 'खुले अंत वाले प्रश्न',
                'mixed': 'मिश्रित',
            },
            generateButton: 'परीक्षण उत्पन्न करें',
            generateError: 'परीक्षण उत्पन्न करने में विफल।',
            saveSuccess: 'परीक्षण सफलतापूर्वक सहेजा गया!',
            saveError: 'परीक्षण सहेजने में विफल।',
            previewTitle: 'उत्पन्न परीक्षण का पूर्वावलोकन',
            previewDescription: 'उत्पन्न परीक्षण की समीक्षा करें। यह पहले ही सहेजा जा चुका है और इसे परीक्षण पृष्ठ पर देखा जा सकता है।',
            rubricTitle: 'मूल्यांकन रूब्रिक',
            saveButton: 'परीक्षण सहेजें',
        },
        illustrateButton: 'चित्रण करें',
    },
    debateGenerator: {
        title: 'बहस जेनरेटर',
        description: 'आलोचनात्मक सोच को प्रोत्साहित करने के लिए शैक्षिक बहस परिदृश्य उत्पन्न करें।',
        topicLabel: 'बहस का विषय',
        topicPlaceholder: 'जैसे, क्या जानवरों को चिड़ियाघरों में रखना चाहिए?',
        complexityLabel: 'जटिलता',
        complexities: {
            beginner: 'शुरुआती',
            intermediate: 'मध्यम',
            advanced: 'उन्नत'
        },
        button: 'नई बहस उत्पन्न करें',
        noDebates: {
            title: 'तर्क करने के लिए तैयार हैं?',
            description: 'अपना पहला बहस परिदृश्य उत्पन्न करने के लिए एक विषय और जटिलता दर्ज करें।',
        },
        affirmativeStance: 'सकारात्मक रुख',
        negativeStance: 'नकारात्मक रुख',
        guidingQuestions: 'मार्गदर्शक प्रश्न',
        rules: 'बहस के नियम',
        toastDeleted: 'बहस हटा दी गई।',
        toastDeleteFailed: 'बहस हटाने में विफल।',
        deleteDialog: {
            title: 'इस बहस को हटाएं?',
            description: 'यह क्रिया स्थायी है और इसे पूर्ववत नहीं किया जा सकता है।',
        },
        startSession: "लाइव सत्र शुरू करें",
        manageSession: "सत्र प्रबंधित करें",
        turnStructureTitle: "बहस की बारी की संरचना",
        currentTurn: "वर्तमान बारी",
        notStarted: "बहस अभी शुरू नहीं हुई है",
        paused: "बहस रुकी हुई है",
        start: "बहस शुरू करें",
        nextTurn: "अगली बारी",
        pause: "रोकें",
        resume: "फिर से शुरू करें",
        liveSession: {
            title: "बहस सत्र प्रगति पर है",
            description: "बहस शुरू करने के लिए इस क्यूआर कोड या लिंक को अपने छात्रों के साथ साझा करें।",
            qrCode: "क्यूआर कोड",
            link: "सीधा लिंक",
            copy: "कॉपी करें",
            copied: "कॉपी किया गया!",
            studentsConnected: "जुड़े हुए छात्र",
            noStudentsYet: "अभी तक कोई छात्र नहीं जुड़ा है।",
            affirmative: 'सकारात्मक',
            negative: 'नकारात्मक',
            unassigned: 'अनिर्दिष्ट',
            both: 'दोनों',
            teacher: 'शिक्षक',
            closeSession: "सत्र बंद करें",
            sessionClosed: "सत्र बंद कर दिया गया है।"
        }
    },
    digitalConviviality: {
        title: 'डिजिटल नागरिकता',
        description: 'सकारात्मक और जिम्मेदार ऑनलाइन व्यवहार को बढ़ावा देने के लिए उपकरण।',
        activities: {
            title: 'गतिविधियाँ',
            description: 'डिजिटल नागरिकता कौशल का अभ्यास करने के लिए एक गतिविधि उत्पन्न करें।',
        },
        conflictSimulation: {
            title: 'संघर्ष सिमुलेशन',
            description: 'एक काल्पनिक संघर्ष परिदृश्य उत्पन्न करके कठिन ऑनलाइन स्थितियों से निपटने का अभ्यास करें।',
            topicsLabel: 'संघर्ष के विषय (वैकल्पिक)',
            topicsPlaceholder: 'जैसे, साइबर धमकी, गलत सूचना, साहित्यिक चोरी',
            button: 'परिदृश्य उत्पन्न करें',
            scenarioTitle: 'उत्पन्न परिदृश्य',
            strategiesTitle: 'हस्तक्षेप रणनीतियाँ',
            strategyLabel: 'रणनीति',
            outcomeLabel: 'सिम्युलेटेड परिणाम',
            noScenario: {
                title: 'अभ्यास के लिए तैयार हैं?',
                description: 'अपने संघर्ष समाधान कौशल का अभ्यास करने के लिए एक परिदृश्य उत्पन्न करें।',
            },
            deleteDialog: {
                title: 'इस परिदृश्य को हटाएं?',
                description: 'यह आपके इतिहास से इस संघर्ष परिदृश्य को स्थायी रूप से हटा देगा।',
                confirm: 'हटाएं',
            },
            history: {
                title: 'परिदृश्य इतिहास'
            }
        },
        pact: {
            title: 'डिजिटल समझौता',
            description: 'स्वस्थ डिजिटल बातचीत के लिए कक्षा के नियमों का एक सेट सहयोगी रूप से उत्पन्न करें।',
            studentCountLabel: 'छात्रों की संख्या',
            mainConcernsLabel: 'मुख्य चिंताएँ (वैकल्पिक)',
            mainConcernsPlaceholder: 'जैसे, सोशल मीडिया का उपयोग, गोपनीयता का सम्मान',
            button: 'समझौते का मसौदा तैयार करें',
            saveDraftButton: 'मसौदा सहेजें',
            publishButton: 'प्रकाशित करें',
            republishButton: 'पुनः प्रकाशित करें',
            publishedAt: '{date} को प्रकाशित (v{version})',
            noPacts: {
                title: 'एक समझौते के लिए तैयार हैं?',
                description: 'अपनी कक्षा के पैरामीटर सेट करें और अपने डिजिटल convivencia समझौते का मसौदा तैयार करें।'
            },
            deleteDialog: {
                title: 'इस समझौते को हटाएं?',
                description: 'यह उत्पन्न समझौते को स्थायी रूप से हटा देगा।',
                confirm: 'हटाएं'
            },
            history: {
                title: 'समझौता इतिहास',
                principles: 'मार्गदर्शक सिद्धांत',
                norms: 'विशिष्ट नियम',
                consequences: 'पुनर्स्थापनात्मक परिणाम',
                level: 'स्तर',
                restorativeAction: 'पुनर्स्थापनात्मक कार्रवाई'
            }
        },
        typeLabel: 'गतिविधि का प्रकार',
        typePlaceholder: 'एक प्रकार चुनें...',
        types: {
            'netiquette-challenge': 'नेटिकेट चुनौती',
            'digital-collaboration': 'डिजिटल सहयोग खेल',
            'positive-messaging': 'सकारात्मक संदेश पुनर्लेखक'
        },
        customPromptLabel: 'विशिष्ट फोकस (वैकल्पिक)',
        customPromptPlaceholder: 'जैसे, सोशल मीडिया टिप्पणियों पर ध्यान केंद्रित करें...',
        button: 'गतिविधि उत्पन्न करें',
        history: {
            title: 'गतिविधि इतिहास',
            studentInstructions: 'छात्रों के लिए निर्देश',
            pedagogicalObjectives: 'शैक्षणिक उद्देश्य',
            materials: 'सामग्री',
            noMaterials: 'कोई सामग्री प्रदान नहीं की गई।',
            steps: 'कदम',
        },
        noActivities: {
            title: 'अच्छी डिजिटल आदतें बढ़ावा देने के लिए तैयार हैं?',
            description: 'अपना पहला डिजिटल नागरिकता अभ्यास उत्पन्न करने के लिए ऊपर एक गतिविधि प्रकार चुनें।'
        },
        deleteDialog: {
            title: 'इस गतिविधि को हटाएं?',
            description: 'यह क्रिया स्थायी है और इसे पूर्ववत नहीं किया जा सकता है।',
            confirm: 'हटाएं'
        }
    },
    suggestions: {
        button: 'AI के साथ सुझाव दें',
        toastSuccess: 'विषय सुझाया गया!'
    }
} as const;
