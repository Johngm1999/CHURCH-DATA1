const endpoints = Object.freeze({
    authentication: {
        login: "/auth/login",
        verify: "/auth/token",
        changePassword:
            "/instructor/activate_instrutor/changePasswordinstuctor",
        forgetPassword:
            "/instructor/activate_instrutor/forgotpassword_instructor",
    },
    youth: {
        add: "youth/add",
        update: "youth/update",
        delete: "youth/delete",
        get: "youth/",
        incompleteList: "youth/inomplete",
        incompleteCount: "youth/incomplete-count",
        search: "youth/search",
    },
    dashboard: {
        get: "dashboard/",
    },
});

export default endpoints;
