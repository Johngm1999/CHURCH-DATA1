import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Dropdown, Form, InputGroup, Row } from 'react-bootstrap';
// import AdminImg from '../../asset/icons/AdminImg.png';
// import endpoints from '../../endpoints';
// import ModalWrapper from '../ModalWrapper';
// import withAlert from '../withAlert';
import endpoints from '../../services/endpoints';
import Boy from '../../asset/images/Boy.png';
import WithModal from '../WithModal';
import withAlert from '../../hoc/withAlert';
import { useAuthenticationState } from '../../context/Auth.context';
import eyeopen from '../../asset/icons/Eyeopen.svg';
import eyeclose from '../../asset/icons/Eyeclose.svg';
import toast from 'react-hot-toast';
import extractErrorFromRes from '../../helpers/extractErrorFromRes';

function Profile({ showAlert }) {
    const [old, setOld] = useState(false);
    const [newp, setNewp] = useState(false);
    const [confrm, setConfrm] = useState(false);

    const togglePssword1 = () => {
        setOld(!old);
    };
    const togglePssword2 = () => {
        setNewp(!newp);
    };
    const togglePssword3 = () => {
        setConfrm(!confrm);
    };
    const [password, setPassword] = useState({
        old: '',
        new: '',
        confirmNew: '',
    });

    const [submitting, setSubmitting] = useState(false);

    const { logout, user } = useAuthenticationState();

    const onSubmit = (e, close) => {
        e.preventDefault();
        setSubmitting(true);

        if (password.new !== password.confirmNew) {
            toast.error('New password and confirm password is not matching');

            // showAlert(
            //     'error',
            //     'New password and confirm password is not matching'
            // );

            setSubmitting(false);
            return '';
        }
        const body = {
            OLD_PASSWORD: password.old,
            NEW_PASSWORD: password.new,
        };
        axios
            .post(endpoints.authentication.changePassword, body)
            .then((res) => {
                toast.success('Password Changed Successfully');

                // showAlert('success', 'Password Change Successfull');

                close();
            })
            .catch((err) => {
                console.log(err.response.data.statusCode);
                if (err.response.data.statusCode === 404) {
                    toast.error('Incorrect password');
                    // showAlert('error', 'Incorrect password');
                    return '';
                }
                toast.error(extractErrorFromRes(err));
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const handleChange = (e) => {
        const { value, name } = e.target;

        setPassword({
            ...password,
            [name]: value,
        });
    };

    return (
        <div className='custom-dropdown'>
            <Dropdown align='end'>
                <Dropdown.Toggle
                    variant='transparent'
                    className='shadow-sm ms-4 '
                    style={{ padding: '0' }}
                >
                    <Row className='m-0'>
                        <Col sm='auto' className='p-0'>
                            {!user.dp ? (
                                <img height='48px' width='48px' src={Boy} />
                            ) : (
                                <div
                                    // border='1px solid lightgray'
                                    style={{
                                        height: '48px',
                                        width: '48px',
                                        borderRadius: '50%',
                                        backgroundImage:
                                            'url(' + encodeURI(user.dp) + ')',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                            )}
                            {/* <img
                                src={user.dp || Boy}
                                alt='Logged in Person'
                                height={50}
                            /> */}
                        </Col>
                        <Col
                            sm='auto'
                            className='d-flex flex-column justify-content-around py-1'
                        >
                            <span className='text-uppercase'>
                                {user.username || 'Super user'}
                            </span>
                            <span
                                className='text-black-50 text-capitalize'
                                style={{ lineHeight: '.7', fontSize: '.8em' }}
                            >
                                {user.type.toLowerCase()}
                            </span>
                        </Col>
                    </Row>
                </Dropdown.Toggle>
                <Dropdown.Menu className='border-0 shadow-sm p-3'>
                    <WithModal
                        modalAttrs={{
                            size: 'sm',
                            onExited: () =>
                                setPassword({
                                    old: '',
                                    new: '',
                                    confirmNew: '',
                                }),
                        }}
                        modalTitle='Change Password'
                        renderModalBody={(closeModal) => (
                            <Form onSubmit={(e) => onSubmit(e, closeModal)}>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        placeholder='Old Password'
                                        className='mb-4 border shadow-none rounded'
                                        type={old ? 'text' : 'Password'}
                                        name='old'
                                        value={password.old}
                                        onChange={handleChange}
                                    />
                                    <InputGroup.Text
                                        className='mb-4 border shadow-none rounded'
                                        id='basic-addon2'
                                        onClick={togglePssword1}
                                    >
                                        {old ? (
                                            <img src={eyeopen} />
                                        ) : (
                                            <img src={eyeclose} />
                                        )}
                                    </InputGroup.Text>
                                </InputGroup>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        placeholder='New Password'
                                        className='mb-4 border shadow-none rounded'
                                        type={newp ? 'text' : 'Password'}
                                        name='new'
                                        value={password.new}
                                        onChange={handleChange}
                                    />
                                    <InputGroup.Text
                                        className='mb-4 border shadow-none rounded'
                                        id='basic-addon2'
                                        onClick={togglePssword2}
                                    >
                                        {newp ? (
                                            <img src={eyeopen} />
                                        ) : (
                                            <img src={eyeclose} />
                                        )}
                                    </InputGroup.Text>
                                </InputGroup>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        placeholder='Confirm new password'
                                        className='mb-4 border shadow-none rounded'
                                        type={confrm ? 'text' : 'Password'}
                                        name='confirmNew'
                                        value={password.confirmNew}
                                        onChange={handleChange}
                                    />
                                    <InputGroup.Text
                                        className='mb-4 border shadow-none rounded'
                                        id='basic-addon2'
                                        onClick={togglePssword3}
                                    >
                                        {confrm ? (
                                            <img src={eyeopen} />
                                        ) : (
                                            <img src={eyeclose} />
                                        )}
                                    </InputGroup.Text>
                                </InputGroup>
                                <div className='d-flex justify-content-center'>
                                    <Button
                                        size='sm'
                                        disabled={
                                            submitting ||
                                            !password.old ||
                                            !password.confirmNew ||
                                            !password.new
                                        }
                                        type='submit'
                                    >
                                        {submitting ? 'Saving' : 'Change'}
                                    </Button>
                                    <Button
                                        size='sm'
                                        variant='secondary'
                                        className='ms-3'
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        )}
                    >
                        <Dropdown.Item>
                            <span className='small'>Change Password</span>
                        </Dropdown.Item>
                    </WithModal>
                    <Dropdown.Item onClick={logout}>
                        <span className='small'>Logout</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default withAlert(Profile);
