import React, { useContext } from "react";
import Menu from "./Menu";
import { Margin } from "@mui/icons-material";
import { Box } from "@mui/material";

function Sidebar({ routes, show }) {
    const sidebarStyle = {
        width: "250px",
        position: "fixed",
        height: "95vh",
        transform: `translateX(${show ? "0%" : "-100%"})`,
        transition: "transform .25s",
        background:'#8ce0fa',
        borderRadius:'10px',
        margin:'10px'
    };

    return (
        <Box style={sidebarStyle} sx={{boxShadow:5}} className='bg-primary '>
            <div
                className='h4 pt-4 ps-4 text-secondary'
                style={{ fontWeight: 700, height: '100px'}}
            >
                Church-Portal
            </div>
            <div
                style={{
                    height: 'calc(100vh - 100px)',
                    overflowY: 'auto',
                }}
                className='px-4 py-3'
            >
                <Menu routes={routes} />
            </div>
        </Box>
    );
}

export default Sidebar;
