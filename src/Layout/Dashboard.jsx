import { FaArrowRight, FaBookOpen, FaCalendar, FaEdit, FaEye, FaHeart, FaHome, FaList, FaMedal, FaPhone, FaUsers } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useFavourite from "../hooks/useFavourite";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import logo from "../assets/home/logo.png";
import useContactReq from "../hooks/useContactReq";

const Dashboard = () => {
    const [favourite] = useFavourite();
    const [reqContact] = useContactReq();
    const [isAdmin] = useAdmin();
    const { user, logOut } = useContext(AuthContext);
    const uEmail= user?.email;
    
    const handleLogOut = () => {
        logOut()
        .then(() =>{})
        .catch(error => console.log(error));
    }
    console.log(user)
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-green-600 pl-4">
                <Link to="/"><img src={logo} className="max-w-[100px] my-8" /></Link>
                <ul className="menu text-black">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="adminHome" className="flex items-center text-white my-2"><FaHome  className="mr-2"/>Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="users" className="flex items-center text-white my-2"><FaUsers  className="mr-2"/>Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="approvedPremium" className="flex items-center text-white my-2"><FaMedal className="mr-2"/>Approved Premium</NavLink>
                            </li>
                            <li>
                                <NavLink to="approvedContact" className="flex items-center text-white my-2"><FaPhone  className="mr-2"/>Approved Contact Request</NavLink>
                            </li>                            
                        </>
                        : <>
                            <li>
                                <NavLink to="userHome" className="flex items-center text-white my-2"><FaHome className="mr-2"/>User Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="addBioData" className="flex items-center text-white my-2"><FaBookOpen className="mr-2"/> Add Bio data</NavLink>
                            </li>
                            <li>
                                <NavLink to={`editBioData/email/${uEmail}`} className="flex items-center text-white my-2"><FaEdit  className="mr-2"/>Edit Bio data</NavLink>
                            </li>
                            <li>
                                <NavLink to={`viewBioData/email/${uEmail}`} className="flex items-center text-white my-2"><FaEye  className="mr-2"/>View Bio data</NavLink>
                            </li>
                            <li>
                                <NavLink to="favourite" className="flex items-center text-white my-2"><FaHeart  className="mr-2"/>My Favourite List ({favourite.length})</NavLink>
                            </li>
                            <li>
                                <NavLink to="contactReq" className="flex items-center text-white my-2"><FaPhone  className="mr-2"/>My Contact Request ({reqContact.length})</NavLink>
                            </li>
                            <li>
                                <NavLink to="reservation" className="flex items-center text-white my-2"><FaCalendar  className="mr-2"/>Reservation</NavLink>
                            </li>
                            <li>
                                <NavLink to="paymentHistory" className="flex items-center text-white my-2"><FaList  className="mr-2"/>Payment History</NavLink>
                            </li>
                        </>
                    }

                    <li>
                        <NavLink  onClick={handleLogOut} className="flex items-center text-white mt-8"><FaArrowRight  className="mr-2"/>Log Out</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 m-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;