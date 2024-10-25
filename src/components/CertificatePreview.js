import { Box } from "@mui/material";
import Certificate from "./Certificate";
import ModalWrapper from "./ModalWrapperMaterial";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

const CertificatePreview = ({ data }) => {
    return (
        <ModalWrapper
            modalTitle={"GENERATED CERTIFICATE"}
            modalAttrs={{ size: "md" }}
            renderModalBody={(closeModal) => (
                <Box sx={{ background: "#dcdedc", py: 5 }}>
                    <Certificate closeModal={closeModal} data={data} />
                </Box>
            )}
        >
            <PictureAsPdfOutlinedIcon />
        </ModalWrapper>
    );
};
export default CertificatePreview;
