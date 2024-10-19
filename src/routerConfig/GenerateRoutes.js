import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthenticationState } from "../context/Auth.context";
import Dashboard from "../layout/Dashboard";
import Login from "../views/login/UserLogin";
import adminRoutes from "./adminRoutes";
import userRoutes from "./userRoutes";
import { Toaster } from "react-hot-toast";

function GenerateRoutes() {
    const { user } = useAuthenticationState();

    let routes = [];
    switch (user?.user_role?.toLowerCase()) {
        case "admin":
            routes = [...adminRoutes];
            break;

        case "user":
            routes = [...userRoutes];
            break;

        default:
            break;
    }

    return (
        <>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route path={"/"} element={<Dashboard routes={routes} />}>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <ProtectedRoute>
                                    {<route.page />}
                                </ProtectedRoute>
                            }
                        />
                    ))}
                </Route>
                <Route path="*" element={<Navigate to={"/login"} />} />
            </Routes>
            <Toaster />
        </>
    );
}

function ProtectedRoute({ children }) {
    const { user } = useAuthenticationState();
    let location = useLocation();

    if (!user.user_role) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

export default GenerateRoutes;
