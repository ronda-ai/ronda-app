
import home from './ko/home';
import common from './ko/common';
import studentList from './ko/studentList';
import relations from './ko/relations';
import genders from './ko/genders';
import shareProfile from './ko/shareProfile';
import wheel from './ko/wheel';
import dialog from './ko/dialog';
import toasts from './ko/toasts';
import subjects from './ko/subjects';
import evaluations from './ko/evaluations';
import coach from './ko/coach';
import observations from './ko/observations';
import attendance from './ko/attendance';
import analytics from './ko/analytics';
import exportData from './ko/export';
import login from './ko/login';
import logout from './ko/logout';
import activityGenerator from './ko/activityGenerator';
import individualActivities from './ko/individualActivities';
import groupActivities from './ko/groupActivities';
import classroom from './ko/classroom';
import tools from './ko/tools';
import languageSupport from './ko/languageSupport';
import playground from './ko/playground';
import tests from './ko/tests';
import publicProfile from './ko/publicProfile';
import publicTestSession from './ko/publicTestSession';
import publicDebateSession from './ko/publicDebateSession';
import nav from './ko/nav';
import pbl from './ko/pbl';
import safetyLab from './ko/safetyLab';

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
