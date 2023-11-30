import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import menuBg from '../../assets/home/03.jpeg'
import about from '../../assets/home/04.jpg'

const AboutUs = () => {
    return (
        <div>
            <Helmet>
                <title>Wedding Door | About Us</title>
            </Helmet>
            <Cover bgImg={menuBg} title="About Us"></Cover>
            <div className="py-24 bg-blue-50">
                <div className="max-w-[1280px] mx-auto px-4">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="content">
                            <h2 className="text-blue-950 font-bold text-5xl mb-16">Our Story</h2>
                            <p className="text-blue-950 text-justify">We all have. That’s because our brains become more active when we listen to stories.<br/><br/>

                                By telling stories, we can even plant ideas, thoughts and emotions into people’s brains.<br/><br/>

                                When it comes to making a purchase on your food website, a good story can make the difference between a potential customer becoming enchanted by your product and ignoring it altogether.<br/><br/>

                                So, we need stories. But what type of stories should you include on your food website?<br/><br/>

                                In this article, you’ll learn 3 story frameworks you can use on your food website.<br/><br/>

                                These stories will help you connect with your prospects, differentiate your goal, and ultimately drive more passion.</p>
                        </div>
                        <div className="img items-center flex">
                            <img data-aos="fade-right" className="rounded-lg" src={about} alt="Image" />
                        </div>
                    </div> 
                </div> 
            </div>
        </div>
        
    );
};

export default AboutUs;