const endpoints = Object.freeze({
    authentication: {
        login: "/auth/login",
        verify: "/auth/token",
        changePassword:
            "/instructor/activate_instrutor/changePasswordinstuctor",
        forgetPassword:
            "/instructor/activate_instrutor/forgotpassword_instructor",
        logout: "/auth/logout",
    },
    youth: {
        add: "youth/add",
        update: "youth/update",
        delete: "youth/delete",
        get: "youth/",
        incompleteList: "youth/inomplete",
        incompleteCount: "youth/incomplete-count",
        search: "youth/search",
        deletedYouth: "youth/deletedYouth",
        restoreYouth: "youth/restoreYouth",
        permanentDelete: "youth/permanentDelete",
    },
    dashboard: {
        get: "dashboard/",
        changePassword: "dashboard/changePassword",
        changeUserPassword: "dashboard/changeUserPassword",
    },
    global: {
        add: "global/add",
        update: "global/update",
        delete: "global/delete",
        get: "global/",
        incompleteList: "global/inomplete",
        incompleteCount: "global/incomplete-count",
        search: "global/search",
        deletedGlobal: "global/deletedGlobal",
        restoreGlobal: "global/restoreGlobal",
        permanentDelete: "global/permanentDelete",
    },
    parish: {
        add: "parish/add",
        update: "parish/update",
        delete: "parish/delete",
        get: "parish/",
        incompleteList: "parish/inomplete",
        incompleteCount: "parish/incomplete-count",
        search: "parish/search",
        deletedParish: "parish/deletedParish",
        restoreParish: "parish/restoreParish",
        permanentDelete: "parish/permanentDelete",
    },
});

export default endpoints;
