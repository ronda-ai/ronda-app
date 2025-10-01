
import home from './it/home';
import common from './it/common';
import studentList from './it/studentList';
import relations from './it/relations';
import genders from './it/genders';
import shareProfile from './it/shareProfile';
import wheel from './it/wheel';
import dialog from './it/dialog';
import toasts from './it/toasts';
import subjects from './it/subjects';
import evaluations from './it/evaluations';
import coach from './it/coach';
import observations from './it/observations';
import attendance from './it/attendance';
import analytics from './it/analytics';
import exportData from './it/export';
import login from './it/login';
import logout from './it/logout';
import activityGenerator from './it/activityGenerator';
import individualActivities from './it/individualActivities';
import groupActivities from './it/groupActivities';
import classroom from './it/classroom';
import tools from './it/tools';
import languageSupport from './it/languageSupport';
import playground from './it/playground';
import tests from './it/tests';
import publicProfile from './it/publicProfile';
import publicTestSession from './it/publicTestSession';
import publicDebateSession from './it/publicDebateSession';
import nav from './it/nav';
import pbl from './it/pbl';
import safetyLab from './it/safetyLab';

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
