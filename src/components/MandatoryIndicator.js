import React from "react";

function MandatoryIndicator({ children, ...rest }) {
    return (
        <div style={{ display: "flex", ...rest }}>
            {children}
            <div style={{ color: "red", fontSize: 18 }}>*</div>
        </div>
    );
}

export default MandatoryIndicator;
