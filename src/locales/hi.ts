
import home from './hi/home';
import common from './hi/common';
import studentList from './hi/studentList';
import relations from './hi/relations';
import genders from './hi/genders';
import shareProfile from './hi/shareProfile';
import wheel from './hi/wheel';
import dialog from './hi/dialog';
import toasts from './hi/toasts';
import subjects from './hi/subjects';
import evaluations from './hi/evaluations';
import coach from './hi/coach';
import observations from './hi/observations';
import attendance from './hi/attendance';
import analytics from './hi/analytics';
import exportData from './hi/export';
import login from './hi/login';
import logout from './hi/logout';
import activityGenerator from './hi/activityGenerator';
import individualActivities from './hi/individualActivities';
import groupActivities from './hi/groupActivities';
import classroom from './hi/classroom';
import tools from './hi/tools';
import languageSupport from './hi/languageSupport';
import playground from './hi/playground';
import tests from './hi/tests';
import publicProfile from './hi/publicProfile';
import publicTestSession from './hi/publicTestSession';
import publicDebateSession from './hi/publicDebateSession';
import nav from './hi/nav';
import pbl from './hi/pbl';
import safetyLab from './hi/safetyLab';

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

