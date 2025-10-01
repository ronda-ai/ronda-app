
export default {
    title: 'उपकरण',
    tagline: 'अपने शिक्षण को सशक्त बनाने के लिए AI उपकरणों का उपयोग करें।',
    activityAdapter: {
      title: 'गतिविधि अनुकूलक',
      description: 'किसी भी मौजूदा गतिविधि को अपनी कक्षा की जरूरतों के अनुसार बेहतर ढंग से अनुकूलित करें, चाहे वह विशिष्ट छात्रों के लिए हो या पूरे समूह के लिए।',
      placeholder: 'आप जिस गतिविधि को अनुकूलित करना चाहते हैं उसे यहाँ चिपकाएँ या लिखें...',
      activityLabel: 'अनुकूलित करने के लिए गतिविधि',
      existingActivityLabel: 'एक मौजूदा गतिविधि या परीक्षण चुनें',
      existingActivityPlaceholder: 'संक्षेप और अनुकूलन के लिए एक गतिविधि/परीक्षण चुनें...',
      studentLabel: 'विशिष्ट छात्रों के लिए अनुकूलित करें (वैकल्पिक)',
      studentPlaceholder: 'छात्रों का चयन करें...',
      customPromptLabel: 'अनुकूलन के लिए विशिष्ट लक्ष्य (वैकल्पिक)',
      customPromptPlaceholder: 'जैसे, इसे एक खेल बनाएं, लेखन पर ध्यान केंद्रित करें...',
      button: 'गतिविधि अनुकूलित करें',
      generatingTitle: 'अनुकूलन उत्पन्न हो रहे हैं...',
      activityType: 'गतिविधि'
    },
     rubricGenerator: {
      title: 'रूब्रिक जेनरेटर',
      description: 'किसी भी गतिविधि के लिए एक निष्पक्ष और संतुलित मूल्यांकन रूब्रिक बनाएं।',
      placeholder: 'उस गतिविधि का वर्णन करें जिसके लिए रूब्रिक बनाना है...',
      button: 'रूब्रिक उत्पन्न करें',
      testType: 'परीक्षण'
    },
    history: {
      title: 'इतिहास',
      descriptionAdapter: 'पहले से अनुकूलित गतिविधियों की समीक्षा करें।',
      descriptionRubric: 'पहले से उत्पन्न रूब्रिक की समीक्षा करें।',
      reasoning: 'तर्क',
      criterion: 'मानदंड',
      excellent: 'उत्कृष्ट',
      satisfactory: 'संतोषजनक',
      needsImprovement: 'सुधार की आवश्यकता है',
      scoringGuide: 'स्कोरिंग गाइड',
      toastDeleteSuccess: 'सफलतापूर्वक हटाया गया।',
      toastDeleteFailed: 'हटाने में विफल।',
      noResults: {
        title: 'अभी तक कोई परिणाम नहीं',
        description: 'अपना पहला परिणाम उत्पन्न करने के लिए बाईं ओर के टूल का उपयोग करें।',
      },
      deleteDialogAdapter: {
          title: 'इस अनुकूलन को हटाएं?',
          description: 'यह क्रिया पूर्ववत नहीं की जा सकती। यह गतिविधि अनुकूलन को स्थायी रूप से हटा देगा।',
          confirm: 'हटाएं'
      },
      deleteDialogRubric: {
          title: 'इस रूब्रिक को हटाएं?',
          description: 'यह क्रिया पूर्ववत नहीं की जा सकती। यह उत्पन्न रूब्रिक को स्थायी रूप से हटा देगा।',
          confirm: 'हटाएं'
      }
    }
} as const;
