
import home from './id/home';
import common from './id/common';
import studentList from './id/studentList';
import relations from './id/relations';
import genders from './id/genders';
import shareProfile from './id/shareProfile';
import wheel from './id/wheel';
import dialog from './id/dialog';
import toasts from './id/toasts';
import subjects from './id/subjects';
import evaluations from './id/evaluations';
import coach from './id/coach';
import observations from './id/observations';
import attendance from './id/attendance';
import analytics from './id/analytics';
import exportData from './id/export';
import login from './id/login';
import logout from './id/logout';
import activityGenerator from './id/activityGenerator';
import individualActivities from './id/individualActivities';
import groupActivities from './id/groupActivities';
import classroom from './id/classroom';
import tools from './id/tools';
import languageSupport from './id/languageSupport';
import playground from './id/playground';
import tests from './id/tests';
import publicProfile from './id/publicProfile';
import publicTestSession from './id/publicTestSession';
import publicDebateSession from './id/publicDebateSession';
import nav from './id/nav';
import pbl from './id/pbl';
import safetyLab from './id/safetyLab';

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
