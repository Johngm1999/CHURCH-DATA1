import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import letter from "../asset/img/letter.png";
import { Box, Grid } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ConfettiExplosion from "react-confetti-explosion";
import toast from "react-hot-toast";

const CertificateTemplate = React.forwardRef((props, ref) => {
    const { userName, courseName, completionDate, signatureSrc, sealSrc } =
        props;

    return (
        <Box
            ref={ref}
            style={{
                backgroundImage: `url(${letter})`,
                backgroundSize: "contain",
                // backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                // borderRadius: 10,
                padding: "35px",
                width: "75%", // Set a width constraint
                maxWidth: "800px", // Ensure it doesn't exceed a certain size
                margin: "0 auto", // Center the box horizontally
                wordWrap: "break-word", // Ensure text wraps properly
                backgroundColor: "#fff", // Optional: add a background color to ensure readability
            }}
            sx={{
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
                pt: 2,
            }}
        >
            <Box sx={{ pt: "43%" }}>
                {/* <h1 style={styles.title}>Certificate of Completion</h1> */}
                <p style={styles.content}>
                    This is to certify that <strong>{userName}</strong> has a
                    member of this church
                    {/* successfully completed the course{" "}
                    <strong>{courseName}</strong> on{" "}
                    <strong>{completionDate}</strong>. */}
                </p>
                {/* <div style={styles.signatureContainer}>
                    <div>
                        <img
                            src={signatureSrc}
                            alt="Signature"
                            style={styles.signature}
                        />
                        <div>signature</div>
                    </div>
                    <div>
                        <img src={sealSrc} alt="Seal" style={styles.seal} />
                        <div>seal</div>
                    </div>
                </div> */}
            </Box>
        </Box>
    );
});

const styles = {
    title: {
        fontSize: "1.5rem",
        textAlign: "center",
        marginBottom: "20px",
    },
    content: {
        fontSize: "1.2rem",
        textAlign: "center",
        marginBottom: "30px",
    },
    signatureContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "40%",
    },
    signature: {
        width: "150px",
        marginRight: "20px",
    },
    seal: {
        width: "100px",
    },
};

const Certificate = ({ closeModal, data }) => {
    const [userName, setUserName] = useState(data.fullName || "");
    const [courseName, setCourseName] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    const [signatureSrc, setSignatureSrc] = useState(
        "your-signature-image-url"
    );
    const [sealSrc, setSealSrc] = useState("your-seal-image-url");
    const [downloadCompleted, setDownloadCompleted] = useState(false);

    const certificateRef = useRef();
    console.log(data);

    // const handleDownloadPDF = () => {
    //     const input = certificateRef.current;
    //     html2canvas(input).then((canvas) => {
    //         const imgData = canvas.toDataURL("image/png");
    //         const pdf = new jsPDF();
    //         pdf.addImage(imgData, "PNG", 0, 0, 220, 300);
    //         pdf.save("certificate.pdf");
    //     });
    // };
    const handleDownloadPDF = () => {
        const input = certificateRef.current;

        // Use a higher scale factor to improve image quality
        html2canvas(input, { scale: 3 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            // Create a PDF document with higher quality
            const pdf = new jsPDF("portrait", "mm", "a4");

            // Calculate the width and height of the PDF page in pixels
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Add the image with scaling to fit into the PDF
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

            pdf.save("certificate-nw.pdf");
            // closeModal();
            setDownloadCompleted(true);
            toast.success("Download Completed");

            setTimeout(() => {
                setDownloadCompleted(false);
                closeModal();
            }, 2000);
        });
    };

    return (
        <div style={{ position: "relative" }}>
            {/* <div
                style={{
                    textAlign: "center",
                    position: "absolute",
                    top: -20,
                    right: 0,
                }}
            >
                <FileDownloadOutlinedIcon
                    onClick={handleDownloadPDF}
                    sx={{
                        color: "blue",
                        cursor: "pointer",
                        fontSize: "28px",
                        "&:hover": {
                            color: "#556aed", // Background on hover
                        },
                    }}
                />
            </div> */}
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                style={{ marginBottom: "20px" }}
            >
                {downloadCompleted && <ConfettiExplosion zIndex={100000} />}
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Global Member Name"
                        variant="outlined"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        fullWidth
                    />
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                    <TextField
                        label="Course Name"
                        variant="outlined"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Completion Date"
                        type="date"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={completionDate}
                        onChange={(e) => setCompletionDate(e.target.value)}
                        fullWidth
                    />
                </Grid> */}
            </Grid>

            <CertificateTemplate
                ref={certificateRef}
                userName={userName || "Your Name"}
                courseName={courseName || "Course Name"}
                completionDate={completionDate || "Completion Date"}
                signatureSrc={signatureSrc}
                sealSrc={sealSrc}
            />

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDownloadPDF}
                    style={{ marginLeft: "10px" }}
                    disabled={downloadCompleted}
                >
                    Download as PDF
                </Button>
            </div>
        </div>
    );
};

export default Certificate;
