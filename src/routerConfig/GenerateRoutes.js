import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthenticationState } from "../context/Auth.context";
import Dashboard from "../layout/Dashboard";
import adminRoutes from "./adminRoutes";
import userRoutes from "./userRoutes";
import { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import Login from "../views/login/UserLogin";

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
                <Route
                    exact
                    path="/login"
                    element={
                        <Suspense fallback={<Loader />}>
                            <Login />
                        </Suspense>
                    }
                />
                <Route
                    path={"/"}
                    element={
                        <Suspense fallback={<Loader />}>
                            <Dashboard routes={routes} />
                        </Suspense>
                    }
                >
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <Suspense fallback={<Loader />}>
                                    <ProtectedRoute>
                                        <route.page />
                                    </ProtectedRoute>
                                </Suspense>
                            }
                        />
                    ))}
                </Route>
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            <Toaster />
        </>
    );
}

function ProtectedRoute({ children }) {
    const { user } = useAuthenticationState();

    if (!user?.user_role) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default GenerateRoutes;
