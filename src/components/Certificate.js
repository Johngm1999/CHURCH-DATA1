import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
    Button,
    TextField,
    Box,
    Grid,
    Collapse,
    CircularProgress,
} from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ConfettiExplosion from "react-confetti-explosion";
import toast from "react-hot-toast";
import endpoints from "../services/endpoints";
import axios from "axios";
import { useAxiosGet } from "../hooks/axiosHooks";
import churchLogo from "../asset/img/churchLogo.png";
import seal from "../asset/img/churchSeal.png";
import sign from "../asset/img/priestSign.png";
import UploadSelector from "./UploadSelector";
import { CloseOutlined } from "@mui/icons-material";

const CertificateTemplate = React.forwardRef(
    ({ userName, uploadedImageSrc, userId, houseName }, ref) => (
        <Box
            ref={ref}
            sx={{
                // backgroundImage: `url(${letter})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                padding: "35px",
                width: "100%",
                maxWidth: "1200px", // Increase maxWidth for landscape
                height: "600px", // Set a fixed height for landscape orientation
                margin: "0 auto",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "center",
            }}
        >
            {/* Left side: Image with name and ID */}
            {uploadedImageSrc && (
                <>
                    <Box
                        sx={{
                            width: "230px",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            // padding: "20px",
                            position: "relative",
                            zIndex: 1,
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src={uploadedImageSrc}
                            alt="Uploaded"
                            style={{
                                marginBottom: "10px",
                                display: "block",
                                width: "180px", // Fixed width for passport size
                                height: "210px",
                                border: "1px solid grey",
                            }}
                        />
                        <div
                            style={{
                                margin: "5px 0",
                                fontWeight: "bold",
                                fontSize: "1.8rem",
                                color: "#fff",
                                wordWrap: "break-word",
                                width: "100%",
                            }}
                        >
                            {userName}
                        </div>
                        <div
                            style={{
                                margin: "5px 0",
                                fontSize: "1.5rem",
                                color: "#fff",
                                width: "100%",
                                overflow: "hidden",
                                wordWrap: "break-word",
                            }}
                        >
                            {houseName}
                        </div>
                    </Box>
                    <Box
                        sx={{
                            position: "absolute",
                            width: 310,
                            height: 354,
                            bgcolor: "#3f6fe8",
                            zIndex: 0,
                            left: 0,
                            bottom: 108,
                        }}
                    ></Box>
                    <Box
                        sx={{
                            position: "absolute",
                            width: 310,
                            height: 57,
                            bgcolor: "#ede9e8",
                            left: 0,
                            bottom: 51,
                            color: "#000",
                            textAlign: "left",
                            pt: 2,
                            fontSize: 18,
                            fontWeight: 700,
                            pl: 2,
                            display: "flex",
                        }}
                    >
                        ID:
                        {/* <p style={{ color: "blue" }}> */}
                        {userId}
                        {/* </p> */}
                    </Box>
                </>
            )}
            {/* Right side: Certificate content */}
            <Box
                sx={{
                    width: "65%",
                    paddingLeft: "20px",
                    marginTop: "-20%",
                    position: "relative",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img
                        src={churchLogo}
                        alt="churchLogo"
                        style={{
                            maxWidth: "80px", // Slightly larger for landscape
                            marginBottom: "10px",
                            display: "block",
                        }}
                    />
                </Box>
                <Box sx={{ fontWeight: 700, fontSize: 35 }}>
                    St. Sebastian's church Kottappady
                </Box>
                <p
                    style={{
                        fontWeight: 700,
                        fontSize: 25,
                        marginTop: 10,
                        // marginBottom: 0,
                    }}
                >
                    <em>Global Member ID Card</em>
                </p>
                <p style={{ fontSize: 25, marginBottom: 0, fontWeight: 700 }}>
                    {" "}
                    {userName}
                </p>
                <p style={{ fontSize: 25 }}>
                    is an active member of the church
                </p>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        position: "absolute",
                        bottom: "-55%",
                        right: -2,
                        width: "85%",
                    }}
                >
                    <Box>
                        <span style={{ fontWeight: 700 }}>
                            Issued On: {new Date().toLocaleDateString("en-GB")}
                        </span>
                        <img
                            src={seal}
                            alt="church seal"
                            style={{
                                maxWidth: "150px", // Slightly larger for landscape
                                marginBottom: "10px",
                                display: "block",
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: "50%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={sign}
                            alt="priestSign"
                            style={{
                                maxWidth: "150px", // Slightly larger for landscape
                                marginBottom: "10px",
                                display: "block",
                            }}
                        />

                        <Box>
                            <div>Fr. Robin Padinjarekuttu</div>{" "}
                            <div> Parish Priest</div>
                        </Box>
                    </Box>{" "}
                </Box>
            </Box>
        </Box>
    )
);

CertificateTemplate.propTypes = {
    userName: PropTypes.string.isRequired,
    uploadedImageSrc: PropTypes.string,
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
    const [userId, setUserId] = useState(data.prefixedId || "");
    const [houseName, setUserHouseName] = useState(data.houseName || "");
    const [downloadCompleted, setDownloadCompleted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState(false);
    const [isCertificateLoading, setIsCertificateLoading] = useState(false);
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
        setIsCertificateLoading(true);
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
                setTimeout(() => {
                    setIsCertificateLoading(false);
                }, 1000);
            } else {
                setFileError(true);
                setUploadedImageSrc(null);
                setIsCertificateLoading(false);
            }
        }
    };

    const downloadPDF = async (imgData, pdfWidth, pdfHeight) => {
        const pdf = new jsPDF("landscape", "mm", "a4");
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

            const pdf = new jsPDF("landscape", "mm", "a4");
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
            {downloadCompleted && (
                <ConfettiExplosion
                    zIndex={100000}
                    duration={1800}
                    height={"150vh"}
                    width={2000}
                    particleCount={250}
                />
            )}
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
                    label="Browse Image"
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

                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Global Member Name"
                            variant="outlined"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Global Member House Name"
                            variant="outlined"
                            value={houseName}
                            onChange={(e) => setUserHouseName(e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Global Member ID"
                            variant="outlined"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                {isCertificateLoading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 2,
                            flexDirection: "column",
                            color: "#2842eb",
                        }}
                    >
                        <CircularProgress />
                        Generating Certificate...
                    </Box>
                ) : (
                    <CertificateTemplate
                        ref={certificateRef}
                        userName={userName || "Your Name"}
                        uploadedImageSrc={uploadedImageSrc}
                        userId={userId}
                        houseName={houseName}
                    />
                )}
                <Box textAlign="center" mt={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setIsDisabled(true);
                            setTimeout(() => {
                                handleDownloadPDF();
                            }, 1000); // 1000 milliseconds = 1 second
                        }}
                        disabled={isDisabled || isCertificateLoading}
                        startIcon={<FileDownloadOutlinedIcon />}
                    >
                        {isDisabled ? (
                            <CircularProgress size={24} />
                        ) : (
                            "Download as PDF"
                        )}
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
