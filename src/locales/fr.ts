
import home from './fr/home';
import common from './fr/common';
import studentList from './fr/studentList';
import relations from './fr/relations';
import genders from './fr/genders';
import shareProfile from './fr/shareProfile';
import wheel from './fr/wheel';
import dialog from './fr/dialog';
import toasts from './fr/toasts';
import subjects from './fr/subjects';
import evaluations from './fr/evaluations';
import coach from './fr/coach';
import observations from './fr/observations';
import attendance from './fr/attendance';
import analytics from './fr/analytics';
import exportData from './fr/export';
import login from './fr/login';
import logout from './fr/logout';
import activityGenerator from './fr/activityGenerator';
import individualActivities from './fr/individualActivities';
import groupActivities from './fr/groupActivities';
import classroom from './fr/classroom';
import tools from './fr/tools';
import languageSupport from './fr/languageSupport';
import playground from './fr/playground';
import tests from './fr/tests';
import publicProfile from './fr/publicProfile';
import publicTestSession from './fr/publicTestSession';
import publicDebateSession from './fr/publicDebateSession';
import nav from './fr/nav';
import pbl from './fr/pbl';
import safetyLab from './fr/safetyLab';

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

