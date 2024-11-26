import React, { useState } from "react";
import { Tabs, Tab, Box, Badge } from "@mui/material";
import GlobalComplete from "./GlobalComplete"; // Assuming default export
import GlobalIncomplete from "./GlobalIncomplete"; // Assuming default export
import { useAxiosGet } from "../../../hooks/axiosHooks";
import endpoints from "../../../services/endpoints";
import axios from "axios";

function GlobalList() {
    const [value, setValue] = useState(0); // State to manage active tab
    const [inComp, setIncomp] = useState(false);
    const response = useAxiosGet(endpoints.global.incompleteCount);
    const [incompleteCount, setIncompleteCount] = useState(0);

    const hasIncompleteData =
        inComp > 0 || response?.response?.incompleteCount > 0; // Change this based on your data logi

    const incompCount = incompleteCount || response?.response?.incompleteCount;

    const handleChange = (event, newValue) => {
        setValue(newValue); // Update active tab value
    };

    const getIncompleteDataCount = async () => {
        try {
            const response = await axios.get(endpoints.parish.incompleteCount);

            if (response.status === 200 && !response.data.isError) {
                // Extract the incomplete count from the response
                const incompleteCount =
                    response?.data?.responseData?.incompleteCount;
                setIncomp(incompleteCount > 0);
                setIncompleteCount(incompleteCount);
            } else {
                console.error(
                    "Error fetching incomplete data count:",
                    response.data.message
                );
                setIncomp(false);
                setIncompleteCount(0);
            }
        } catch (error) {
            console.error("Error occurred during API call:", error.message);
        }
    };

    return (
        <Box>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="inherit"
                sx={{
                    bgcolor: "white", // Background color of the tabs
                    width: "50%",
                    borderBottom: 1,
                    borderColor: "divider",
                    borderRadius: 10,
                    boxShadow: 10,
                }}
            >
                <Tab
                    label="Completed"
                    sx={{
                        width: "50%",
                        fontWeight: value === 0 ? "bold" : "normal", // Bold text for the active tab
                        "&:hover": {
                            bgcolor: "lightgray", // Background on hover
                        },
                        "&.Mui-selected": {
                            bgcolor: "lightblue", // Background when selected
                            color: "black", // Text color when selected
                        },
                    }}
                />
                <Tab
                    label={
                        <Box sx={{ position: "relative" }}>
                            Incomplete
                            {hasIncompleteData && (
                                <Badge
                                    color="success"
                                    badgeContent={incompCount || 0}
                                    max={500}
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        right: -70,
                                        "& .MuiBadge-dot": {
                                            width: 20, // Change width to your desired size
                                            height: 20, // Change height to your desired size
                                            borderRadius: 10,
                                        },
                                    }}
                                />
                            )}
                        </Box>
                    }
                    sx={{
                        width: "50%",
                        fontWeight: value === 1 ? "bold" : "normal", // Bold text for the active tab
                        "&:hover": {
                            bgcolor: "lightgray", // Background on hover
                        },
                        "&.Mui-selected": {
                            bgcolor: "lightblue", // Background when selected
                            color: "black", // Text color when selected
                        },
                    }}
                />
            </Tabs>
            <Box sx={{ p: 3 }}>
                {value === 0 && (
                    <GlobalComplete
                        getIncompleteDataCount={getIncompleteDataCount}
                    />
                )}{" "}
                {/* Render GlobalComplete component for the first tab */}
                {value === 1 && (
                    <GlobalIncomplete
                        getIncompleteDataCount={getIncompleteDataCount}
                    />
                )}{" "}
                {/* Render GlobalIncomplete component for the second tab */}
            </Box>
        </Box>
    );
}

export default GlobalList;
