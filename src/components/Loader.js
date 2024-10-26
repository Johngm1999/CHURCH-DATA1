import React, { useEffect, useState } from "react";
import { LinearProgress, CircularProgress } from "@mui/material";
import { createPortal } from "react-dom";

function Loader({ type, progress }) {
    const [el] = useState(document.createElement("div"));

    useEffect(() => {
        document.body.appendChild(el);
        return () => {
            document.body.removeChild(el);
        };
    }, [el]);

    return (
        <>
            {createPortal(
                <div
                    style={{
                        top: "0%",
                        left: "0%",
                        zIndex: "10011",
                        position: "absolute",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                        background: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
                        backdropFilter: "blur(10px)", // Blur effect for modern browsers
                        WebkitBackdropFilter: "blur(10px)", // Safari support
                        border: "1px solid rgba(255, 255, 255, 0.3)", // Border around the div
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {type === "progress" ? (
                        <div className="rounded-smooth bg-light shadow-lg p-4 w-25">
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                            />
                            <div className="text-center text-muted small mt-2">
                                <p className="mb-1">{progress}% completed</p>
                                Don't go back while media is uploading
                            </div>
                        </div>
                    ) : (
                        <CircularProgress />
                    )}
                </div>,
                el
            )}
        </>
    );
}

export default Loader;
