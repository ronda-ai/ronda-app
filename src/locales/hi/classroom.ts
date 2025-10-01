

export default {
    title: 'कक्षा',
    tagline: 'अपनी कक्षा की सेटिंग्स और संदर्भ कॉन्फ़िगर करें।',
    form: {
      title: 'कक्षा सेटिंग्स',
      description: 'AI को अधिक प्रासंगिक सामग्री उत्पन्न करने में मदद करने के लिए अपनी कक्षा के बारे में संदर्भ प्रदान करें।',
      className: 'कक्षा का नाम',
      classNamePlaceholder: 'जैसे, तीसरी कक्षा का पठन समूह',
      classInterests: 'कक्षा की रुचियाँ',
      classInterestsPlaceholder: 'जैसे, डायनासोर, अंतरिक्ष, सुपरहीरो',
      analysisLevel: 'विश्लेषण गहराई स्तर',
      analysisLevelPlaceholder: 'एक स्तर चुनें...',
      analysisLevels: {
        low: 'कम (अंतिम 5 अवलोकन)',
        medium: 'मध्यम (अंतिम 10 अवलोकन)',
        high: 'उच्च (अंतिम 15 अवलोकन)',
      }
    },
    theme: {
        title: 'इंटरफ़ेस अनुकूलन',
        galleryTitle: 'थीम गैलरी',
        galleryDescription: 'एप्लिकेशन का रूप और अनुभव तुरंत बदलने के लिए एक पूर्वनिर्धारित थीम चुनें।',
        moreThemes: 'और थीम एक्सप्लोर करें...',
        names: {
            default: 'डिफ़ॉल्ट',
            forest: 'जादुई जंगल',
            ocean: 'गहरा सागर',
            sunset: 'गर्म सूर्यास्त',
            rose: 'गुलाब की पंखुड़ी',
            nebula: 'ब्रह्मांडीय नीहारिका',
            minty: 'ताज़ा पुदीना',
            sandstone: 'बलुआ पत्थर का रेगिस्तान',
            cyberpunk: 'साइबरपंक',
            vintage: 'विंटेज',
            sakura: 'सकुरा',
            jungle: 'जंगल',
            arctic: 'आर्कटिक',
            volcano: 'ज्वालामुखी',
            cotton_candy: 'कॉटन कैंडी',
            golden_hour: 'सुनहरा घंटा',
            royal: 'शाही',
            emerald: 'पन्ना',
            coffee_shop: 'कॉफी शॉप',
            autumn: 'पतझड़',
            coral_reef: 'प्रवाल भित्ति',
            lavender_field: 'लैवेंडर का खेत',
            graphite: 'ग्रेफाइट',
            strawberry: 'स्ट्रॉबेरी',
            matcha: 'माचा',
            peacock: 'मोर',
            sunny_day: 'धूप वाला दिन',
            '8bit': '8-बिट',
        }
    },
    studentList: {
        title: 'छात्र सूची',
        description: 'अपने छात्र प्रोफाइल प्रबंधित करें और एक नज़र में मुख्य जानकारी देखें।',
        searchPlaceholder: 'नाम, गुणवत्ता, भय से खोजें...',
        noResults: 'आपकी खोज से मेल खाने वाले कोई छात्र नहीं मिले।'
    },
    aiExpertDialog: {
        title: '{name} के बारे में AI विशेषज्ञ से पूछें',
        description: 'शैक्षणिक या मनोवैज्ञानिक मार्गदर्शन प्राप्त करने के लिए इस छात्र के बारे में एक खुला प्रश्न पूछें।',
        studentProfile: 'छात्र प्रोफ़ाइल',
        qualities: 'गुण',
        fears: 'डर',
        notes: 'नोट्स',
        disability: 'विकलांगता',
        neurodiversity: 'तंत्रिका विविधता',
        questionLabel: 'आपका प्रश्न',
        questionPlaceholder: 'जैसे, मैं इस छात्र को गणित में अधिक आत्मविश्वास महसूस करने में कैसे मदद कर सकता हूँ?',
        askButton: 'AI से पूछें',
        answerTitle: 'AI विशेषज्ञ की सलाह'
    }
} as const;
