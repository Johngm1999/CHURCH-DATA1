import { useState } from "react";
import PaginatedTable from "../../../components/table/PaginatedTable";
import endpoints from "../../../services/endpoints";
import YouthDataCollectionForm from "./YouthForm";
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
} from "@mui/material";

function Youthcomplete({ getIncompleteDataCount }) {
    const [page, setPage] = useState(1);
    const [triggerApiCall, setTriggerApiCall] = useState(true);

    // States for multiple search criteria
    const [searchParams, setSearchParams] = useState({
        name: "",
        dob: "",
        mobileNumber: "",
        unit: "",
        education: "",
    });

    const [isSearching, setIsSearching] = useState(false); // Whether a search is active

    // Search Criteria Selection
    const [selectedCriteria, setSelectedCriteria] = useState({
        name: false,
        dob: false,
        mobileNumber: false,
        unit: false,
        education: false,
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
              endpoints.youth.search
          }?page=${page}&limit=10&${buildSearchQuery()}`
        : `${endpoints.youth.get}?page=${page}&limit=10`;

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

    const cellModifier = {
        "sacraments.baptism": ({ value }) => (value == 1 ? "yes" : "no"),
        "sacraments.holyCommunion": ({ value }) => (value == 1 ? "yes" : "no"),
        "sacraments.confirmation": ({ value }) => (value == 1 ? "yes" : "no"),
        pendingSacraments: ({ value }) => (value ? value : "Nothing Pending"),
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
            dob: "",
            mobileNumber: "",
            unit: "",
            education: "",
        }); // Clear the search fields
        setSelectedCriteria({
            name: false,
            dob: false,
            mobileNumber: false,
            unit: false,
            education: false,
        }); // Reset the criteria selection
        setIsSearching(false); // Exit search mode
        setPage(1); // Reset to first page
        setTriggerApiCall(true); // Trigger API call for default data
    };

    return (
        <>
            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Search Criteria
                </Typography>

                {/* Search Criteria Selection */}
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
                                checked={selectedCriteria.education}
                                onChange={handleCriteriaChange}
                                name="education"
                            />
                        }
                        label="Education"
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
                        {selectedCriteria.dob && (
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Date of Birth"
                                    variant="outlined"
                                    type="date"
                                    name="dob"
                                    value={searchParams.dob}
                                    onChange={handleSearchChange}
                                    InputLabelProps={{ shrink: true }}
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
                                <TextField
                                    label="Unit"
                                    variant="outlined"
                                    name="unit"
                                    value={searchParams.unit}
                                    onChange={handleSearchChange}
                                    fullWidth
                                />
                            </Grid>
                        )}
                        {selectedCriteria.education && (
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Education"
                                    variant="outlined"
                                    name="education"
                                    value={searchParams.education}
                                    onChange={handleSearchChange}
                                    fullWidth
                                />
                            </Grid>
                        )}
                    </Grid>

                    {/* Search and Reset Buttons */}
                    {(setSearchParams.education ||
                        searchParams.dob ||
                        searchParams.mobileNumber ||
                        searchParams.name) && (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            mt={3}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
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
            </Box>
            {console.log("fetchUtils.response?.pagination", fetchUtils)}

            {/* Paginated Table */}
            <PaginatedTable
                handleNext={handleNext}
                {...viewProps.YouthDetails}
                handlePrevious={handlePrevious}
                Form={YouthDataCollectionForm}
                endpoints={endpoints.youth}
                formSize="lg"
                {...fetchUtils}
                getIncompleteDataCount={getIncompleteDataCount}
                cellModifier={cellModifier}
                pagination={fetchUtils.pagination}
                handleFirst={handleFirst}
                handleLast={handleLast}
                handlePageJump={handlePageJump}
            />
        </>
    );
}

export default Youthcomplete;
