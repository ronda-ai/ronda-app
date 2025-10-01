
export default {
      title: '言語サポート',
      tagline: '言語の包括性をサポートするためにバイリンガル教材を生成します。',
      form: {
          title: '言語包括性アシスタント',
          description: '生徒を選択し、その言語を指定して、パーソナライズされたサポート教材を生成します。',
          studentLabel: '生徒',
          studentPlaceholder: '生徒を選択...',
          languageLabel: "生徒の母国語",
          languagePlaceholder: '例：スペイン語、フランス語、標準中国語',
          focusAreasLabel: '重点分野',
          generateButton: 'サポート教材を生成',
      },
      focusAreas: {
          reading: '読解力',
          writing: '筆記能力',
          speaking: '口頭表現',
          listening: '聴解力',
          'social-emotional': '社会情緒的統合',
      },
      addFocusAreaDialog: {
        title: '新しい重点分野を追加',
        description: 'AIの提案から選択するか、独自の重点分野をリストに追加します。',
        customPromptLabel: 'AIをガイドする（任意）',
        customPromptPlaceholder: '例：リスニング分野に焦点を当てる...',
        manualAreaLabel: 'または手動で分野を追加',
        manualAreaPlaceholder: '新しい分野を入力...',
        noSuggestions: '提案はありません。プロンプトを更新または変更してみてください。',
        add: '追加：',
        addSelected: '選択項目を追加',
        toastSuccess: '重点分野が正常に追加されました！',
        toastError: '重点分野の追加に失敗しました。',
      },
      editFocusAreaDialog: {
        title: '重点分野を編集: {name}',
        areaNameLabel: '重点分野名',
        deleteButton: '分野を削除',
        toastUpdateSuccess: '重点分野が正常に更新されました！',
        toastUpdateError: '重点分野の更新に失敗しました。',
        toastDeleteSuccess: '重点分野が正常に削除されました！',
        toastDeleteError: '重点分野の削除に失敗しました。',
        deleteDialog: {
            title: 'よろしいですか？',
            description: 'これにより、重点分野「{name}」がリストから永久に削除されます。',
            cancel: 'キャンセル',
            confirm: '削除'
        }
      },
      generatingTitle: 'サポート教材を生成中...',
      history: {
          title: '生成された教材の履歴',
          description: '選択した生徒のために以前に生成された教材を確認します。',
          selectStudentPrompt: {
            title: '生徒を選択',
            description: 'フォームから生徒を選択して、履歴を表示し、新しい教材を生成します。',
          },
          noResults: {
              title: 'まだ教材はありません',
              description: 'フォームを使用して、この生徒の最初のサポート教材を生成します。',
          },
          header: '{language}用の教材',
          teacherGuide: '教師用ガイド',
          studentMaterial: '生徒用教材',
          feedbackTitle: "教師のフィードバック",
          feedbackPlaceholder: 'この教材は役に立ちましたか？あなたのフィードバックは将来の提案を改善するのに役立ちます。',
          toastDeleted: 'サポート教材を削除しました。',
          toastDeleteFailed: 'サポート教材の削除に失敗しました。',
          deleteDialog: {
            title: 'この教材を削除しますか？',
            description: 'この操作は元に戻せません。これにより、生成されたサポート教材が永久に削除されます。',
          },
          translationTitle: "{language}の翻訳",
          showTranslation: "翻訳を表示",
          hideTranslation: "翻訳を隠す",
      }
} as const;
