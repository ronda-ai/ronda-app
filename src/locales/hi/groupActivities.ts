

export default {
    title: 'समूह गतिविधियाँ',
    tagline: 'बुद्धिमानी से समूह बनाएं और सहयोगी गतिविधियाँ उत्पन्न करें।',
    generator: {
      title: 'समूह सुझाव जेनरेटर',
      description: 'AI आपकी कक्षा का विश्लेषण करके संतुलित समूह और एक सुविधा टिप सुझाएगा।',
      button: 'नए सुझाव उत्पन्न करें',
    },
    manualMode: {
        title: 'मैनुअल समूह निर्माता',
        description: 'अपने स्वयं के समूह बनाएं और AI सहायता प्राप्त करें।',
        selectLabel: 'एक नए समूह के लिए छात्र चुनें',
        selectPlaceholder: 'छात्र चुनें...',
        createGroupButton: 'समूह बनाएं',
        groupTitle: 'नया समूह',
        analyzeButton: 'गतिशीलता का विश्लेषण करें',
        generateActivityButton: 'गतिविधि उत्पन्न करें',
        warningTitle: 'संबंध चेतावनी',
        conflictWarning: '{nameA} और {nameB} के बीच एक पंजीकृत संघर्ष है। सावधानी से आगे बढ़ें।',
        skillsLabel: 'विकसित करने के लिए सहयोगी कौशल',
        skillsPlaceholder: 'जैसे, संचार, नेतृत्व',
        themesLabel: 'गतिविधि थीम (वैकल्पिक)',
        themesPlaceholder: 'जैसे, अंतरिक्ष मिशन, रहस्य सुलझाना',
        activityGeneratedToast: 'गतिविधि सफलतापूर्वक उत्पन्न हुई!',
    },
    aiSuggestions: {
        title: 'AI-जनित सुझाव',
    },
    history: {
      title: 'सुझाव इतिहास',
      description: 'पहले से उत्पन्न समूह सुझावों की समीक्षा करें।',
      suggestionFor: '{date} से सुझाव',
      teacherTipTitle: 'सुविधाकर्ता टिप',
      suggestedGroups: 'सुझाए गए समूह',
      group: 'समूह',
      suggestedSkills: 'सुझाए गए सहयोगी कौशल',
      suggestedThemes: 'सुझाए गए गतिविधि थीम',
      useSuggestionButton: 'इस सुझाव का उपयोग करें',
      suggestionUsedToast: 'सुझाव मैनुअल समूह निर्माता पर लागू किया गया!',
      noResults: {
        title: 'सहयोग करने के लिए तैयार हैं?',
        description: 'अपनी कक्षा के लिए समूह सुझावों का पहला सेट उत्पन्न करने के लिए ऊपर दिए गए बटन पर क्लिक करें।',
      },
      toastDeleted: 'सुझाव हटा दिया गया।',
      toastDeleteFailed: 'सुझाव हटाने में विफल।',
      deleteDialog: {
        title: 'इस सुझाव को हटाएं?',
        description: 'यह क्रिया स्थायी है और इसे पूर्ववत नहीं किया जा सकता है।',
      },
    },
    viewActivitiesButton: 'उत्पन्न गतिविधियाँ देखें',
    details: {
        title: 'समूह के लिए उत्पन्न गतिविधियाँ',
        description: '{members} के लिए निम्नलिखित गतिविधियाँ उत्पन्न की गईं।',
        deleteButton: 'गतिविधि योजना हटाएं',
    }
} as const;

