import { NavLink } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { IoIosAddCircle } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";

const Dashboard = () => {
    return (
        <div className="flex justify-center items-center flex-col w-1/6 bg-customGrey top-0 left-0 fixed h-screen m-0 p-0">
            <div className="flex justify-center items-center w-11/12  bg-customDark m-2.5 p-2.5 text-white rounded text-xl">
                <h1>QuickLearn</h1>
            </div>
            <div className="h-4/5 flex justify-center items-center m-0 p-0 w-11/12 ">
                <ul className="flex justify-evenly items-start flex-col mx-0 px-0 w-fit h-full text-white ">
                    <li className="w-full">
                        <NavLink
                            to="/alumni/ProfileAndPersonalization"
                            className={({ isActive }) =>
                                `flex justify-center items-center cursor-pointer hover:bg-customDark ${
                                    isActive ? "bg-customDark" : ""
                                }`
                            }
                        >
                            <CgProfile className="m-4 text-3xl" />
                            <span>Profile </span>
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to="/alumni/RequestManagement/ViewRequests"
                            className={({ isActive }) =>
                                `flex justify-center items-center cursor-pointer hover:bg-customDark ${
                                    isActive ? "bg-customDark" : ""
                                }`
                            }
                        >
                            <IoIosAddCircle className="m-4 text-3xl" />
                            <span>Requests</span>
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to="/alumni/BridgingAlumniAndStudents"
                            className={({ isActive }) =>
                                `flex justify-center items-center cursor-pointer hover:bg-customDark ${
                                    isActive ? "bg-customDark" : ""
                                }`
                            }
                        >
                            <PiStudentFill className="m-4 text-3xl" />
                            <span>Alumni and Student</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
