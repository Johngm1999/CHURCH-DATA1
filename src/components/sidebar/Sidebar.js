import React from "react";
import Menu from "./Menu";
import { Box } from "@mui/material";
import LogoutWithWarning from "../Logout";

function Sidebar({ routes, show }) {
    const sidebarStyle = {
        width: "250px",
        position: "fixed",
        height: "95vh",
        transform: `translateX(${show ? "0%" : "-100%"})`,
        transition: "transform .25s",
        background: "#8ce0fa",
        borderRadius: "10px",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 100,
    };

    return (
        <Box
            style={sidebarStyle}
            sx={{ boxShadow: 6, borderTop: "50px solid lightblue" }}
            className="bg-primary"
        >
            {/* Header */}
            <div
                className="h4 pt-4 ps-4 text-secondary"
                style={{ fontWeight: 700, height: "100px" }}
            >
                CHURCH-PORTAL
            </div>

            {/* Menu Section */}
            <div
                style={{
                    height: "calc(100vh - 160px)", // Leave space for the logout button
                    overflowY: "auto",
                }}
                className="px-4 py-3"
            >
                <Menu routes={routes} />
            </div>

            {/* Logout Button at the Bottom */}
            {/* <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}> */}
            {/* <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={logout}
                >
                    Logout
                </Button> */}
            {/* <LogoutWithWarning /> */}
            {/* </Box> */}
        </Box>
    );
}

export default Sidebar;
