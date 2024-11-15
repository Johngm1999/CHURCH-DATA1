import { useState } from "react";
import PaginatedTable from "../../../components/table/PaginatedTable";
import endpoints from "../../../services/endpoints";
import YouthDataCollectionForm from "./YouthForm";
import YouthDataDisplayFrom from "./YouthDataDisplayForm";
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

function Youthcomplete({ getIncompleteDataCount }) {
    const [page, setPage] = useState(1);
    const [triggerApiCall, setTriggerApiCall] = useState(true);

    // States for multiple search criteria
    const [searchParams, setSearchParams] = useState({
        name: "",
        mobileNumber: "",
        unit: "",
        education: "",
        dobFrom: "",
        dobTo: "",
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
        "sacraments.baptism": ({ value }) =>
            Number(value) === 1 ? "yes" : "no",
        "sacraments.holyCommunion": ({ value }) =>
            Number(value) === 1 ? "yes" : "no",
        "sacraments.confirmation": ({ value }) =>
            Number(value) === 1 ? "yes" : "no",
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
            education: "",
            dobFrom: "",
            dobTo: "",
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

    const hasSearchParams =
        searchParams.education ||
        (searchParams.dobFrom && searchParams.dobTo) ||
        searchParams.mobileNumber ||
        searchParams.name ||
        searchParams.unit;

    const shouldDisplayResults =
        fetchUtils.response.length > 0 ||
        (fetchUtils.response.length <= 0 && hasSearchParams);

    return (
        <>
            {shouldDisplayResults && (
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
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Date of Birth (From)"
                                                variant="outlined"
                                                type="date"
                                                name="dobFrom"
                                                value={searchParams.dobFrom}
                                                onChange={handleSearchChange}
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
                                                disabled={!searchParams.dobFrom}
                                                value={searchParams.dobTo}
                                                onChange={handleSearchChange}
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
                                    <FormControl fullWidth variant="outlined">
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
                            {selectedCriteria.education && (
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Education</InputLabel>
                                        <Select
                                            label="Education"
                                            name="education"
                                            value={searchParams.education || ""}
                                            onChange={handleSearchChange}
                                        >
                                            <MenuItem value="">
                                                <em>
                                                    Select your qualification
                                                </em>
                                            </MenuItem>
                                            {[
                                                {
                                                    key: "Below 10th",
                                                    value: "below_10th",
                                                },
                                                {
                                                    key: "10th Pass",
                                                    value: "10th_pass",
                                                },
                                                {
                                                    key: "12th Pass",
                                                    value: "12th_pass",
                                                },
                                                {
                                                    key: "Graduate",
                                                    value: "graduate",
                                                },
                                                {
                                                    key: "Post Graduate",
                                                    value: "post_graduate",
                                                },
                                                {
                                                    key: "Diploma/Certification",
                                                    value: "diploma_certification",
                                                },
                                                {
                                                    key: "Other",
                                                    value: "other",
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
                        {(searchParams.education ||
                            (searchParams.dobFrom && searchParams.dobTo) ||
                            searchParams.mobileNumber ||
                            searchParams.name ||
                            searchParams.unit) && (
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
                                        endpoints.youth.search
                                    }?${buildSearchQuery()}`}
                                    filename="Youth-user-search-list"
                                    isSearch
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
                </Box>
            )}

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
                DisplayForm={YouthDataDisplayFrom}
                showFullDetails
                headerExtras={
                    <DownloadExcel
                        apiEndpoint={endpoints.youth.getDataForExcel}
                        filename="Youth-user-list"
                    />
                }
            />
        </>
    );
}

export default Youthcomplete;
