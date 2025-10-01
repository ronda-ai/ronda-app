export default {
    selectionMode: '選択モード',
    readyToSpin: '回す準備はできましたか？',
    readyToSelect: '選ぶ準備はできましたか？',
    spinTheWheel: 'ルーレットを回す！',
    selectStudent: '生徒を選択',
    selectStudentSingular: '生徒を選択',
    spinning: '回転中...',
    modes: {
      random: 'ランダム',
      weighted: '加重AI',
      lightning: 'ライトニングラウンド',
      pair: 'パワーデュオ',
      personalizedIndividual: '個別パーソナライズ',
      personalizedMultiple: '複数パーソナライズ',
    },
    modeDescriptions: {
      random: '完全にランダムに1人の生徒を選択します。',
      weighted:
        'AIが、参加回数の少ない生徒に高い確率を与えて生徒を選択します。',
      lightning: 'ランダムに選ばれた生徒のための、素早くて簡単な挑戦。',
      pair: '挑戦に協力するために2人の生徒をランダムに選択します。',
      personalizedIndividual:
        '高度にパーソナライズされた挑戦のために、手動で1人の生徒を選択します。',
      personalizedMultiple:
        '共同のパーソナライズされた挑戦のために、手動で最大3人の生徒を選択します。',
    },
} as const;
