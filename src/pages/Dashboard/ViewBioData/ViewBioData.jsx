import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ViewBioData = () => {
    const { _id, gender, name, image, dob, height, weight, age, occupation, race, fathersName, mothersName, permanentDiv, presentDiv, partnerAge, partnerHeight, partnerWeight, email, mobile} = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const handlePremium = (id, name, email) => {
        const premium = {
          bioDataId: id,
          bioDataName: name,
          bioDataEmail: email,
          status: 'pending'
        };

        Swal.fire({
            title: "Are you sure?",
            text: "You want to make your profile premium",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Premium"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.post('/reqPremium', premium)
                    .then(res => {
                        if (res.data.insertedId) {
                        Swal.fire({
                            title: "Send!",
                            text: "Your request has been sent.",
                            icon: "success"
                        });
                        }
                    })
                }
        });
          
      };
    return (
        <div className="">
            <SectionTitle subHeading={"Bio Data details information of"} heading={`${name}`}></SectionTitle>
            <div className="mt-12">
                <div className="mb-12 text-center">
                    <button onClick={() => handlePremium(_id, name, email)} className="bg-green-600 p-3 text-white cursor-pointer mb-12">Request for premium</button>
                    <img src={image} className="mx-auto" />
                </div>
                <h5 className="text-base font-bold bg-green-600"><span className="w-[200px] inline-block">Contact Email</span> <span className="font-normal">: {email}</span></h5>
                <h5 className="text-base font-bold bg-green-600"><span className="w-[200px] inline-block">Mobile Number</span> <span className="font-normal">: {mobile}</span></h5>    

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
        </div>
    );
};

export default ViewBioData;