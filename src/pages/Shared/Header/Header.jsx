import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaHeart } from 'react-icons/fa';
import useAdmin from "../../../hooks/useAdmin";

import logo from "../../../assets/home/logo.png";
import useFavourite from "../../../hooks/useFavourite";

const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [favourite] =useFavourite();

    const handleLogOut = () => {
        logOut()
        .then(() =>{})
        .catch(error => console.log(error));
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const navLinks = <>
        <Link to="/">Home</Link>
        <Link to="/bioData">Bio data</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
        {
            user && isAdmin && <Link to="/dashboard/adminHome">Dashboard</Link>
        }
        {
            user && !isAdmin && <Link to="/dashboard/userHome">Dashboard</Link>
        }

        
        {
            user ? <>
                {/* <span>{user?.displayName}</span> */}
                <button onClick={handleLogOut} className="btn">Log Out</button>
            </> 
            : <><Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link></>
        }
        <Link className="p-0 mr-2" to="/dashboard/favourite">
            <button className="btn">
                <FaHeart className="text-green-600 text-lg"></FaHeart>
                <div className="absolute top-5">+{favourite.length}</div>
            </button>
        </Link>
    </>
    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 z-10 w-full">
            <div className="container max-w-[1280px] mx-auto">
                <div className="flex items-center justify-between">
                <Link to="/"><img src={logo} className="max-w-[100px] my-2" /></Link>
                <div className="hidden md:flex space-x-8">
                {navLinks}
                </div>
                <div className="md:hidden">
                    {/* Mobile menu button */}
                    <button
                    className="text-white"
                    onClick={toggleMenu}
                    >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isMenuOpen ? (
                        <path d="M6 18L18 6M6 6l12 12"></path>
                        ) : (
                        <path d="M4 6h16M4 12h16m-7 6h7"></path>
                        )}
                    </svg>
                    </button>
                </div>
                </div>
                {/* Mobile menu */}
                {isMenuOpen && (
                <div className="md:hidden flex flex-col">
                    {navLinks}
                </div>
                )}
            </div>
        </nav>
        
    );
};

export default Header;