import { lazy } from "react";
import DeletedGlobal from "../views/admin/deleted/global/DeletedGlobal";

// Lazy load the components
const Overview = lazy(() => import("../views/admin/overview/Overview"));
const YouthList = lazy(() => import("../views/admin/youth/YouthList"));
const Parish = lazy(() => import("../views/admin/parish/Parish"));
const Global = lazy(() => import("../views/admin/global/GlobalList"));
const DeletedYouth = lazy(() =>
    import("../views/admin/deleted/youth/DeletedYouth")
);

const adminRoutes = Object.freeze([
    {
        path: "overview",
        page: Overview,
        name: "Dashboard",
    },
    {
        path: "overview-y",
        page: YouthList,
        name: "Youth",
        module: "Report",
    },
    {
        path: "overview-p",
        page: Parish,
        name: "Parish",
        module: "Report",
    },
    {
        path: "overview-g",
        page: Global,
        name: "Global",
        module: "Report",
    },
    {
        path: "youth-removed",
        page: DeletedYouth,
        name: "Deleted Youth Data",
        module: "Deleted Data",
    },
    {
        path: "global-removed",
        page: DeletedGlobal,
        name: "Deleted Global Data",
        module: "Deleted Data",
    },
]);

export default adminRoutes;
