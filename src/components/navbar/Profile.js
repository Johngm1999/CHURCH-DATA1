import axios from "axios";
import { useState } from "react";
import { Button, Col, Dropdown, Form, InputGroup, Row } from "react-bootstrap";
import endpoints from "../../services/endpoints";
import Boy from "../../asset/img/Boy.png";
import WithModal from "../WithModal";
import withAlert from "../../hoc/withAlert";
import { useAuthenticationState } from "../../context/Auth.context";
import eyeopen from "../../asset/icons/Eyeopen.svg";
import eyeclose from "../../asset/icons/Eyeclose.svg";
import toast from "react-hot-toast";
import extractErrorFromRes from "../../helpers/extractErrorFromRes";

function Profile({ showAlert }) {
    const [passwordVisibility, setPasswordVisibility] = useState({
        old: false,
        new: false,
        confirmNew: false,
    });
    const [password, setPassword] = useState({
        old: "",
        new: "",
        confirmNew: "",
        username: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const { logout, user } = useAuthenticationState();

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setPassword((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmit = (e, closeModal, type) => {
        e.preventDefault();
        setSubmitting(true);

        if (password.new !== password.confirmNew) {
            toast.error("New password and confirm password do not match.");
            setSubmitting(false);
            return;
        }

        const body = {
            OLD_PASSWORD: password.old,
            NEW_PASSWORD: password.new,
        };

        if (type === "user" && password.username) {
            body.username = password.username; // Include the username field for user password change
        }

        const url =
            type === "admin"
                ? endpoints.dashboard.changePassword
                : endpoints.dashboard.changeUserPassword;

        axios
            .post(url, body)
            .then(() => {
                toast.success("Password Changed Successfully");
                closeModal();
            })
            .catch((err) => {
                if (err.response?.data?.statusCode === 401) {
                    toast.error("Incorrect old password");
                } else {
                    toast.error(extractErrorFromRes(err));
                }
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const renderPasswordField = (placeholder, field, value) => (
        <InputGroup className="mb-3">
            <Form.Control
                placeholder={placeholder}
                className="mb-4 border shadow-none rounded"
                type={passwordVisibility[field] ? "text" : "password"}
                name={field}
                value={value}
                minLength={6}
                onChange={handleChange}
            />
            <InputGroup.Text
                className="mb-4 border shadow-none rounded"
                onClick={() => togglePasswordVisibility(field)}
            >
                {passwordVisibility[field] ? (
                    <img src={eyeopen} alt="eye open" />
                ) : (
                    <img src={eyeclose} alt="eye close" />
                )}
            </InputGroup.Text>
        </InputGroup>
    );

    const renderPasswordForm = (closeModal, type) => (
        <Form onSubmit={(e) => onSubmit(e, closeModal, type)}>
            {type === "user" && (
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Username"
                        className="mb-4 border shadow-none rounded"
                        type="text"
                        name="username"
                        value={password.username}
                        onChange={handleChange}
                    />
                </InputGroup>
            )}
            {renderPasswordField("Old Password", "old", password.old)}
            {renderPasswordField("New Password", "new", password.new)}
            {renderPasswordField(
                "Confirm New Password",
                "confirmNew",
                password.confirmNew
            )}
            <div className="d-flex justify-content-center">
                <Button
                    size="sm"
                    disabled={
                        submitting ||
                        !password.old ||
                        !password.new ||
                        !password.confirmNew ||
                        (type === "user" && !password.username)
                    }
                    type="submit"
                >
                    {submitting ? "Saving" : "Change"}
                </Button>
                <Button
                    size="sm"
                    variant="secondary"
                    className="ms-3"
                    onClick={closeModal}
                >
                    Cancel
                </Button>
            </div>
        </Form>
    );

    return (
        <div className="custom-dropdown">
            <Dropdown align="end">
                <Dropdown.Toggle
                    variant="transparent"
                    className="shadow-sm ms-4"
                    style={{
                        padding: "0",
                        background: `radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)`,
                    }}
                >
                    <Row className="m-0">
                        <Col sm="auto" className="p-0">
                            {!user.dp ? (
                                <img
                                    alt="boy Icon"
                                    height="48px"
                                    width="48px"
                                    src={Boy}
                                />
                            ) : (
                                <div
                                    style={{
                                        height: "48px",
                                        width: "48px",
                                        borderRadius: "50%",
                                        backgroundImage: `url(${encodeURI(
                                            user.dp
                                        )})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                />
                            )}
                        </Col>
                        <Col
                            sm="auto"
                            className="d-flex flex-column justify-content-around py-1"
                        >
                            <span className="text-uppercase">
                                {user.user_role?.toLowerCase() === "admin"
                                    ? "Church Admin"
                                    : "Church User"}
                            </span>
                            <span
                                className="text-black-50 text-capitalize"
                                style={{ lineHeight: ".7", fontSize: ".8em" }}
                            >
                                {user.user_role?.toLowerCase()}
                            </span>
                        </Col>
                    </Row>
                </Dropdown.Toggle>
                <Dropdown.Menu className="border-0 shadow-sm p-3">
                    <WithModal
                        modalAttrs={{
                            size: "sm",
                            onExited: () =>
                                setPassword({
                                    old: "",
                                    new: "",
                                    confirmNew: "",
                                    username: "",
                                }),
                        }}
                        modalTitle="Change Admin Password"
                        renderModalBody={(closeModal) =>
                            renderPasswordForm(closeModal, "admin")
                        }
                    >
                        <Dropdown.Item>
                            <span className="small">Change Admin Password</span>
                        </Dropdown.Item>
                    </WithModal>

                    <WithModal
                        modalAttrs={{
                            size: "sm",
                            onExited: () =>
                                setPassword({
                                    old: "",
                                    new: "",
                                    confirmNew: "",
                                    username: "",
                                }),
                        }}
                        modalTitle="Change User Password"
                        renderModalBody={(closeModal) =>
                            renderPasswordForm(closeModal, "user")
                        }
                    >
                        <Dropdown.Item>
                            <span className="small">
                                Change Church User Password
                            </span>
                        </Dropdown.Item>
                    </WithModal>

                    <Dropdown.Item onClick={logout}>
                        <span className="small">Logout</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default withAlert(Profile);
