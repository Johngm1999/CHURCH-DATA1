import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { createPortal } from "react-dom";

function withAlert(WrappedComponent) {
    return function WithFormError(props) {
        const [notification, setNotification] = useState(null);
        const [show, setShow] = useState(false);
        const [el] = useState(document.createElement("div"));
        const [type, setType] = useState("error");

        useEffect(() => {
            document.body.appendChild(el);
            return () => {
                document.body.removeChild(el);
            };
        }, [el]);

        useEffect(() => {
            if (notification) {
                setShow(true);
            }
        }, [notification]);

        const showAlert = (type, message) => {
            setType(type);
            setNotification(message);
        };

        return (
            <>
                {show &&
                    createPortal(
                        <Snackbar
                            open={show}
                            autoHideDuration={3000}
                            onClose={() => {
                                setShow(false);
                                setNotification(null);
                                setType("success");
                            }}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <Alert
                                onClose={() => {
                                    setShow(false);
                                    setNotification(null);
                                }}
                                severity={type} // 'error' or 'success'
                                sx={{ width: "100%" }}
                            >
                                {notification}
                            </Alert>
                        </Snackbar>,
                        el
                    )}
                <WrappedComponent showAlert={showAlert} {...props} />
            </>
        );
    };
}

export default withAlert;
