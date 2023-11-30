import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditBioData = () => {
    const { gender, name, dob, height, weight, age, occupation, race, fathersName, mothersName, permanentDiv, presentdiv, partnerAge, partnerHeight, partnerWeight, email, mobile} = useLoaderData();
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if(res.data.success){
            const bioDataItem = {
                _id: data._id,
                gender: data.gender,
                name: data.name,
                image: res.data.data.display_url,
                dob: data.dob,
                height: data.height,
                weight: data.weight,
                age: parseInt(data.age),
                occupation: data.occupation,
                race: data.race,
                fathersName: data.fathersName,
                mothersName: data.mothersName,
                permanentDiv: data.permanentDiv,
                presentDiv: data.presentDiv,
                partnerAge: parseInt(data.partnerAge),
                partnerHeight: data.partnerHeight,
                partnerWeight: data.partnerWeight,
                email: data.email,
                mobile: data.mobile
            }
            const bioDataRes = await axiosSecure.patch('/bioData/:id', bioDataItem);
            console.log(bioDataRes.data)
            if(bioDataRes.data.modifiedCount > 0){
                reset();
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Bio Data is Updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log(res.data)
    }

    return (
        <div className="mb-12">
            <SectionTitle heading={"Edit your bio data"}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-5">
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Type</label>
                            <select defaultValue={gender} {...register("gender", {required: true})} className="p-2 border">
                                <option disabled value="default">Select a option</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Name</label>
                            <input defaultValue={name} {...register("name", {required: true})} type="text" className="p-2 border" />
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Profile Image</label>
                            <input {...register("image", {required: true})} type="file" className="p-2 border" />
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Date of birth</label>
                            <input defaultValue={dob} {...register("dob", {required: true})} type="date" className="p-2 border" />
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Height</label>
                            <select defaultValue={height} {...register("height", {required: true})} className="p-2 border">
                                <option disabled value="default">Select a option</option>
                                <option value="10">1 Meter</option>
                                <option value="20">1.1 Meter</option>
                                <option value="30">1.2 Meter</option>
                                <option value="40">1.3 Meter</option>
                                <option value="50">1.4 Meter</option>
                                <option value="60">1.5 Meter</option>
                                <option value="70">1.6 Meter</option>
                                <option value="80">1.7 Meter</option>
                                <option value="90">1.8 Meter</option>
                                <option value="100">1.9 Meter</option>
                            </select>
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Weight</label>
                            <select defaultValue={weight} {...register("weight", {required: true})} className="p-2 border">
                                <option disabled value="default">Select a option</option>
                                <option value="10">10 KG</option>
                                <option value="20">20 KG</option>
                                <option value="30">30 KG</option>
                                <option value="40">40 KG</option>
                                <option value="50">50 KG</option>
                                <option value="60">60 KG</option>
                                <option value="70">70 KG</option>
                                <option value="80">80 KG</option>
                                <option value="90">90 KG</option>
                                <option value="100">100 KG</option>
                            </select>
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Age</label>
                            <input defaultValue={age} {...register("age", {required: true})} type="number" className="p-2 border" />
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Occupation</label>
                            <select defaultValue={occupation} {...register("occupation", {required: true})} className="p-2 border">
                                <option disabled value="default">Select a option</option>
                                <option value="student">Student</option>
                                <option value="job">Job</option>
                                <option value="house wife">House Wife</option>
                            </select>
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Race</label>
                            <select defaultValue={race} {...register("race", {required: true})} className="p-2 border">
                                <option disabled value="default">Select a option</option>
                                <option value="muslim">Muslim</option>
                                <option value="hindu">Hindu</option>
                            </select>
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Fathers Name</label>
                            <input defaultValue={fathersName} {...register("fathersName", {required: true})} type="text" placeholder="Fathers Name" className="p-2 border" />
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Mothers Name</label>
                            <input defaultValue={mothersName} {...register("mothersName", {required: true})} type="text" placeholder="Mothers Name" className="p-2 border" />
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Permanent Division</label>
                            <select defaultValue={permanentDiv} {...register("permanentDiv", {required: true})} className="p-2 border">
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
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Present Division</label>
                            <select defaultValue={presentdiv} {...register("presentDiv", {required: true})} className="p-2 border">
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
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Expected Partner Age</label>
                            <input defaultValue={partnerAge} {...register("partnerAge", {required: true})} type="number" className="p-2 border" />
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Expected Partner Height</label>
                            <select defaultValue={partnerHeight} {...register("partnerHeight", {required: true})} className="p-2 border">
                                <option disabled value="default">Select a option</option>
                                <option value="10">1 Meter</option>
                                <option value="20">1.1 Meter</option>
                                <option value="30">1.2 Meter</option>
                                <option value="40">1.3 Meter</option>
                                <option value="50">1.4 Meter</option>
                                <option value="60">1.5 Meter</option>
                                <option value="70">1.6 Meter</option>
                                <option value="80">1.7 Meter</option>
                                <option value="90">1.8 Meter</option>
                                <option value="100">1.9 Meter</option>
                            </select>
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Expected Partner Weight</label>
                            <select defaultValue={partnerWeight} {...register("partnerWeight", {required: true})} className="p-2 border">
                                <option disabled value="default">Select a option</option>
                                <option value="10">10 KG</option>
                                <option value="20">20 KG</option>
                                <option value="30">30 KG</option>
                                <option value="40">40 KG</option>
                                <option value="50">50 KG</option>
                                <option value="60">60 KG</option>
                                <option value="70">70 KG</option>
                                <option value="80">80 KG</option>
                                <option value="90">90 KG</option>
                                <option value="100">100 KG</option>
                            </select>
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Contact Email</label>
                            <input defaultValue={email} {...register("email", {required: true})} type="email" className="p-2 border" readOnly />
                        </div>
                        <div className="flex-col flex my-4">
                            <label className="mb-1">Mobile Number</label>
                            <input defaultValue={mobile} {...register("mobile", {required: true})} type="text" className="p-2 border" />
                        </div>
                    </div>
                    
                    
                    
                    <button className="bg-green-500 text-white py-2 px-8"> Save And Publish Now</button>
                </form>
            </div>
        </div>
    );
};

export default EditBioData;