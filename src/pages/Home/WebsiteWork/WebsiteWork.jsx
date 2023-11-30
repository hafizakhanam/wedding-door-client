import { FaArrowRight } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const WebsiteWork = () => {
    return (
        <div className="py-24 bg-green-600">
            <div className="max-w-[1280px] mx-auto px-4">
                <SectionTitle subHeading={"How"} heading={"Websites Work"}></SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-20">
                    <div className="flex items-center justify-between">
                        <div className="border border-white w-[300px]">
                            <h3 className="text-2xl text-white capitalize text-center p-5">1. create a profile</h3>
                        </div>
                        <FaArrowRight className="text-4xl text-white ml-5"></FaArrowRight>
                    </div>
                    <div className="flex items-center  justify-between">
                        <div className="border border-white w-[300px]">
                            <h3 className="text-2xl text-white capitalize text-center p-5">1. find the biodata</h3>
                        </div>
                        <FaArrowRight className="text-4xl text-white ml-5"></FaArrowRight>
                    </div>
                    <div className="flex items-center  justify-between">
                        <div className="border border-white w-[300px]">
                            <h3 className="text-2xl text-white capitalize text-center p-5">1. contact us</h3>
                        </div>
                        <FaArrowRight className="text-4xl text-white ml-5"></FaArrowRight>
                    </div>
                    <div className="flex items-center  justify-between">
                        <div className="border border-white w-[300px]">
                            <h3 className="text-2xl text-white capitalize text-center p-5">1. Get married</h3>
                        </div>
                        <FaArrowRight className="text-4xl text-white ml-5"></FaArrowRight>
                    </div>
                </div> 
            </div> 
        </div>
    );
};

export default WebsiteWork;