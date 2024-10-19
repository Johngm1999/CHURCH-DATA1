import React from "react";
import {
    ChevronLeft,
    ChevronRight,
    FirstPage,
    LastPage,
} from "@mui/icons-material";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";

function AdvancedPagination({
    currentPage,
    totalPages,
    totalRecords,
    recordsPerPage,
    handlePrevious,
    handleNext,
    handleFirst,
    handleLast,
    handlePageJump,
}) {
    const startRecord = (currentPage - 1) * recordsPerPage + 1;
    const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <Box
            className="paginate"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
            {/* First Page Button */}
            <Button
                variant="outlined"
                disabled={currentPage === 1}
                onClick={handleFirst}
                startIcon={<FirstPage />}
            >
                First
            </Button>

            {/* Previous Page Button */}
            <Button
                variant="outlined"
                disabled={currentPage === 1}
                onClick={() => handlePrevious(currentPage - 1)}
                startIcon={<ChevronLeft />}
            >
                Previous
            </Button>

            {/* Page Info */}
            <Box
                className="page"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
                <Select
                    variant="standard"
                    disabled={totalPages === 1}
                    value={currentPage || 1}
                    onChange={(e) =>
                        handlePageJump(Number(e.target.value), totalPages)
                    }
                    sx={{ width: 80 }}
                >
                    {pageNumbers.map((page) => (
                        <MenuItem key={page} value={page}>
                            {page}
                        </MenuItem>
                    ))}
                </Select>
                <span>:</span>
                <Box sx={{ fontWeight: 700 }}>{totalPages}</Box>
            </Box>

            {/* Next Page Button */}
            <Button
                variant="outlined"
                disabled={currentPage === totalPages}
                onClick={() => handleNext(currentPage + 1)}
                endIcon={<ChevronRight />}
            >
                Next
            </Button>

            {/* Last Page Button */}
            <Button
                variant="outlined"
                disabled={currentPage === totalPages}
                onClick={() => handleNext(totalPages)}
                endIcon={<LastPage />}
            >
                Last
            </Button>

            {/* Records Info */}
            <Box className="records-info" sx={{ ml: "auto" }}>
                <span>
                    Showing {startRecord} to {endRecord} of {totalRecords}{" "}
                    records
                </span>
            </Box>
        </Box>
    );
}

export default AdvancedPagination;
