
export default {
    title: 'विश्लेषण',
    tagline: 'छात्रों की उपस्थिति और भागीदारी को विज़ुअलाइज़ करें।',
    filters: {
      title: 'फ़िल्टर',
      dateRange: 'दिनांक सीमा',
      student: 'छात्र',
      allStudents: 'सभी छात्र',
      studentPlaceholder: 'एक या अधिक छात्र चुनें...',
      noStudents: 'कोई छात्र नहीं मिला'
    },
    charts: {
      attendance: {
        title: 'उपस्थिति रुझान',
        description: 'समय के साथ उपस्थित बनाम अनुपस्थित छात्रों की संख्या।',
      },
      participation: {
        title: 'भागीदारी वितरण',
        description:
          'चयनित सीमा में प्रत्येक छात्र के लिए कुल भागीदारी गणना।',
        legend: 'भागीदारी'
      },
    },
} as const;
