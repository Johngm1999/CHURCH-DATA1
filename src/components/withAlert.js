import React, { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { createPortal } from 'react-dom';

function withAlert(WrappedComponent) {
    return function WithFormError(props) {
        const [notification, setNotification] = useState(null);
        const [show, setShow] = useState(false);
        const [el] = useState(document.createElement('div'));
        const [type, setType] = useState('error');

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
        const alertClass =
            type === 'error'
                ? 'text-danger border-danger'
                : 'text-success border-success';

        return (
            <>
                {show &&
                    createPortal(
                        <Toast
                            className='my-3'
                            onClose={() => {
                                setShow(false);
                                setNotification(null);
                                setType('success');
                            }}
                            show={show}
                            style={{
                                zIndex: '10001',
                                position: 'fixed',
                                top: '-3%',
                                left: '0%',
                                minWidth: '100%',
                            }}
                            delay={3000}
                            autohide
                        >
                            <Toast.Header
                                className={
                                    'bg-white border rounded p-4 shadow-lg' +
                                    alertClass
                                }
                            >
                                <p className='mr-auto h6 text-center m-0 w-100'>
                                    {notification}
                                </p>
                            </Toast.Header>
                        </Toast>,
                        el
                    )}
                <WrappedComponent showAlert={showAlert} {...props} />
            </>
        );
    };
}

export default withAlert;
