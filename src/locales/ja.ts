
import home from './ja/home';
import common from './ja/common';
import studentList from './ja/studentList';
import relations from './ja/relations';
import genders from './ja/genders';
import shareProfile from './ja/shareProfile';
import wheel from './ja/wheel';
import dialog from './ja/dialog';
import toasts from './ja/toasts';
import subjects from './ja/subjects';
import evaluations from './ja/evaluations';
import coach from './ja/coach';
import observations from './ja/observations';
import attendance from './ja/attendance';
import analytics from './ja/analytics';
import exportData from './ja/export';
import login from './ja/login';
import logout from './ja/logout';
import activityGenerator from './ja/activityGenerator';
import individualActivities from './ja/individualActivities';
import groupActivities from './ja/groupActivities';
import classroom from './ja/classroom';
import tools from './ja/tools';
import languageSupport from './ja/languageSupport';
import playground from './ja/playground';
import tests from './ja/tests';
import publicProfile from './ja/publicProfile';
import publicTestSession from './ja/publicTestSession';
import publicDebateSession from './ja/publicDebateSession';
import nav from './ja/nav';
import pbl from './ja/pbl';
import safetyLab from './ja/safetyLab';

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
