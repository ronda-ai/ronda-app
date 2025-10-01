
export default {
    selectionMode: 'चयन मोड',
    readyToSpin: 'घूमने के लिए तैयार हैं?',
    readyToSelect: 'चुनने के लिए तैयार हैं?',
    spinTheWheel: 'पहिया घुमाओ!',
    selectStudent: 'छात्र चुनें',
    selectStudentSingular: 'छात्र चुनें',
    spinning: 'घूम रहा है...',
    modes: {
      random: 'यादृच्छिक',
      weighted: 'भारित AI',
      lightning: 'बिजली का दौर',
      pair: 'शक्तिशाली जोड़ी',
      personalizedIndividual: 'व्यक्तिगत व्यक्तिगत',
      personalizedMultiple: 'व्यक्तिगत एकाधिक',
    },
    modeDescriptions: {
      random: 'एक छात्र को पूरी तरह से यादृच्छिक रूप से चुनता है।',
      weighted:
        'AI एक छात्र का चयन करता है, उन लोगों को अधिक मौका देता है जिन्होंने कम भाग लिया है।',
      lightning: 'एक यादृच्छिक रूप से चयनित छात्र के लिए एक त्वरित, सरल चुनौती।',
      pair: 'एक चुनौती पर सहयोग करने के लिए दो छात्रों को यादृच्छिक रूप से चुनता है।',
      personalizedIndividual:
        'एक अत्यधिक व्यक्तिगत चुनौती के लिए मैन्युअल रूप से एक छात्र का चयन करें।',
      personalizedMultiple:
        'एक सहयोगी व्यक्तिगत चुनौती के लिए मैन्युअल रूप से तीन छात्रों तक का चयन करें।',
    },
} as const;
