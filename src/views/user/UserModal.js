import { Box } from "@mui/material";
import ModalWrapper from "../../components/ModalWrapper";

function YouthModal({ text, Form, bg }) {
    return (
        <ModalWrapper
            modalTitle={text || "Add Data"}
            modalAttrs={{
                size: "lg",
            }}
            renderModalBody={(closeModal) => (
                <Form
                    onAfterSubmit={() => {
                        closeModal();
                    }}
                    onCancel={closeModal}
                />
            )}
        >
            <Box
                sx={{
                    bgcolor: "white",
                    p: 8,
                    // py: 16,
                    borderRadius: 4,
                    boxShadow: 8,
                    fontWeight: 700,
                    color: bg,
                    borderLeft: `10px solid ${bg}`,
                    borderRight: `10px solid ${bg}`,
                    "&:hover": {
                        backgroundColor: "#dce2e3", // Change color on hover
                        transform: "scale(1.1)",
                    },
                }}
            >
                {text || "Click Me"}
            </Box>
        </ModalWrapper>
    );
}

export default YouthModal;
