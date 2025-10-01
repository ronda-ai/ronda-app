
import home from './pl/home';
import common from './pl/common';
import studentList from './pl/studentList';
import relations from './pl/relations';
import genders from './pl/genders';
import shareProfile from './pl/shareProfile';
import wheel from './pl/wheel';
import dialog from './pl/dialog';
import toasts from './pl/toasts';
import subjects from './pl/subjects';
import evaluations from './pl/evaluations';
import coach from './pl/coach';
import observations from './pl/observations';
import attendance from './pl/attendance';
import analytics from './pl/analytics';
import exportData from './pl/export';
import login from './pl/login';
import logout from './pl/logout';
import activityGenerator from './pl/activityGenerator';
import individualActivities from './pl/individualActivities';
import groupActivities from './pl/groupActivities';
import classroom from './pl/classroom';
import tools from './pl/tools';
import languageSupport from './pl/languageSupport';
import playground from './pl/playground';
import tests from './pl/tests';
import publicProfile from './pl/publicProfile';
import publicTestSession from './pl/publicTestSession';
import publicDebateSession from './pl/publicDebateSession';
import nav from './pl/nav';
import pbl from './pl/pbl';
import safetyLab from './pl/safetyLab';

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
