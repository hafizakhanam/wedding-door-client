import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

import menuBg from '../../assets/home/03.jpeg'
import BioData from "../Home/BioData/BioData";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";


const BioDatas = () => {
    const [bioData, setBioData] = useState([]);
    const [ageData, setAgeData] = useState("");
    const [genderData, setGenderData] = useState("");
    const [divisionData, setDivisionData] = useState("");
    const axiosSecure = useAxiosSecure();

    

    const handleFilter = () => {
        axiosSecure.get(`/bioData?age=${ageData}&gender=${genderData}&division=${divisionData}`)
        .then(res => setBioData(res.data))
        
    };
    useEffect(( ) => {
        handleFilter();
    }, [ageData, genderData, divisionData])
    const handleClear = () =>{
        setAgeData("");
        setGenderData("");
        setDivisionData("");
    }
    return (
        <div>
            <Helmet>
                <title>Wedding Door | Bio Data</title>
            </Helmet>
            <Cover bgImg={menuBg} title="Bio Data List"></Cover>

            <div className="py-24 bg-white">
                <div className="max-w-[1280px] mx-auto px-4">
                    <SectionTitle subHeading={"Our"} heading={"members"}></SectionTitle>
                    <div className="flex gap-5 mt-20">
                        <div className="w-1/4">
                            <div>
                                <div className="flex-col flex my-4">
                                    <label className="mb-1">Age (<small>0 - expected range</small>)</label>
                                    <input onChange={(e)=>setAgeData(e.target.value)} name="age" type="text" className="p-2 border" />
                                </div>
                                <div className="flex-col flex my-4">
                                    <label className="mb-1">Type</label>
                                    <select onChange={(e)=>setGenderData(e.target.value)} defaultValue="default" name="gender" className="p-2 border">
                                        <option disabled value="default">Select a option</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="flex-col flex my-4">
                                    <label className="mb-1">Permanent Division</label>
                                    <select onChange={(e)=>setDivisionData(e.target.value)} defaultValue="default" name="division" className="p-2 border">
                                        <option disabled value="default">Select a option</option>
                                        <option value="dhaka">Dhaka</option>
                                        <option value="chattagram">Chattagram</option>
                                        <option value="rangpur">Rangpur</option>
                                        <option value="barisal">Barisal</option>
                                        <option value="khulna">Khulna</option>
                                        <option value="maymansign">Maymansign</option>
                                        <option value="sylhet">Sylhet</option>
                                    </select>
                                </div>
                                <div className="text-center">
                                    <button onClick={handleClear} type="button" className="bg-green-500 text-white py-2 px-8">Clear Filter</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-3/4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                bioData.map(item => <BioData key={item._id} item={item}></BioData>)
                                }
                            </div> 
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default BioDatas;