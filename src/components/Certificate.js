import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button, TextField, Box, Grid } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ConfettiExplosion from "react-confetti-explosion";
import toast from "react-hot-toast";
import endpoints from "../services/endpoints";
import axios from "axios";
import { useAxiosGet } from "../hooks/axiosHooks";
import letter from "../asset/img/letter.png";

const CertificateTemplate = React.forwardRef(
    ({ userName, courseName, completionDate, signatureSrc, sealSrc }, ref) => (
        <Box
            ref={ref}
            sx={{
                backgroundImage: `url(${letter})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                padding: "35px",
                width: "75%",
                maxWidth: "800px",
                margin: "0 auto",
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
                pt: 2,
            }}
        >
            <Box sx={{ pt: "53%" }}>
                <p style={styles.content}>
                    This is to certify that <strong>{userName}</strong> is a
                    member of this church.
                </p>
            </Box>
        </Box>
    )
);

CertificateTemplate.propTypes = {
    userName: PropTypes.string.isRequired,
    courseName: PropTypes.string,
    completionDate: PropTypes.string,
    signatureSrc: PropTypes.string,
    sealSrc: PropTypes.string,
};

const styles = {
    content: {
        fontSize: "1.2rem",
        textAlign: "center",
        marginBottom: "30px",
    },
};

const Certificate = ({ closeModal, data }) => {
    const [userName, setUserName] = useState(data.fullName || "");
    const [downloadCompleted, setDownloadCompleted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const certificateRef = useRef();

    const history = useAxiosGet(
        `${endpoints.dashboard.certificateHstory}?id=${data.prefixedId}`
    );
    const historyData = history.response;

    const createCertificateHistory = async () => {
        try {
            await axios.post(endpoints.dashboard.generatePdf, {
                id: data.prefixedId,
            });
        } catch (err) {
            toast.error(
                err.response?.data?.errorMessage || "Something went wrong"
            );
        }
    };

    const downloadPDF = async (imgData, pdfWidth, pdfHeight) => {
        const pdf = new jsPDF("portrait", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("certificate-nw.pdf");
    };

    const handleDownloadPDF = async () => {
        const input = certificateRef.current;

        await createCertificateHistory();
        setDownloadCompleted(true);

        try {
            const canvas = await html2canvas(input, { scale: 3 });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("portrait", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            await downloadPDF(imgData, pdfWidth, pdfHeight);

            toast.success("Download Completed");
            setTimeout(() => {
                setDownloadCompleted(false);
                closeModal();
                setIsDisabled(true);
            }, 2000);
        } catch (error) {
            console.error("PDF Download Error:", error);
            toast.error("Failed to download PDF. Please try again.");
        } finally {
            setDownloadCompleted(false);
        }
    };

    return (
        <div style={{ position: "relative", overflow: "hidden" }}>
            {historyData.length > 0 && (
                <Box
                    sx={{
                        m: 2,
                        padding: "10px",
                        backgroundColor: "#f0f0f5",
                        borderRadius: 8,
                        textAlign: "center",
                        fontSize: "1rem",
                        color: "#333",
                        boxShadow: 3,
                        borderLeft: "52px solid red",
                    }}
                >
                    Last Certificate Generation Date:{" "}
                    <strong>
                        {new Date(
                            historyData[0].certificate_created_date
                        ).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            // hour: "2-digit",
                            // minute: "2-digit",
                            // second: "2-digit",
                        })}
                    </strong>
                </Box>
            )}
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{ mb: 2, mt: 3, pt: 2 }}
                borderTop={2}
            >
                {downloadCompleted && (
                    <ConfettiExplosion
                        zIndex={100000}
                        duration={1800}
                        height={"100vh"}
                    />
                )}
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Global Member Name"
                        variant="outlined"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        fullWidth
                    />
                </Grid>
            </Grid>

            <CertificateTemplate
                ref={certificateRef}
                userName={userName || "Your Name"}
                courseName="Course Name"
                completionDate="Completion Date"
                signatureSrc="your-signature-image-url"
                sealSrc="your-seal-image-url"
            />

            <Box textAlign="center" mt={2}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setIsDisabled(true);
                        handleDownloadPDF();
                    }}
                    disabled={isDisabled}
                    startIcon={<FileDownloadOutlinedIcon />}
                >
                    Download as PDF
                </Button>
            </Box>
        </div>
    );
};

Certificate.propTypes = {
    closeModal: PropTypes.func.isRequired,
    data: PropTypes.shape({
        fullName: PropTypes.string,
        prefixedId: PropTypes.string.isRequired,
    }).isRequired,
};

export default Certificate;
