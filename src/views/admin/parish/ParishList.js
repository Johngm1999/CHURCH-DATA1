import React, { useState } from "react";
import { Tabs, Tab, Box, Badge } from "@mui/material";
import ParishComplete from "./ParishComplete"; // Assuming default export
import ParishIncomplete from "./ParishIncomplete"; // Assuming default export
import { useAxiosGet } from "../../../hooks/axiosHooks";
import endpoints from "../../../services/endpoints";
import axios from "axios";

function ParishList() {
    const [value, setValue] = useState(0); // State to manage active tab
    const [inComp, setIncomp] = useState(false);
    const response = useAxiosGet(endpoints.parish.incompleteCount);

    const hasIncompleteData = inComp || response?.response?.incompleteCount > 0; // Change this based on your data logic

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
            } else {
                console.error(
                    "Error fetching incomplete data count:",
                    response.data.message
                );
                setIncomp(false);
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
                                    variant="dot"
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        right: -85,
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
                    <ParishComplete
                        getIncompleteDataCount={getIncompleteDataCount}
                    />
                )}{" "}
                {/* Render ParishComplete component for the first tab */}
                {value === 1 && (
                    <ParishIncomplete
                        getIncompleteDataCount={getIncompleteDataCount}
                    />
                )}{" "}
                {/* Render ParishIncomplete component for the second tab */}
            </Box>
        </Box>
    );
}

export default ParishList;
