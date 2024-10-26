import { useState } from "react";
import PaginatedTable from "../../../components/table/PaginatedTable";
import endpoints from "../../../services/endpoints";
import GlobalForm from "./GlobalForm";
import GlobalDataDisplayForm from "./GlobalDataDisplayForm";
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

function GlobalComplete({ getIncompleteDataCount }) {
    const [page, setPage] = useState(1);
    const [triggerApiCall, setTriggerApiCall] = useState(true);

    // States for multiple search criteria
    const [searchParams, setSearchParams] = useState({
        name: "",
        mobileNumber: "",
        unit: "",
        maritialStatus: "",
        dobFrom: "",
        dobTo: "",
        country: "",
    });

    const [isSearching, setIsSearching] = useState(false); // Whether a search is active

    // Search Criteria Selection
    const [selectedCriteria, setSelectedCriteria] = useState({
        name: false,
        dob: false,
        mobileNumber: false,
        unit: false,
        maritialStatus: false,
        country: false,
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
              endpoints.global.search
          }?page=${page}&limit=10&${buildSearchQuery()}`
        : `${endpoints.global.get}?page=${page}&limit=10`;

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
            if (name === "dob")
                setSearchParams((prevTerms) => ({
                    ...prevTerms,
                    dobFrom: "", // Set the corresponding search term to an empty string
                    dobTo: "",
                }));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchParams.dobFrom && !searchParams.dobTo) {
            toast.error(
                "Search is only available if you select the complete DOB range (From and To)."
            );
            return;
        }
        setIsSearching(true); // Set the mode to searching
        setPage(1); // Reset to first page on search
        setTriggerApiCall(true); // Trigger API call with search parameters
    };

    const handleResetSearch = () => {
        setSearchParams({
            name: "",
            dob: "",
            mobileNumber: "",
            unit: "",
            maritialStatus: "",
            dobFrom: "",
            dobTo: "",
            country: "",
        }); // Clear the search fields
        setSelectedCriteria({
            name: false,
            dob: false,
            mobileNumber: false,
            unit: false,
            maritialStatus: false,
            country: false,
        }); // Reset the criteria selection
        setIsSearching(false); // Exit search mode
        setPage(1); // Reset to first page
        setTriggerApiCall(true); // Trigger API call for default data
    };

    const hasSearchParams =
        searchParams.maritialStatus ||
        (searchParams.dobFrom && searchParams.dobTo) ||
        searchParams.mobileNumber ||
        searchParams.name ||
        searchParams.unit ||
        searchParams.country;

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
                                label="Name"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedCriteria.country}
                                        onChange={handleCriteriaChange}
                                        name="country"
                                    />
                                }
                                label="Country"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedCriteria.dob}
                                        onChange={handleCriteriaChange}
                                        name="dob"
                                    />
                                }
                                label="Date of Birth"
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            selectedCriteria.maritialStatus
                                        }
                                        onChange={handleCriteriaChange}
                                        name="maritialStatus"
                                    />
                                }
                                label="Marital Status"
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
                                {selectedCriteria.country && (
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Country Of Residence"
                                            variant="outlined"
                                            name="country"
                                            value={searchParams.country}
                                            onChange={handleSearchChange}
                                            fullWidth
                                        />
                                    </Grid>
                                )}
                                {selectedCriteria.dob && (
                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Date of Birth (From)"
                                                    variant="outlined"
                                                    type="date"
                                                    name="dobFrom"
                                                    value={searchParams.dobFrom}
                                                    onChange={
                                                        handleSearchChange
                                                    }
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Date of Birth (To)"
                                                    variant="outlined"
                                                    type="date"
                                                    name="dobTo"
                                                    disabled={
                                                        !searchParams.dobFrom
                                                    }
                                                    value={searchParams.dobTo}
                                                    onChange={
                                                        handleSearchChange
                                                    }
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
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
                                {selectedCriteria.maritialStatus && (
                                    <Grid item xs={12} sm={6}>
                                        <FormControl
                                            fullWidth
                                            variant="outlined"
                                        >
                                            <InputLabel>
                                                Marital Status
                                            </InputLabel>
                                            <Select
                                                label="maritialStatus"
                                                name="maritialStatus"
                                                value={
                                                    searchParams.maritialStatus ||
                                                    ""
                                                }
                                                onChange={handleSearchChange}
                                            >
                                                <MenuItem value="">
                                                    <em>
                                                        Select your Maritial
                                                        Status
                                                    </em>
                                                </MenuItem>
                                                {[
                                                    {
                                                        key: "Single",
                                                        value: "Single",
                                                    },
                                                    {
                                                        key: "Widow",
                                                        value: "Widow",
                                                    },
                                                    {
                                                        key: "Divorced",
                                                        value: "Divorced",
                                                    },
                                                    {
                                                        key: "Other",
                                                        value: "Other",
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
                            {(searchParams.maritialStatus ||
                                (searchParams.dobFrom && searchParams.dobTo) ||
                                searchParams.mobileNumber ||
                                searchParams.name ||
                                searchParams.unit ||
                                searchParams.country) && (
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
                {...viewProps.GlobalDetails}
                handlePrevious={handlePrevious}
                Form={GlobalForm}
                endpoints={endpoints.global}
                formSize="lg"
                {...fetchUtils}
                getIncompleteDataCount={getIncompleteDataCount}
                pagination={fetchUtils.pagination}
                handleFirst={handleFirst}
                handleLast={handleLast}
                handlePageJump={handlePageJump}
                DisplayForm={GlobalDataDisplayForm}
                showFullDetails
                isComplete
            />
        </>
    );
}

export default GlobalComplete;
