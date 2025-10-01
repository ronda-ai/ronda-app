
import home from './pt/home';
import common from './pt/common';
import studentList from './pt/studentList';
import relations from './pt/relations';
import genders from './pt/genders';
import shareProfile from './pt/shareProfile';
import wheel from './pt/wheel';
import dialog from './pt/dialog';
import toasts from './pt/toasts';
import subjects from './pt/subjects';
import evaluations from './pt/evaluations';
import coach from './pt/coach';
import observations from './pt/observations';
import attendance from './pt/attendance';
import analytics from './pt/analytics';
import exportData from './pt/export';
import login from './pt/login';
import logout from './pt/logout';
import activityGenerator from './pt/activityGenerator';
import individualActivities from './pt/individualActivities';
import groupActivities from './pt/groupActivities';
import classroom from './pt/classroom';
import tools from './pt/tools';
import languageSupport from './pt/languageSupport';
import playground from './pt/playground';
import tests from './pt/tests';
import publicProfile from './pt/publicProfile';
import publicTestSession from './pt/publicTestSession';
import publicDebateSession from './pt/publicDebateSession';
import nav from './pt/nav';
import pbl from './pt/pbl';
import safetyLab from './pt/safetyLab';

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
