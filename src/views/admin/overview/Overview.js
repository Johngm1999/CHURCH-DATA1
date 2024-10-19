import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAxiosGet } from "../../../hooks/axiosHooks";
import endpoints from "../../../services/endpoints";

const ReportCard = ({ title, type, location, titleColor = "#000" }) => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                position: "relative",
                p: { xs: 3, sm: 4, md: 5 }, // Responsive padding
                borderRadius: 5,
                boxShadow: 6,
                width: { xs: "100%", sm: "80%", md: "110%" }, // Responsive width
                mx: "auto", // Center align
                mb: 3, // Margin for spacing between cards
                bgcolor: "#fff",
            }}
        >
            <Typography variant="body2" color="text.secondary" sx={{ pt: 6 }}>
                Click to view complete {type} Report
            </Typography>
            <Box
                sx={{
                    position: "absolute",
                    p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
                    top: { xs: -30, sm: -35, md: -40 }, // Responsive positioning for title box
                    bgcolor: titleColor,
                    borderRadius: 5,
                    width: { xs: "80%", sm: "70%", md: "90%" }, // Responsive width for title box
                    left: "50%",
                    transform: "translateX(-50%)", // Center align the box
                    color: "#fff",
                    textAlign: "center",
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, // Responsive font size
                    cursor: "pointer",
                    transition: "transform 0.3s, background-color 0.3s",
                    "&:hover": {
                        backgroundColor: "primary.dark", // Change color on hover
                    },
                }}
                onClick={() => navigate(location)}
            >
                {title}
            </Box>
        </Box>
    );
};

const Overview = () => {
    const data = useAxiosGet(endpoints.dashboard.get);

    const userCounts = {
        YouthData: 120,
        GlobalMembers: 45,
        ParishMembers: 80,
    };

    const reports = [
        {
            type: "Youth Data",
            title: "YOUTH DATA REPORT",
            color: "red",
            location: "/overview-y",
        },
        {
            type: "Global Data",
            title: "GLOBAL MEMBERS REPORT",
            color: "green",
            location: "/overview-g",
        },
        {
            type: "Parish Data",
            title: "PARISH MEMBERS REPORT",
            color: "#000",
            location: "/overview-p",
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography
                variant="h4"
                sx={{
                    p: 2,
                    textAlign: "center",
                    boxShadow: 3,
                    mb: 2,
                    borderRadius: 5,
                    fontWeight: 700,
                    bgcolor: "#fff",
                }}
            >
                CHURCH DATA PORTAL
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    px: 2,
                    textAlign: "center",
                    boxShadow: 3,
                    my: 6,
                    borderRadius: 2,
                    width: "12%",
                    bgcolor: "greenyellow",
                }}
            >
                Data Count
            </Typography>
            <Grid container spacing={3}>
                {/* Members Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{ padding: 3, textAlign: "center" }}
                    >
                        <Typography variant="h6">Youth Data</Typography>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: "bold", color: "primary.main" }}
                        >
                            {data.response.youthCount}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Volunteers Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{ padding: 3, textAlign: "center" }}
                    >
                        <Typography variant="h6">Global Members</Typography>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: "bold", color: "primary.main" }}
                        >
                            {data.response.GlobalMembers || 0}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Donors Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{ padding: 3, textAlign: "center" }}
                    >
                        <Typography variant="h6">Parish Members</Typography>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: "bold", color: "primary.main" }}
                        >
                            {data.response.ParishMembers || 0}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Typography
                variant="h6"
                sx={{
                    px: 2,
                    textAlign: "center",
                    boxShadow: 3,
                    my: 4,
                    borderRadius: 2,
                    width: "15%",
                    bgcolor: "greenyellow",
                }}
            >
                Data Report
            </Typography>
            <Grid container spacing={6} sx={{ mt: 8 }}>
                {reports.map(({ type, title, color, location }) => (
                    <Grid item xs={12} sm={6} md={4} key={type}>
                        <ReportCard
                            title={title}
                            type={type}
                            titleColor={color}
                            location={location}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Overview;
