import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Loader from './Loader';

function PostWithWarning({
    endpoint,
    onCancel,
    configBody,
    onSuccess = () => {},
    onError = () => {},
    successVarient,
    dangerVarient,
}) {
    const [loading, setLoading] = useState(false);

    const onAction = () => {
        setLoading(true);
        axios
            .post(endpoint, configBody)
            .then((res) => {
                onSuccess(res);
                onClose();
            })
            .catch((err) => {
                setLoading(false);
                onError(err);
            });
    };
    const onClose = () => {
        onCancel();
        setLoading(false);
    };

    return (
        <>
            <div className='text-center'>
                <Button
                    variant={successVarient ? successVarient : 'danger'}
                    className='mx-2 text-white rounded-2 px-4'
                    disabled={loading}
                    onClick={onAction}
                >
                    Yes
                </Button>
                <Button
                    variant={dangerVarient ? dangerVarient : 'success'}
                    className='mx-2 text-white rounded-2 px-4'
                    disabled={loading}
                    onClick={onClose}
                >
                    No
                </Button>
            </div>

            {loading && <Loader />}
        </>
    );
}

export default PostWithWarning;
