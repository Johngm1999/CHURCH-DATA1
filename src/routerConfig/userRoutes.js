import UserDash from "../views/user/UserDash";

const userRoutes = Object.freeze([
    {
        path: "overview",
        page: UserDash,
        name: "Dashboard",
    },
]);
export default userRoutes;
