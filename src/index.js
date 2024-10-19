import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthenticationProvider } from "./context/Auth.context";
import "./scss/style.css";
// import 'bootstrap/dist/css/bootstrap.css';

import GenerateRoutes from "./routerConfig/GenerateRoutes";
import { setLocale } from "yup";

setLocale({
    mixed: {
        number: "Must be a number",
        required: "Required",
        email: "Provide valid email",
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AuthenticationProvider>
                <GenerateRoutes />
            </AuthenticationProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
