import React from "react";
import { Navbar } from "react-bootstrap";
// import { useAuthenticationState } from "../../context/Auth.context";
// import Notification from "./Notification";
import Profile from "./Profile";

function AdminNavbar({
    brandText,
    toggleSidebar,
    showSidebar,
    notifications,
    reFetchNotifications,
}) {
    return (
        <Navbar
            className="px-5 py-4"
            variant="light"
            bg="white"
            style={{
                boxShadow:
                    "0px -1.21081px 3.63243px rgba(0, 0, 0, 0.11), 0px -6.45766px 14.5297px rgba(0, 0, 0, 0.13)",
            }}
        >
            {/* <span className='ms-1'>
                <FormCheck
                    type='switch'
                    checked={showSidebar}
                    onChange={toggleSidebar}
                />
            </span> */}
            <span className="me-auto" />
            {/* <Notification
                notifications={notifications}
                refetch={reFetchNotifications}
            /> */}

            <Profile />
        </Navbar>
    );
}

export default AdminNavbar;
