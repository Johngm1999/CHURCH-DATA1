import React, { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Loader from "../components/Loader.js";
// import AdminNavbar from '../components/navbar/AdminNavbar.js';
import Sidebar from "../components/sidebar/Sidebar.js";
import { useAuthenticationState } from "../context/Auth.context.js";
// import { useAxiosGet } from '../services/axiosHooks.js';
// import endpoints from '../services/endpoints.js';

const Dashboard = (props) => {
    const mainContent = React.useRef(null);
    const location = useLocation();
    const { user } = useAuthenticationState();

    // const notificationApi =
    //     user.type === 'FACULTY'
    //         ? endpoints.notification.instructor
    //         : endpoints.notification.admin;

    // const {
    //     response: notifications,
    //     loading,
    //     reFetch,
    // } = useAxiosGet(notificationApi);

    const [showSidebar, setShowSidebar] = useState(
        user?.user_role?.toLowerCase() === "admin"
    );

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    useEffect(() => {
        document.body.style.backgroundColor = "#F5F5F5";

        return () => {
            document.body.style.backgroundColor = "white";
        };
    }, []);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    return (
        <>
            {user?.user_role?.toLowerCase() === "admin" && (
                <Sidebar {...props} show={showSidebar} />
            )}

            <div
                style={{
                    marginLeft: `${showSidebar ? "250px" : "0px"}`,
                    position: "relative",
                    transition: "margin .25s",
                    height: "96vh",
                    overflow: "auto",
                }}
                ref={mainContent}
            >
                {/* <AdminNavbar
                    toggleSidebar={toggleSidebar}
                    showSidebar={showSidebar}
                    notifications={notifications}
                    reFetchNotifications={reFetch}
                /> */}
                <div className="px-5 mt-4">
                    {/* {loading ? <Loader /> : <Outlet />} */}
                    <Outlet />
                </div>
                {/* <footer className='py-4' /> */}
            </div>
        </>
    );
};

export default Dashboard;
