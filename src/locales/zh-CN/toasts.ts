export default {
    noStudents: '请先添加学生到列表中再旋转。',
    aiError: 'AI返回了一个无效的学生姓名。请重试。',
    aiSelectionFailed:
      '无法获取加权选择。将回退到随机选择。',
    aiChallengeFailed:
      '无法生成AI挑战。将回退到标准挑战。',
    aiModelOverloaded:
      "AI助手当前正忙。请稍后再试！",
    aiSuggestionFailed:
      '无法生成AI建议。请重试。',
    aiSuggestionFailedDescription: '如果问题仍然存在，请检查学生数据或简化请求。',
    profileSuggestionNeedsInfo:
      '在生成建议前，请输入姓名和年龄。',
    feedbackSaved: '反馈已成功保存！',
    feedbackFailed: '保存反馈失败。',
    qualitiesUpdated: '品质已成功更新！',
    qualitiesUpdateFailed: '更新品质失败。',
    attendanceSaved: '出勤记录已成功保存！',
    attendanceFailed: '保存出勤记录失败。',
    challengeRejected: '挑战已标记为已拒绝。',
} as const;
