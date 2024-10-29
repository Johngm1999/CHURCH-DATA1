import { Box } from "@mui/material";
import Certificate from "./Certificate";
import ModalWrapper from "./ModalWrapperMaterial";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

const CertificatePreview = ({ data }) => {
    return (
        <ModalWrapper
            modalTitle={"GENERATED CERTIFICATE"}
            modalAttrs={{ maxWidth: "lg" }}
            renderModalBody={(closeModal) => (
                <Box
                    sx={{
                        background: "#dcdedc",
                        py: 5,
                        borderRadius: 5,
                        boxShadow: 2,
                        border: "1px solid white",
                        px: 1,
                    }}
                >
                    <Certificate closeModal={closeModal} data={data} />
                </Box>
            )}
        >
            <PictureAsPdfOutlinedIcon />
        </ModalWrapper>
    );
};
export default CertificatePreview;
