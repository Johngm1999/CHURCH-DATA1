import React, { useState } from 'react';
import { CloseButton, Modal } from 'react-bootstrap';

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
    };

    return (
        <>
            <div
                type={`${disabled ? '' : 'button'}`}
                className='d-inline-block'
                style={{ opacity: disabled ? '.5' : '1' }}
                onClick={() => {
                    if (disabled) return;
                    setIsModalOpen(true);
                }}
            >
                {children}
            </div>

            <Modal
                centered
                show={isModalOpen}
                onHide={() => {
                    onHiding();
                    closeModal();
                }}
                backdrop='static'
                {...modalAttrs}
            >
                <div className='pb-2 pt-4 px-4 text-center'>
                    <div className='m-0 h5 pe-2'>{modalTitle}</div>
                    <CloseButton
                        onClick={closeModal}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '0',
                            fontSize: '12px',
                        }}
                    />
                </div>
                <Modal.Body className='p-3 p-md-4'>
                    {renderModalBody(closeModal)}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalWrapper;
