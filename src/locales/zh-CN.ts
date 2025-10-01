
import home from './zh-CN/home';
import common from './zh-CN/common';
import studentList from './zh-CN/studentList';
import relations from './zh-CN/relations';
import genders from './zh-CN/genders';
import shareProfile from './zh-CN/shareProfile';
import wheel from './zh-CN/wheel';
import dialog from './zh-CN/dialog';
import toasts from './zh-CN/toasts';
import subjects from './zh-CN/subjects';
import evaluations from './zh-CN/evaluations';
import coach from './zh-CN/coach';
import observations from './zh-CN/observations';
import attendance from './zh-CN/attendance';
import analytics from './zh-CN/analytics';
import exportData from './zh-CN/export';
import login from './zh-CN/login';
import logout from './zh-CN/logout';
import activityGenerator from './zh-CN/activityGenerator';
import individualActivities from './zh-CN/individualActivities';
import groupActivities from './zh-CN/groupActivities';
import classroom from './zh-CN/classroom';
import tools from './zh-CN/tools';
import languageSupport from './zh-CN/languageSupport';
import playground from './zh-CN/playground';
import tests from './zh-CN/tests';
import publicProfile from './zh-CN/publicProfile';
import publicTestSession from './zh-CN/publicTestSession';
import publicDebateSession from './zh-CN/publicDebateSession';
import nav from './zh-CN/nav';
import pbl from './zh-CN/pbl';
import safetyLab from './zh-CN/safetyLab';

export default {
    home,
    common,
    studentList,
    relations,
    genders,
    shareProfile,
    wheel,
    dialog,
    toasts,
    subjects,
    evaluations,
    coach,
    observations,
    attendance,
    analytics,
    export: exportData,
    login,
    logout,
    activityGenerator,
    individualActivities,
    groupActivities,
    classroom,
    tools,
    languageSupport,
    playground,
    tests,
    publicProfile,
    publicTestSession,
    publicDebateSession,
    nav,
    pbl,
    safetyLab,
} as const;
