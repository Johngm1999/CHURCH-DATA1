import React, { useContext } from "react";
import Menu from "./Menu";
import { Box, Button } from "@mui/material";
import { useAuthenticationState } from "../../context/Auth.context";

function Sidebar({ routes, show }) {
    const { logout } = useAuthenticationState();
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
    };

    return (
        <Box style={sidebarStyle} sx={{ boxShadow: 5 }} className="bg-primary">
            {/* Header */}
            <div
                className="h4 pt-4 ps-4 text-secondary"
                style={{ fontWeight: 700, height: "100px" }}
            >
                Church-Portal
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
            <Box sx={{ p: 3 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={logout} // Assuming you have a logout function
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
}

export default Sidebar;
