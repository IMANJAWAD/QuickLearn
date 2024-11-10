import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const ProtectedRoute = ({ allowedUserType }) => {

    const token = localStorage.getItem("token");

    if (!token) {
    }

    const decodedToken = jwtDecode(token);

    console.log(decodedToken?.userType, allowedUserType);

    if (decodedToken?.userType !== allowedUserType) {
        alert("Login First");
        return <Navigate to="/" replace />;
    }

    return <Outlet></Outlet>;
};


export default ProtectedRoute;
