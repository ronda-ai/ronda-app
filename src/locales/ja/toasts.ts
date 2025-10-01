export default {
    noStudents: '回転させる前に、リストに生徒を追加してください。',
    aiError: 'AIが無効な生徒名を返しました。もう一度お試しください。',
    aiSelectionFailed:
      '加重選択を取得できませんでした。ランダム選択にフォールバックします。',
    aiChallengeFailed:
      'AIチャレンジを生成できませんでした。標準のものにフォールバックします。',
    aiModelOverloaded:
      "AIアシスタントは現在ビジー状態です。数秒後にもう一度お試しください！",
    aiSuggestionFailed:
      'AIの提案を生成できませんでした。もう一度お試しください。',
    aiSuggestionFailedDescription: '問題が解決しない場合は、生徒データを確認するか、リクエストを簡素化してください。',
    profileSuggestionNeedsInfo:
      '提案を生成する前に、名前と年齢を入力してください。',
    feedbackSaved: 'フィードバックが正常に保存されました！',
    feedbackFailed: 'フィードバックの保存に失敗しました。',
    qualitiesUpdated: '資質が正常に更新されました！',
    qualitiesUpdateFailed: '資質の更新に失敗しました。',
    attendanceSaved: '出席が正常に保存されました！',
    attendanceFailed: '出席の保存に失敗しました。',
    challengeRejected: '挑戦は拒否されたとしてマークされました。',
} as const;
