import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button, TextField, Box, Grid, Collapse } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ConfettiExplosion from "react-confetti-explosion";
import toast from "react-hot-toast";
import endpoints from "../services/endpoints";
import axios from "axios";
import { useAxiosGet } from "../hooks/axiosHooks";
import letter from "../asset/img/letter.png";
import UploadSelector from "./UploadSelector";
import { CloseOutlined } from "@mui/icons-material";

const CertificateTemplate = React.forwardRef(
    ({ userName, uploadedImageSrc }, ref) => (
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
                textAlign: "center",
            }}
        >
            <Box sx={{ pt: "53%" }}>
                <p style={styles.content}>
                    This is to certify that <strong>{userName}</strong> is a
                    member of this church.
                </p>
                {uploadedImageSrc && (
                    <img
                        src={uploadedImageSrc}
                        alt="Uploaded"
                        style={{
                            maxWidth: "150px",
                            margin: "20px auto",
                            display: "block",
                        }}
                    />
                )}
            </Box>
        </Box>
    )
);

CertificateTemplate.propTypes = {
    userName: PropTypes.string.isRequired,
    uploadedImageSrc: PropTypes.string,
};

const styles = {
    content: {
        fontSize: "1.2rem",
        textAlign: "center",
        marginBottom: "30px",
    },
};

const DisplaySelectedFile = ({ selectedFile, onClose }) => (
    <div
        style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            // backgroundColor: "#f9f9f9",
            borderRadius: "8px",
        }}
    >
        <div
            style={{
                width: "60%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 20px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                    style={{
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "#333",
                        marginBottom: "4px",
                    }}
                >
                    File Name: {selectedFile?.name}
                </div>
                <div
                    style={{
                        fontWeight: "400",
                        fontSize: "12px",
                        color: "#888",
                    }}
                >
                    File Size: {byteConverter(selectedFile?.size).mb}
                </div>
            </div>
            <Box
                sx={{
                    background: "#cccac6",
                    borderRadius: 15,
                    boxShadow: 3,
                    border: "1px solid #8a8988",
                }}
            >
                <CloseOutlined
                    role="button"
                    onClick={onClose}
                    aria-label="Close"
                    style={{
                        color: "#ff4d4f",
                        cursor: "pointer",
                        fontSize: "28px",
                        padding: "4px",
                    }}
                />
            </Box>
        </div>
    </div>
);

const Certificate = ({ closeModal, data }) => {
    const [userName, setUserName] = useState(data.fullName || "");
    const [downloadCompleted, setDownloadCompleted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState(false);
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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
            const isImage = file.type.startsWith("image/");
            if (isImage) {
                setFileError(false);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setUploadedImageSrc(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setFileError(true);
                setUploadedImageSrc(null);
            }
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
                        })}
                    </strong>
                </Box>
            )}

            <Grid xs={12} sm={4}>
                {/* <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ background: "red" }}
                    /> */}
                <UploadSelector
                    onChange={handleImageUpload}
                    label="Browse your file"
                    id="media-upload"
                    inputAttrs={{ multiple: false }}
                />
                <Collapse in={fileError}>
                    <div style={{ color: "red", fontWeight: 700 }}>
                        Only image files are supported.
                    </div>
                </Collapse>
            </Grid>
            <Collapse in={selectedFile}>
                <DisplaySelectedFile
                    selectedFile={selectedFile}
                    onClose={() => {
                        setSelectedFile(null);
                        setFileError(false);
                        setUploadedImageSrc(null);
                    }}
                />
            </Collapse>
            <Collapse in={!fileError && uploadedImageSrc}>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ mb: 2, mt: 3, pt: 2 }}
                    borderTop={2}
                >
                    {/* <Grid item xs={12} sm={4}> */}
                    {/* <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ background: "red" }}
                    /> */}
                    {/* <UploadModal /> */}
                    {/* </Grid> */}
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
                    uploadedImageSrc={uploadedImageSrc}
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
            </Collapse>
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

// Byte Converter Function
function byteConverter(bytes) {
    const kb = bytes / 1024;
    const mb = kb / 1024;
    return { kb: Math.round(kb) + "kb", mb: mb.toFixed(2) + "mb" };
}
