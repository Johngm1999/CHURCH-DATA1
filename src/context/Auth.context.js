import axios from "axios";
import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
    useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import endpoints from "../services/endpoints";
import Loader from "../components/Loader";

const AuthenticationContext = createContext();

const initUser = {
    username: null,
    id: null,
    deptId: null,
    type: null,
    name: null,
};

const AuthenticationProvider = (props) => {
    const [loadingInitial, setLoadingInitial] = useState(true);

    const [user, setUser] = useState(initUser);

    const navigate = useNavigate();

    useEffect(() => {
        let body = { refreshToken: localStorage.getItem("refreshToken") };

        // Interceptor

        // axios.defaults.baseURL = "http://127.0.0.1:3000/api"; //test
        // axios.defaults.baseURL = "http://127.0.0.1:8070/api"; //CI-CD
        axios.defaults.baseURL = "https://api.ssck.in/api"; //for build

        const axiosId = axios.interceptors.response.use(
            (res) => {
                return res;
            },
            async (err) => {
                switch (err.response?.status) {
                    case 401:
                        const originalRequest = err.config;

                        if (!originalRequest.retry) {
                            originalRequest.retry = true;
                            let refreshToken =
                                localStorage.getItem("refreshToken");
                            let body = { refreshToken: refreshToken };

                            try {
                                const response = await axios.post(
                                    endpoints.authentication.verify,
                                    body
                                );
                                axios.defaults.headers.common[
                                    "Authorization"
                                ] = `Bearer ${response.data.token}`;
                                originalRequest.headers[
                                    "Authorization"
                                ] = `Bearer ${response.data.token}`;
                                localStorage.setItem(
                                    "token",
                                    response.data.token
                                );
                                setUser(response.data.responseData);
                                return await axios(originalRequest);
                            } catch (err_1) {
                                setUser(initUser);
                                navigate("/login", "replace");
                            }
                        }
                        throw err;
                    case 403:
                        localStorage.clear();
                        setUser(initUser);
                        navigate("/login", "replace");
                        throw err;
                    default:
                        throw err;
                }
            }
        );

        // authorize on load
        axios
            .post(endpoints.authentication.verify, body)
            .then((response) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.token}`;
                localStorage.setItem("token", response.data.token);
                setUser(response.data.responseData);
            })
            .catch((err) => {
                setUser(initUser);
                navigate("/login", "replace");
            })
            .finally(() => {
                setLoadingInitial(false);
            });

        return () => {
            axios.interceptors.response.eject(axiosId);
        };
        // eslint-disable-next-line
    }, []);

    const login = useCallback(async (userCredential) => {
        const response = await axios.post(
            endpoints.authentication.login,
            userCredential
        );

        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${response.data.token}`;

        localStorage.setItem("refreshToken", response.data.refreshToken);

        let userData = response.data.responseData;

        setUser(userData);

        return userData;
    }, []);

    const logout = useCallback(async () => {
        let refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            let body = { refreshToken: refreshToken };
            await axios.post(endpoints.authentication.logout, body);
        }
        setUser(initUser);
        localStorage.clear();
        navigate("login");
        // eslint-disable-next-line
    }, []);

    const value = useMemo(
        () => ({
            user,
            setUser,
            login,
            logout,
        }),
        [user, login, logout]
    );

    return (
        <AuthenticationContext.Provider value={value}>
            {loadingInitial ? <Loader /> : props.children}
        </AuthenticationContext.Provider>
    );
};

const useAuthenticationState = () => {
    let context = useContext(AuthenticationContext);
    if (context === undefined)
        throw new Error(
            "useAuthenticationState must be used within a AuthenticationProvider"
        );
    return context;
};

export { useAuthenticationState, AuthenticationProvider };
