
export default {
    title: 'अवलोकन',
    tagline: 'छात्रों के अवलोकन लॉग करें और समीक्षा करें।',
    noStudentSelected: {
      title: 'एक छात्र चुनें',
      description:
        'उनके अवलोकन लॉग करने या देखने के लिए सूची से एक छात्र चुनें।',
      selectDescription:
        'उनके अवलोकन लॉग करने या देखने के लिए ड्रॉपडाउन से एक छात्र चुनें।',
    },
    newObservationTitle: 'नया अवलोकन',
    newObservationDescription: '{name} के लिए एक नया अवलोकन लॉग करें।',
    observationLabel: 'अवलोकन',
    observationPlaceholder: 'आपने क्या देखा, उसका वर्णन करें...',
    typeLabel: 'अवलोकन का प्रकार',
    typePlaceholder: 'एक प्रकार चुनें...',
    saveButton: 'अवलोकन सहेजें',
    clearButton: 'साफ़ करें',
    analyzeButton: 'AI के साथ विश्लेषण करें',
    improveButton: 'AI के साथ सुधार करें',
    analysisTitle: 'AI विश्लेषण',
    suggestedType: 'सुझाया गया प्रकार',
    suggestedTags: 'सुझाए गए टैग',
    deepeningQuestion: 'गहन प्रश्न',
    toastAnalysisSuccess: 'अवलोकन का विश्लेषण किया गया!',
    toastImproveSuccess: 'अवलोकन में सुधार हुआ!',
    historyTitle: 'अवलोकन इतिहास',
    noObservations: {
      title: 'कोई अवलोकन दर्ज नहीं किया गया',
      description:
        'इस छात्र के लिए पहला अवलोकन दर्ज करने के लिए उपरोक्त फॉर्म का उपयोग करें।',
    },
    toastSuccess: 'अवलोकन सफलतापूर्वक सहेजा गया!',
    toastError: 'अवलोकन सहेजने में विफल।',
    toastDeleteSuccess: 'अवलोकन सफलतापूर्वक हटाया गया।',
    toastDeleteError: 'अवलोकन हटाने में विफल।',
    types: {
      positive: 'सकारात्मक',
      negative: 'नकारात्मक',
      neutral: 'तटस्थ',
      academic: 'शैक्षणिक',
      'social-emotional': 'सामाजिक-भावनात्मक',
    },
    deleteDialog: {
      title: 'क्या आप निश्चित हैं?',
      description: 'यह क्रिया पूर्ववत नहीं की जा सकती। यह अवलोकन को स्थायी रूप से हटा देगा।',
      confirm: 'हटाएं',
    },
    filterByType: 'प्रकार के अनुसार फ़िल्टर करें',
    filterByTag: 'टैग के अनुसार फ़िल्टर करें',
    allTypes: 'सभी प्रकार',
    allTags: 'सभी टैग',
} as const;
