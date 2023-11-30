import { Link } from "react-router-dom";
import logo from "../../../assets/home/logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


const Footer = () => {
    const date = new Date();
    let year = date.getFullYear();
    return (
        <div className="bg-green-600 text-white">
            <div className="max-w-[1280px] mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="logo">
                        <a className="w-48 inline-block" href="/"><img src={logo} alt="Good Food" /></a>
                    </div>
                    <div className="contact">
                        <ul>
                            <li><strong>Address: </strong>223 – 8th Avenue SW Calgary, AB T2P 1B5</li>
                            <Link to="#"><li><strong>Phone: </strong>403.265.3665</li></Link>
                            <Link to="#"><li><strong>Email: </strong>info@good-food.com</li></Link>
                        </ul>
                    </div>
                    <div className="icon">
                        <ul className="flex gap-8 md:justify-end">
                            <Link to="#"><li><FaFacebook className="text-4xl"></FaFacebook></li></Link>
                            <Link to="#"><li><FaTwitter className="text-4xl"></FaTwitter></li></Link>
                            <Link to="#"><li><FaInstagram className="text-4xl"></FaInstagram></li></Link> 
                        </ul>
                    </div>
                </div> 
            </div>
            <footer className="py-8 bg-green-700 text-center">
                <p>© {year} Wedding Door</p>
            </footer>
        </div>
    );
};

export default Footer;