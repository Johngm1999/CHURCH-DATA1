import React, { useState } from "react";
import { ReactComponent as UploadIcon } from "../asset/icons/UploadIcon.svg";

function UploadSelector({ onChange, accept, label, id, inputAttrs }) {
    const [isDragActive, setIsDragActive] = useState(false);

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(false);

        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            if (file) {
                onChange({ target: { files: [file] } });
            }
        }
    };

    return (
        <label
            htmlFor={id}
            className="d-flex flex-column fs-6 align-items-center py-3 mt-3"
            style={{
                // borderRadius: "10px",
                // borderColor: "#107BFF",
                borderColor: "#140ac9",
                borderStyle: "groove",
                background: isDragActive ? "#107BFF1A" : "#e8fafa",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
            }}
            role="button"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <UploadIcon />
            <div
                style={{
                    color: "#107BFF",
                    fontWeight: "600",
                    fontSize: "14px",
                    textTransform: "none",
                }}
            >
                {label}
            </div>
            <input
                id={id}
                type="file"
                accept={accept}
                onChange={onChange}
                style={{ display: "none" }}
                {...inputAttrs}
            />
        </label>
    );
}

export default UploadSelector;
