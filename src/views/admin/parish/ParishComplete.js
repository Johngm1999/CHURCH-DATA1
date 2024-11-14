import { useState } from "react";
import PaginatedTable from "../../../components/table/PaginatedTable";
import endpoints from "../../../services/endpoints";
import ParishForm from "./ParishForm";
import ParishDataDisplayForm from "./ParishDataDisplayForm";
import { useAxiosGet } from "../../../hooks/axiosHooks";
import viewProps from "../../viewprops";
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Box,
    Typography,
    Grid,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import toast from "react-hot-toast";
import DownloadExcel from "../../../components/DownloadExcel";

function ParishComplete({ getIncompleteDataCount }) {
    const [page, setPage] = useState(1);
    const [triggerApiCall, setTriggerApiCall] = useState(true);

    // States for multiple search criteria
    const [searchParams, setSearchParams] = useState({
        name: "",
        mobileNumber: "",
        unit: "",
        familyName: "",
    });

    const [isSearching, setIsSearching] = useState(false); // Whether a search is active

    // Search Criteria Selection
    const [selectedCriteria, setSelectedCriteria] = useState({
        name: false,
        familyName: false,
        mobileNumber: false,
        unit: false,
    });

    // Build the search query string based on searchParams object
    const buildSearchQuery = () => {
        let query = "";
        Object.keys(searchParams).forEach((key) => {
            if (searchParams[key]) {
                query += `${key}=${searchParams[key]}&`;
            }
        });
        return query.slice(0, -1); // Remove the trailing '&'
    };

    // Conditional URL based on whether the user is searching or not
    const url = isSearching
        ? `${
              endpoints.parish.search
          }?page=${page}&limit=10&${buildSearchQuery()}`
        : `${endpoints.parish.get}?page=${page}&limit=10`;

    const fetchUtils = useAxiosGet(url, { preventCall: !triggerApiCall });

    const handleNext = (page) => {
        setPage(page);
        setTriggerApiCall(true);
    };

    const handlePrevious = (page) => {
        setPage(page);
        setTriggerApiCall(true);
    };
    const handleFirst = () => {
        setPage(1);
        setTriggerApiCall(true);
    };
    const handleLast = (totalPages) => {
        setPage(totalPages);
        setTriggerApiCall(true);
    };
    const handlePageJump = (page, totalPages) => {
        const pageNumber = Math.max(1, Math.min(totalPages, Number(page)));
        setPage(pageNumber);
        setTriggerApiCall(true);
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevParams) => ({
            ...prevParams,
            [name]: value,
        }));
    };

    // Handle Search criteria change
    const handleCriteriaChange = (e) => {
        const { name, checked } = e.target;
        setSelectedCriteria((prevCriteria) => ({
            ...prevCriteria,
            [name]: checked,
        }));

        if (!checked) {
            setSearchParams((prevTerms) => ({
                ...prevTerms,
                [name]: "", // Set the corresponding search term to an empty string
            }));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true); // Set the mode to searching
        setPage(1); // Reset to first page on search
        setTriggerApiCall(true); // Trigger API call with search parameters
    };

    const handleResetSearch = () => {
        setSearchParams({
            name: "",
            familyName: "",
            mobileNumber: "",
            unit: "",
        }); // Clear the search fields
        setSelectedCriteria({
            name: false,
            familyName: false,
            mobileNumber: false,
            unit: false,
        }); // Reset the criteria selection
        setIsSearching(false); // Exit search mode
        setPage(1); // Reset to first page
        setTriggerApiCall(true); // Trigger API call for default data
    };

    const hasSearchParams =
        searchParams.mobileNumber ||
        searchParams.familyName ||
        searchParams.unit ||
        searchParams.name;

    const shouldDisplayResults =
        fetchUtils.response.length > 0 ||
        (fetchUtils.response.length <= 0 && hasSearchParams);

    return (
        <>
            <Box sx={{ marginBottom: 4 }}>
                {shouldDisplayResults && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Search Criteria
                        </Typography>

                        <Box
                            display="flex"
                            justifyContent="space-around"
                            flexWrap="wrap"
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedCriteria.name}
                                        onChange={handleCriteriaChange}
                                        name="name"
                                    />
                                }
                                label="Head of the family"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedCriteria.familyName}
                                        onChange={handleCriteriaChange}
                                        name="familyName"
                                    />
                                }
                                label="Family Name"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedCriteria.mobileNumber}
                                        onChange={handleCriteriaChange}
                                        name="mobileNumber"
                                    />
                                }
                                label="Mobile Number"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedCriteria.unit}
                                        onChange={handleCriteriaChange}
                                        name="unit"
                                    />
                                }
                                label="Unit"
                            />
                        </Box>

                        {/* Search Fields */}
                        <form onSubmit={handleSearch}>
                            <Grid container spacing={2} my={2}>
                                {selectedCriteria.name && (
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Name"
                                            variant="outlined"
                                            name="name"
                                            value={searchParams.name}
                                            onChange={handleSearchChange}
                                            fullWidth
                                        />
                                    </Grid>
                                )}
                                {selectedCriteria.familyName && (
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Family Name"
                                            variant="outlined"
                                            name="familyName"
                                            value={searchParams.familyName}
                                            onChange={handleSearchChange}
                                            fullWidth
                                        />
                                    </Grid>
                                )}
                                {selectedCriteria.mobileNumber && (
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Mobile Number"
                                            variant="outlined"
                                            name="mobileNumber"
                                            value={searchParams.mobileNumber}
                                            onChange={handleSearchChange}
                                            fullWidth
                                        />
                                    </Grid>
                                )}
                                {selectedCriteria.unit && (
                                    <Grid item xs={12} sm={6}>
                                        <FormControl
                                            fullWidth
                                            variant="outlined"
                                        >
                                            <InputLabel>Unit</InputLabel>
                                            <Select
                                                label="Unit"
                                                name="unit"
                                                value={searchParams.unit || ""}
                                                onChange={handleSearchChange}
                                            >
                                                <MenuItem value="">
                                                    <em>Select your Unit</em>
                                                </MenuItem>
                                                {[
                                                    {
                                                        key: "St Augustine",
                                                        value: "St_Augustine",
                                                    },
                                                    {
                                                        key: "St Alphonsa",
                                                        value: "St_Alphonsa",
                                                    },
                                                    {
                                                        key: "St Chavara",
                                                        value: "St_Chavara",
                                                    },
                                                    {
                                                        key: "St Domenic Savio",
                                                        value: "St_Domenic_Savio",
                                                    },
                                                    {
                                                        key: "St George",
                                                        value: "St_George",
                                                    },
                                                    {
                                                        key: "St John's",
                                                        value: "St_Johns",
                                                    },
                                                    {
                                                        key: "St Joseph",
                                                        value: "St_Joseph",
                                                    },
                                                    {
                                                        key: "St Little Flower",
                                                        value: "St_Little_Flower",
                                                    },
                                                    {
                                                        key: "St Matthews",
                                                        value: "St_Matthews",
                                                    },
                                                    {
                                                        key: "St Mary's",
                                                        value: "St_Marys",
                                                    },
                                                    {
                                                        key: "St Mother Theresa",
                                                        value: "St_Mother_Theresa",
                                                    },
                                                    {
                                                        key: "St Mariagorety",
                                                        value: "St_Mariagorety",
                                                    },
                                                    {
                                                        key: "St Peter and Paul",
                                                        value: "St_Peter_and_Paul",
                                                    },
                                                    {
                                                        key: "St Jude",
                                                        value: "St_Jude",
                                                    },
                                                    {
                                                        key: "St Thomas",
                                                        value: "St_Thomas",
                                                    },
                                                    {
                                                        key: "St Antony's",
                                                        value: "St_Antonys",
                                                    },
                                                    {
                                                        key: "St Xavier's",
                                                        value: "St_Xaviers",
                                                    },
                                                ].map((option) => (
                                                    <MenuItem
                                                        value={option.value}
                                                        key={option.value}
                                                    >
                                                        {option.key}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                )}
                            </Grid>

                            {/* Search and Reset Buttons */}
                            {(searchParams.mobileNumber ||
                                searchParams.name ||
                                searchParams.unit ||
                                searchParams.familyName) && (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    mt={3}
                                >
                                    <Button
                                        variant="contained"
                                        color={
                                            searchParams.dobFrom &&
                                            !searchParams.dobTo
                                                ? "error"
                                                : "success"
                                        }
                                        type="submit"
                                        // disabled={
                                        //     searchParams.dobFrom && !searchParams.dobTo
                                        // }
                                        // title={
                                        //     "Button only available if yo select complete DOB range"
                                        // }
                                    >
                                        Search
                                    </Button>
                                    <DownloadExcel
                                        apiEndpoint={`${
                                            endpoints.parish.search
                                        }?${buildSearchQuery()}`}
                                        filename="Parish-user-search-list"
                                    />
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleResetSearch}
                                    >
                                        Reset
                                    </Button>
                                </Box>
                            )}
                        </form>
                    </>
                )}
            </Box>

            {/* Paginated Table */}
            <PaginatedTable
                handleNext={handleNext}
                {...viewProps.ParishDetails}
                handlePrevious={handlePrevious}
                Form={ParishForm}
                endpoints={endpoints.parish}
                formSize="lg"
                {...fetchUtils}
                getIncompleteDataCount={getIncompleteDataCount}
                pagination={fetchUtils.pagination}
                handleFirst={handleFirst}
                handleLast={handleLast}
                handlePageJump={handlePageJump}
                DisplayForm={ParishDataDisplayForm}
                showFullDetails
                headerExtras={
                    <DownloadExcel
                        apiEndpoint={endpoints.parish.getDataForExcel}
                        filename="Parish-user-list"
                    />
                }
            />
        </>
    );
}

export default ParishComplete;
