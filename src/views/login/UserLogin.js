import React, { useEffect, useState } from "react";
import {
    Button,
    TextField,
    IconButton,
    InputAdornment,
    CircularProgress,
    Grid,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthenticationState } from "../../context/Auth.context";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import withAlert from "../../hoc/withAlert";
import extractErrorFromRes from "../../helpers/extractErrorFromRes";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import churchImg from "../../asset/img/church.jpeg";

function Login() {
    const [visible, setVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setVisible(!visible);
    };

    const [userCredential, setUserCredential] = useState({
        USERNAME: "",
        PASSWORD: "",
    });

    const [loggingIn, setLoggingIn] = useState(false);

    const { login, logout } = useAuthenticationState();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        // eslint-disable-next-line
    }, []);

    const onLogin = (e) => {
        e.preventDefault();
        setLoggingIn(true);

        login(userCredential)
            .then(() => {
                setLoggingIn(false);
                navigate("/overview");
                toast.success("Login Success");
            })
            .catch((err) => {
                setLoggingIn(false);
                toast.error(extractErrorFromRes(err));
            });
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUserCredential({
            ...userCredential,
            [name]: value,
        });
    };

    return (
        <div
            className="position-relative"
            style={{
                backgroundImage: `url(${churchImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
            }}
        >
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "90vh", pr: 35 }}
            >
                <Grid
                    item
                    sm={5}
                    sx={{
                        p: 4,
                        borderRadius: 5,
                        boxShadow: 18,
                        bgcolor: "#fff",
                    }}
                >
                    <div className="w-75 mx-auto">
                        <Typography variant="h5">Welcome back</Typography>
                        <Typography variant="h4" gutterBottom>
                            Login to your account
                        </Typography>

                        <form onSubmit={onLogin}>
                            <TextField
                                label="Username"
                                name="USERNAME"
                                value={userCredential.USERNAME}
                                onChange={onChangeHandler}
                                fullWidth
                                margin="normal"
                                required
                                variant="outlined"
                            />
                            <TextField
                                label="Password"
                                name="PASSWORD"
                                type={visible ? "text" : "password"}
                                value={userCredential.PASSWORD}
                                onChange={onChangeHandler}
                                fullWidth
                                margin="normal"
                                required
                                variant="outlined"
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                            >
                                                {visible ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                                disabled={loggingIn}
                            >
                                {loggingIn ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </form>
                    </div>
                </Grid>
                {loggingIn && <Loader />}
            </Grid>
        </div>
    );
}

export default withAlert(Login);
