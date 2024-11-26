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
import MaintenanceNotice from "../../components/MaintenanceNotice";

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
                navigate("/");
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
                sx={{ minHeight: "90vh" }}
            >
                <MaintenanceNotice />
                {loggingIn && <Loader />}
            </Grid>
        </div>
    );
}

export default withAlert(Login);
