
export default {
    title: 'グループ活動',
    tagline: '賢くグループを形成し、共同活動を生成します。',
    generator: {
      title: 'グループ提案ジェネレーター',
      description: 'AIがあなたのクラスを分析して、バランスの取れたグループと進行のヒントを提案します。',
      button: '新しい提案を生成',
    },
    manualMode: {
        title: '手動グループビルダー',
        description: '独自のグループを作成し、AIの支援を受けましょう。',
        selectLabel: '新しいグループの生徒を選択',
        selectPlaceholder: '生徒を選択...',
        createGroupButton: 'グループを作成',
        groupTitle: '新しいグループ',
        analyzeButton: 'ダイナミクスを分析',
        generateActivityButton: 'アクティビティを生成',
        warningTitle: '関係アラート',
        conflictWarning: '{nameA}と{nameB}には登録された対立があります。注意して進めてください。',
        skillsLabel: '開発する共同スキル',
        skillsPlaceholder: '例：コミュニケーション、リーダーシップ',
        themesLabel: 'アクティビティのテーマ（任意）',
        themesPlaceholder: '例：宇宙ミッション、ミステリー解決',
        activityGeneratedToast: 'アクティビティが正常に生成されました！',
    },
    aiSuggestions: {
        title: 'AI生成の提案',
    },
    history: {
      title: '提案履歴',
      description: '以前に生成されたグループ提案を確認します。',
      suggestionFor: '{date}からの提案',
      teacherTipTitle: 'ファシリテーターのヒント',
      suggestedGroups: '提案されたグループ',
      group: 'グループ',
      suggestedSkills: '提案された共同スキル',
      suggestedThemes: '提案されたアクティビティのテーマ',
      useSuggestionButton: 'この提案を使用',
      suggestionUsedToast: '提案が手動グループビルダーに適用されました！',
      noResults: {
        title: '共同作業の準備はできましたか？',
        description: '上のボタンをクリックして、クラスの最初のグループ提案セットを生成します。',
      },
      toastDeleted: '提案を削除しました。',
      toastDeleteFailed: '提案の削除に失敗しました。',
      deleteDialog: {
        title: 'この提案を削除しますか？',
        description: 'この操作は永続的で、元に戻すことはできません。',
      },
    },
    viewActivitiesButton: '生成された活動を表示',
    details: {
        title: 'グループのために生成された活動',
        description: '{members}のために次の活動が生成されました。',
        deleteButton: '活動計画を削除',
    }
} as const;
