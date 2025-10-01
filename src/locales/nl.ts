
import home from './nl/home';
import common from './nl/common';
import studentList from './nl/studentList';
import relations from './nl/relations';
import genders from './nl/genders';
import shareProfile from './nl/shareProfile';
import wheel from './nl/wheel';
import dialog from './nl/dialog';
import toasts from './nl/toasts';
import subjects from './nl/subjects';
import evaluations from './nl/evaluations';
import coach from './nl/coach';
import observations from './nl/observations';
import attendance from './nl/attendance';
import analytics from './nl/analytics';
import exportData from './nl/export';
import login from './nl/login';
import logout from './nl/logout';
import activityGenerator from './nl/activityGenerator';
import individualActivities from './nl/individualActivities';
import groupActivities from './nl/groupActivities';
import classroom from './nl/classroom';
import tools from './nl/tools';
import languageSupport from './nl/languageSupport';
import playground from './nl/playground';
import tests from './nl/tests';
import publicProfile from './nl/publicProfile';
import publicTestSession from './nl/publicTestSession';
import publicDebateSession from './nl/publicDebateSession';
import nav from './nl/nav';
import pbl from './nl/pbl';
import safetyLab from './nl/safetyLab';

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
