
import CountUp from 'react-countup';
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useBioData from "../../../hooks/useBioData";


const SuccessCounter = () => {
    const [bioData] = useBioData();
    const copiedBioData = [...bioData];

    const girlsBioData = copiedBioData.filter(entry => entry.gender === "female");
    const boysBioData = copiedBioData.filter(entry => entry.gender === "male");
    return (
        <div className="py-24 bg-white">
            <div className="max-w-[1280px] mx-auto px-4">
                <SectionTitle subHeading={"Our"} heading={"Success Story"}></SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-20">
                    <div className="">
                        <h1 className="text-7xl text-green-600 text-center font-bold"><CountUp end={bioData.length} /></h1>
                        <h3 className="text-2xl  capitalize text-center p-5">total biodata</h3>
                    </div>
                    <div className="">
                        <h1 className="text-7xl text-green-600 text-center font-bold"><CountUp end={girlsBioData.length} /></h1>
                        <h3 className="text-2xl  capitalize text-center p-5">girls biodata</h3>
                    </div>
                    <div className="">
                        <h1 className="text-7xl text-green-600 text-center font-bold"><CountUp end={boysBioData.length} /></h1>
                        <h3 className="text-2xl  capitalize text-center p-5">boys biodata</h3>
                    </div>
                    <div className="">
                    <h1 className="text-7xl text-green-600 text-center font-bold"><CountUp end={bioData.length} /></h1>
                        <h3 className="text-2xl  capitalize text-center p-5">marriages completed</h3>
                    </div>
                </div> 
            </div> 
        </div>
    );
};

export default SuccessCounter;