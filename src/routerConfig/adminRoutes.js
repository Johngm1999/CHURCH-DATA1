import Overview from "../views/admin/overview/Overview";
import YouthList from "../views/admin/youth/YouthList";
import Parish from "../views/admin/parish/Parish";
import Global from "../views/admin/global/Global";
import DeletedYouth from "../views/admin/deleted/youth/DeletedYouth";

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
]);
export default adminRoutes;
