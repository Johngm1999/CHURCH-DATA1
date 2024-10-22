import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import letter from "../asset/img/letter.png";
import { Box } from "@mui/material";

const CertificateTemplate = React.forwardRef((props, ref) => {
    const { studentName, courseName, completionDate, signatureSrc, sealSrc } =
        props;

    return (
        <Box
            ref={ref}
            style={{
                backgroundImage: `url(${letter})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: 10,
                padding: "40px",
                width: "40%", // Set a width constraint
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
            <Box sx={{ pt: 4 }}>
                <h1 style={styles.title}>Certificate of Completion</h1>
                <p style={styles.content}>
                    This is to certify that <strong>{studentName}</strong> has
                    successfully completed the course{" "}
                    <strong>{courseName}</strong> on{" "}
                    <strong>{completionDate}</strong>.
                </p>
                <div style={styles.signatureContainer}>
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
                </div>
            </Box>
        </Box>
    );
});

const styles = {
    title: {
        fontSize: "2rem",
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

const Certificate = () => {
    const [studentName, setStudentName] = useState("");
    const [courseName, setCourseName] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    const [signatureSrc, setSignatureSrc] = useState(
        "your-signature-image-url"
    );
    const [sealSrc, setSealSrc] = useState("your-seal-image-url");

    const certificateRef = useRef();

    const handleDownloadPDF = () => {
        const input = certificateRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 0, 0, 220, 300);
            pdf.save("certificate.pdf");
        });
    };

    return (
        <div>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <TextField
                    label="Student Name"
                    variant="outlined"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <TextField
                    label="Course Name"
                    variant="outlined"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <TextField
                    label="Completion Date"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
            </div>

            <CertificateTemplate
                ref={certificateRef}
                studentName={studentName || "Your Name"}
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
                >
                    Download as PDF
                </Button>
            </div>
        </div>
    );
};

export default Certificate;
