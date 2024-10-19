import React from "react";
import { Button, Box } from "@mui/material";

function FormSubmissionBtn({ onCancel }) {
    return (
        <Box
            textAlign="center"
            py={4}
            sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
            }}
        >
            <Button
                variant="outlined"
                color="primary"
                onClick={onCancel}
                sx={{
                    px: 4,
                    py: 1,
                    width: "48%",
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                }}
            >
                <span className="small">Cancel</span>
            </Button>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                    px: 4,
                    py: 1,
                    width: "48%",
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                }}
            >
                <span className="small">Submit</span>
            </Button>
        </Box>
    );
}

export default FormSubmissionBtn;
