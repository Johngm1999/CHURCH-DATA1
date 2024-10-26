import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ModalWrapper({
    renderModalBody = () => {},
    onHiding = () => {},
    modalTitle,
    modalAttrs,
    children,
    disabled,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
        onHiding();
    };

    return (
        <>
            <div
                className="d-inline-block"
                style={{
                    opacity: disabled ? 0.5 : 1,
                    cursor: disabled ? "not-allowed" : "pointer",
                    width: "100%",
                }}
                onClick={() => {
                    if (disabled) return;
                    setIsModalOpen(true);
                }}
            >
                {children}
            </div>

            <Dialog
                open={isModalOpen}
                onClose={closeModal}
                scroll="paper"
                {...modalAttrs}
            >
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 6,
                        position: "relative",
                        textAlign: "center",
                    }}
                >
                    <span
                        style={{
                            padding: "10px",
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#000", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                        }}
                    >
                        {modalTitle}
                    </span>
                    <IconButton
                        aria-label="close"
                        onClick={closeModal}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    {renderModalBody(closeModal)}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ModalWrapper;
