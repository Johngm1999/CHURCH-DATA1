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
        getDataForExcel: "youth/getDataForExcel",
    },
    dashboard: {
        get: "dashboard/",
        changePassword: "dashboard/changePassword",
        changeUserPassword: "dashboard/changeUserPassword",
        certificateHstory: "dashboard/history",
        generatePdf: "dashboard/generatePdf",
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
        getDataForExcel: "global/getDataForExcel",
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
        getDataForExcel: "parish/getDataForExcel",
    },
});

export default endpoints;
