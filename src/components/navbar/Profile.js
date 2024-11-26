import axios from "axios";
import { useState } from "react";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import endpoints from "../../services/endpoints";
import Boy from "../../asset/img/Boy.png";
import WithModal from "../WithModal";
import withAlert from "../../hoc/withAlert";
import eyeopen from "../../asset/icons/Eyeopen.svg";
import eyeclose from "../../asset/icons/Eyeclose.svg";
import toast from "react-hot-toast";
import extractErrorFromRes from "../../helpers/extractErrorFromRes";
import LogoutWithWarning from "../Logout";

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
                    className="shadow-sm ms-6"
                    style={{
                        padding: "0",
                        borderRadius: 10,
                        height: "50px",
                    }}
                >
                    <div>
                        <div>
                            <img
                                alt="boy Icon"
                                height="48px"
                                width="48px"
                                src={Boy}
                            />
                        </div>
                        {/* <span
                            className="text-black-50 text-capitalize"
                            style={{
                                fontSize: "10px",
                            }}
                        >
                            {user.user_role?.toLowerCase()}
                        </span> */}
                    </div>
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

                    <Dropdown.Item>
                        {/* <span className="small">Logout</span> */}
                        <LogoutWithWarning />
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default withAlert(Profile);
