
import home from './de/home';
import common from './de/common';
import studentList from './de/studentList';
import relations from './de/relations';
import genders from './de/genders';
import shareProfile from './de/shareProfile';
import wheel from './de/wheel';
import dialog from './de/dialog';
import toasts from './de/toasts';
import subjects from './de/subjects';
import evaluations from './de/evaluations';
import coach from './de/coach';
import observations from './de/observations';
import attendance from './de/attendance';
import analytics from './de/analytics';
import exportData from './de/export';
import login from './de/login';
import logout from './de/logout';
import activityGenerator from './de/activityGenerator';
import individualActivities from './de/individualActivities';
import groupActivities from './de/groupActivities';
import classroom from './de/classroom';
import tools from './de/tools';
import languageSupport from './de/languageSupport';
import playground from './de/playground';
import tests from './de/tests';
import publicProfile from './de/publicProfile';
import publicTestSession from './de/publicTestSession';
import publicDebateSession from './de/publicDebateSession';
import nav from './de/nav';
import pbl from './de/pbl';
import safetyLab from './de/safetyLab';

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
