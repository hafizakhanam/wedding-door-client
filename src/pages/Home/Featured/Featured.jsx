import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useBioData from "../../../hooks/useBioData";
import BioData from "../BioData/BioData";

const Featured = () => {
    const [bioData] = useBioData();
    const premiumDatas = bioData.filter(bio => bio.type === 'premium');
    //console.log(premiumDatas)
    const sortedData = premiumDatas.sort((a,b) => {
        //console.log(a, b);
        return b.age - a.age;
    })
    
    const featuredItems = sortedData.slice(0,6);
    //console.log(featuredItems)
    return (
        <div className="py-24 bg-white">
            <div className="max-w-[1280px] mx-auto px-4">
                <SectionTitle subHeading={"Our"} heading={"premium member"}></SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
                    {
                       featuredItems.map(item => <BioData key={item._id} item={item}></BioData>)
                    }
                </div> 
            </div> 
        </div>
    );
};

export default Featured;