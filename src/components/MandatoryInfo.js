import React from "react";

function MandatoryInfo({ ...rest }) {
    return (
        <div
            style={{
                display: "flex",
                color: "#d95757",
                fontSize: 12,
                justifyContent: "center",
                ...rest,
            }}
        >
            Fields need to mark the data as completed is indicated by{" "}
            <div style={{ color: "red", fontSize: 18 }}>*</div>
        </div>
    );
}

export default MandatoryInfo;
