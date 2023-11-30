import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import menuBg from '../../assets/menu/banner3.jpg'
import useBioData from "../../hooks/useBioData";
import BioData from "../Home/BioData/BioData";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useFavourite from "../../hooks/useFavourite";
import useAdmin from "../../hooks/useAdmin";
import usePremium from "../../hooks/usePremium";

const BioDataDetails = () => {
    const currentBioData = useLoaderData();
    const { _id, gender, name, image, dob, height, weight, age, occupation, race, fathersName, mothersName, permanentDiv, presentDiv, partnerAge, partnerHeight, partnerWeight, email, mobile } = currentBioData;

    const [bioData] = useBioData(); 
    const copiedBioData = [...bioData];
    const girlsBioData = copiedBioData.filter(entry => entry.gender === "female").slice(0,3);
    const boysBioData = copiedBioData.filter(entry => entry.gender === "male").slice(0,3);

    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useFavourite();

    const [isAdmin] = useAdmin();
    const [isPremium] = usePremium();

    const handleAddToFavourite  = () =>{
        if(user && user.email){
            const favouriteItem ={
                bioDataId: _id,
                email: user.email,
                name,
                permanentDiv,
                occupation
            }
            axiosSecure.post('/favourites', favouriteItem)
            .then(res =>{
                console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Bio data of ${name} added to your favourite list`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
        }
        else{
            Swal.fire({
                title: "You are not login?",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
              })
              .then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state: {from: location}});
                }
            });
        }
    }
    return (
        <div>
            <Helmet>
                <title>Wedding Door | Bio Data Details</title>
            </Helmet>
            <Cover bgImg={menuBg} title="Our Menu"></Cover>

            <div className="py-24 bg-white">
                <div className="max-w-[1280px] mx-auto px-4">
                    <SectionTitle subHeading={"Our"} heading={"members"}></SectionTitle>
                    <div className="flex gap-5 mt-20">
                        <div className="w-3/4">
                            <div className="flex justify-evenly mb-8">
                                <h3 className="text-2xl font-bold">Bio Data details information of - <span className="text-3xl text-green-600 uppercase">{name}</span></h3>
                                {
                                    user && !isAdmin &&
                                    //<Link to="/dashboard/payment"><div className="bg-green-600 p-3 text-white cursor-pointer">Request to Contact</div></Link>
                                    <button onClick={()=>navigate('/dashboard/checkout', { state: {id: _id, name: name }})} className="bg-green-600 p-3 text-white cursor-pointer">Request to Contact</button>
                                }
                                <div onClick={handleAddToFavourite} className="bg-green-600 p-3 text-white cursor-pointer"><FaHeart></FaHeart></div>
                            </div>
                            
                            <div className="mb-8"><img src={image} /></div>
                            {
                                user && isPremium &&
                                <div>
                                    <h5 className="text-base font-bold bg-green-600"><span className="w-[200px] inline-block">Contact Email</span> <span className="font-normal">: {email}</span></h5>
                                    <h5 className="text-base font-bold bg-green-600"><span className="w-[200px] inline-block">Mobile Number</span> <span className="font-normal">: {mobile}</span></h5>
                                </div>     
                            }
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">ID</span> <span className="font-normal">: {_id}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Biodata Type</span> <span className="font-normal">: {gender}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Date of birth</span> <span className="font-normal">: {dob}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Height</span> <span className="font-normal">: {height}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Weight</span> <span className="font-normal">: {weight}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Age</span> <span className="font-normal">: {age}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Occupation</span> <span className="font-normal">: {occupation}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Race</span> <span className="font-normal">: {race}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Fathers name</span> <span className="font-normal">: {fathersName}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Mothers name</span> <span className="font-normal">: {mothersName}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Permanent Division</span> <span className="font-normal">: {permanentDiv}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Present Division</span> <span className="font-normal">: {presentDiv}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Expected Partner Age</span> <span className="font-normal">: {partnerAge}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Expected Partner Height</span> <span className="font-normal">: {partnerHeight}</span></h5>
                            <h5 className="text-base font-bold"><span className="w-[200px] inline-block">Expected Partner Weight</span> <span className="font-normal">: {partnerWeight}</span></h5>
                        </div>
                        <div className="w-1/4">
                            <h3 className="text-2xl font-bold mb-8">Related Bio Data:</h3>
                            <div className="grid grid-cols-1 gap-6">
                                { (gender === 'female') ?
                                    girlsBioData.map(item => <BioData key={item._id} item={item}></BioData>)
                                    :boysBioData.map(item => <BioData key={item._id} item={item}></BioData>)
                                }
                            </div> 
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default BioDataDetails;