import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import menuBg from '../../assets/home/03.jpeg'

const ContactUs = () => {
    return (
        <div>
            <Helmet>
                <title>Wedding Door | Contact Us</title>
            </Helmet>
            <Cover bgImg={menuBg} title="Contact Us"></Cover>
            <div className="py-24 bg-blue-50">
                <div className="max-w-[1280px] mx-auto px-4">
                    <div className="grid grid-cols-2 gap-5 mt-8">
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Name</label>
                            <input name="name" type="text" className="p-2 border" />
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Email</label>
                            <input name="email" type="email" className="p-2 border" />
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Phone</label>
                            <input name="phone" type="text" className="p-2 border" />
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Subject</label>
                            <input name="subject" type="text" className="p-2 border" />
                        </div>
                    </div> 
                    <div className="text-center">
                    <button className="btn mt-4 bg-green-600 px-12 py-2 text-white" type="submit">Submit</button>
                    </div>
                </div> 
            </div>
        </div>
        
    );
};

export default ContactUs;