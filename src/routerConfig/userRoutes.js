import { lazy } from "react";

// Lazy load the components
const UserDash = lazy(() => import("../views/user/UserDash"));

const userRoutes = Object.freeze([
    {
        path: "",
        page: UserDash,
        name: "Dashboard",
    },
]);
export default userRoutes;
