
export default {
      title: 'भाषा समर्थन',
      tagline: 'भाषाई समावेश का समर्थन करने के लिए द्विभाषी सामग्री उत्पन्न करें।',
      form: {
          title: 'भाषाई समावेश सहायक',
          description: 'एक छात्र का चयन करें और व्यक्तिगत समर्थन सामग्री उत्पन्न करने के लिए उनकी भाषा निर्दिष्ट करें।',
          studentLabel: 'छात्र',
          studentPlaceholder: 'एक छात्र चुनें...',
          languageLabel: "छात्र की मूल भाषा",
          languagePlaceholder: 'जैसे, स्पेनिश, फ्रेंच, मंदारिन',
          focusAreasLabel: 'फोकस क्षेत्र',
          generateButton: 'समर्थन सामग्री उत्पन्न करें',
      },
      focusAreas: {
          reading: 'पढ़ने की समझ',
          writing: 'लेखन कौशल',
          speaking: 'मौखिक अभिव्यक्ति',
          listening: 'सुनने की समझ',
          'social-emotional': 'सामाजिक-भावनात्मक एकीकरण',
      },
      addFocusAreaDialog: {
        title: 'नए फोकस क्षेत्र जोड़ें',
        description: 'AI सुझावों में से चुनें या सूची में अपने स्वयं के फोकस क्षेत्र जोड़ें।',
        customPromptLabel: 'AI को गाइड करें (वैकल्पिक)',
        customPromptPlaceholder: 'जैसे, सुनने के क्षेत्रों पर ध्यान केंद्रित करें...',
        manualAreaLabel: 'या मैन्युअल रूप से एक क्षेत्र जोड़ें',
        manualAreaPlaceholder: 'एक नया क्षेत्र टाइप करें...',
        noSuggestions: 'कोई सुझाव उपलब्ध नहीं है। अपनी प्रॉम्प्ट को रीफ्रेश या बदलने का प्रयास करें।',
        add: 'जोड़ें:',
        addSelected: 'चयनित जोड़ें',
        toastSuccess: 'फोकस क्षेत्र सफलतापूर्वक जोड़े गए!',
        toastError: 'फोकस क्षेत्र जोड़ने में विफल।',
      },
      editFocusAreaDialog: {
        title: 'फोकस क्षेत्र संपादित करें: {name}',
        areaNameLabel: 'फोकस क्षेत्र का नाम',
        deleteButton: 'क्षेत्र हटाएं',
        toastUpdateSuccess: 'फोकस क्षेत्र सफलतापूर्वक अपडेट किया गया!',
        toastUpdateError: 'फोकस क्षेत्र अपडेट करने में विफल।',
        toastDeleteSuccess: 'फोकस क्षेत्र सफलतापूर्वक हटाया गया!',
        toastDeleteError: 'फोकस क्षेत्र हटाने में विफल।',
        deleteDialog: {
            title: 'क्या आप निश्चित हैं?',
            description: 'यह "{name}" फोकस क्षेत्र को सूची से स्थायी रूप से हटा देगा।',
            cancel: 'रद्द करें',
            confirm: 'हटाएं'
        }
      },
      generatingTitle: 'समर्थन सामग्री उत्पन्न हो रही है...',
      history: {
          title: 'उत्पन्न सामग्री का इतिहास',
          description: 'चयनित छात्र के लिए पहले से उत्पन्न सामग्री की समीक्षा करें।',
          selectStudentPrompt: {
            title: 'एक छात्र चुनें',
            description: 'उनके इतिहास को देखने और नई सामग्री उत्पन्न करने के लिए फॉर्म से एक छात्र चुनें।',
          },
          noResults: {
              title: 'अभी तक कोई सामग्री नहीं',
              description: 'इस छात्र के लिए पहली समर्थन सामग्री उत्पन्न करने के लिए फॉर्म का उपयोग करें।',
          },
          header: '{language} के लिए सामग्री',
          teacherGuide: 'शिक्षक गाइड',
          studentMaterial: 'छात्र सामग्री',
          feedbackTitle: "शिक्षक की प्रतिक्रिया",
          feedbackPlaceholder: 'क्या यह सामग्री उपयोगी थी? आपकी प्रतिक्रिया भविष्य के सुझावों को बेहतर बनाने में मदद करती है।',
          toastDeleted: 'समर्थन सामग्री हटा दी गई।',
          toastDeleteFailed: 'समर्थन सामग्री हटाने में विफल।',
          deleteDialog: {
            title: 'इस सामग्री को हटाएं?',
            description: 'यह क्रिया पूर्ववत नहीं की जा सकती। यह उत्पन्न समर्थन सामग्री को स्थायी रूप से हटा देगा।',
          },
          translationTitle: "{language} के लिए अनुवाद",
          showTranslation: "अनुवाद दिखाएं",
          hideTranslation: "अनुवाद छिपाएं",
      }
} as const;
