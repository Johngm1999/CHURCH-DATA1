import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CertificateTemplate = React.forwardRef((props, ref) => {
    const { studentName, courseName, completionDate } = props;

    return (
        <div ref={ref} style={styles.certificateContainer}>
            <h1 style={styles.title}>Certificate of Completion</h1>
            <p style={styles.content}>
                This is to certify that <strong>{studentName}</strong> has
                successfully completed the course <strong>{courseName}</strong>{" "}
                on <strong>{completionDate}</strong>.
            </p>
            <p style={styles.signature}>Authorized Signature</p>
        </div>
    );
});

const styles = {
    certificateContainer: {
        border: "5px solid #000",
        padding: "20px",
        width: "80%",
        margin: "0 auto",
        textAlign: "center",
        background: "#fff",
    },
    title: {
        fontSize: "2rem",
        margin: "10px 0",
    },
    content: {
        fontSize: "1.2rem",
        margin: "20px 0",
    },
    signature: {
        marginTop: "30px",
        fontSize: "1rem",
    },
};

const Certificate = () => {
    // State to hold user input for certificate fields
    const [studentName, setStudentName] = useState("");
    const [courseName, setCourseName] = useState("");
    const [completionDate, setCompletionDate] = useState("");

    const certificateRef = useRef();

    // Function to download certificate as PDF
    const handleDownloadPDF = () => {
        const input = certificateRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 10, 10, 190, 150);
            pdf.save("certificate.pdf");
        });
    };

    return (
        <div>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                {/* Input fields for editing certificate data */}
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

            {/* Certificate Preview */}
            <CertificateTemplate
                ref={certificateRef}
                studentName={studentName || "Your Name"}
                courseName={courseName || "Course Name"}
                completionDate={completionDate || "Completion Date"}
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
