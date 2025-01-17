import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Student from "./screens/Student/Student";
import Alumni from "./screens/Alumni/Alumni";
import Signup from "./screens/Auth/Signup";
import Login from "./screens/Auth/Login";
import RequestManagement from "./screens/Student/RequestManagement/RequestManagement";
import RequestManagementAlumni from "./screens/Alumni/RequestManagement/RequestManagement";
import CreateRequest from './screens/Student/RequestManagement/CreateRequest';
import ViewRequests from "./screens/Student/RequestManagement/ViewRequests";
import ViewRequestsAlumni from "./screens/Alumni/RequestManagement/ViewRequests";
import ProtectedRoute from "./components/ProtectedRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Login></Login>,
            },
            {
                path: "signup",
                element: <Signup></Signup>,
            },
            {
                path: "Student",
                element: (
                    <ProtectedRoute
                        allowedUserType={"student"}
                    >
                    </ProtectedRoute> 
                    
                ),
                children: [
                    {
                        path: "",
                        element: <Student></Student>,
                        children: [
                            {
                                path: "RequestManagement",
                                element: <RequestManagement />,
                                children: [
                                    {
                                        path: 'CreateRequest',
                                        element: <CreateRequest></CreateRequest>
                                    },
                                    {
                                        path: 'ViewRequests',
                                        element: <ViewRequests/>
                                    },
                                ]
                            },
                        ],
                    },
                ],
            },
            {
                path: "alumni",
                element: (
                    <ProtectedRoute
                        allowedUserType={"alumni"}
                    ></ProtectedRoute>
                ),
                children: [
                  {
                        path: "",
                        element: <Alumni></Alumni>,
                        children: [
                            {
                                path: 'RequestManagement',
                                element: <RequestManagementAlumni/>,
                                children: [
                                    {
                                        path: 'ViewRequests',
                                        element: <ViewRequestsAlumni></ViewRequestsAlumni>
                                    },
                                ]
                            },
                        ]
                  }
                ],
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
);
