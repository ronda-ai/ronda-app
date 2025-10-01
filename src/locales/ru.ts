
import home from './ru/home';
import common from './ru/common';
import studentList from './ru/studentList';
import relations from './ru/relations';
import genders from './ru/genders';
import shareProfile from './ru/shareProfile';
import wheel from './ru/wheel';
import dialog from './ru/dialog';
import toasts from './ru/toasts';
import subjects from './ru/subjects';
import evaluations from './ru/evaluations';
import coach from './ru/coach';
import observations from './ru/observations';
import attendance from './ru/attendance';
import analytics from './ru/analytics';
import exportData from './ru/export';
import login from './ru/login';
import logout from './ru/logout';
import activityGenerator from './ru/activityGenerator';
import individualActivities from './ru/individualActivities';
import groupActivities from './ru/groupActivities';
import classroom from './ru/classroom';
import tools from './ru/tools';
import languageSupport from './ru/languageSupport';
import playground from './ru/playground';
import tests from './ru/tests';
import publicProfile from './ru/publicProfile';
import publicTestSession from './ru/publicTestSession';
import publicDebateSession from './ru/publicDebateSession';
import nav from './ru/nav';
import pbl from './ru/pbl';
import safetyLab from './ru/safetyLab';

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
