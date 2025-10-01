
export default {
    title: 'मूल्यांकन',
    tagline: 'छात्रों की भागीदारी की समीक्षा और मूल्यांकन करें।',
    evaluateButton: 'मूल्यांकन करें',
    evaluatedStatus: 'मूल्यांकित',
    rejectedStatus: 'अस्वीकृत',
    noChallenges: 'इस छात्र के लिए अभी तक कोई चुनौती दर्ज नहीं की गई है।',
    noEvaluations: {
      title: 'अभी तक कोई मूल्यांकन नहीं',
      description:
        'एक बार जब कोई छात्र चुनौती स्वीकार कर लेता है, तो आप उसे यहाँ मूल्यांकित कर सकते हैं।',
    },
    evaluationDialog: {
      title: 'चुनौती का मूल्यांकन करें',
      forStudent: '{name} के लिए',
      challenge: 'चुनौती',
      rating: 'रेटिंग',
      feedback: 'प्रतिक्रिया',
      feedbackPlaceholder: 'अपनी प्रतिक्रिया यहाँ दर्ज करें...',
      saveButton: 'मूल्यांकन सहेजें',
      mood: 'छात्र का मूड',
    },
    ratings: {
      needsSupport: 'समर्थन की आवश्यकता है',
      metExpectations: 'अपेक्षाओं को पूरा किया',
      exceededExpectations: 'अपेक्षाओं से अधिक',
    },
    moods: {
      enthusiastic: 'उत्साही',
      focused: 'केंद्रित',
      nervous: 'घबराया हुआ',
      frustrated: 'निराश',
      happy: 'खुश',
      tired: 'थका हुआ',
    },
    pagination: {
        previous: 'पिछला',
        next: 'अगला',
        page: '{totalPages} में से पृष्ठ {currentPage}',
    }
} as const;
