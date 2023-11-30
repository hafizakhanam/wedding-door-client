import Featured from "../Featured/Featured";
import Banner from "../Banner/Banner";
import Testimonials from "../Testimonials/Testimonials";
import { Helmet } from "react-helmet-async";
import WebsiteWork from "../WebsiteWork/WebsiteWork";
import SuccessCounter from "../SuccessCounter/SuccessCounter";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Wedding Door | Home</title>
            </Helmet>
            <Banner></Banner>
            <Featured></Featured>
            <WebsiteWork></WebsiteWork>
            <SuccessCounter></SuccessCounter>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;