import React from "react";

const MaintenanceNotice = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>🛠️ Under Maintenance 🛠️</h1>
            <p style={styles.text}>
                We are currently performing scheduled maintenance to improve
                your experience.
                <br />
                Our website will be back online in <strong>24 hours</strong>.
                <br />
                <br />
                <br />
                <br />
            </p>
            <p>Thank you for your patience and understanding 🙏</p>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "50px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        margin: "50px auto",
        maxWidth: "600px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
        fontSize: "34px",
        marginBottom: "20px",
        fontWeight: 700,
    },
    text: {
        fontSize: "16px",
        lineHeight: "1.5",
        color: "red",
    },
};

export default MaintenanceNotice;
