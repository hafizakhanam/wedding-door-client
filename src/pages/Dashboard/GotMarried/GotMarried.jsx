import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const GotMarried = () => {
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
            const review = {
                selfBioDataId: data.selfBioDataId,
                partnerBioDataId: data.partnerBioDataId,
                image: res.data.data.display_url,
                marriageDate: data.marriageDate,
                reviewStar: data.reviewStar,
                successStory: data.successStory
            }
            const reviewRes = await axiosSecure.post('/reviews', review);
            console.log(reviewRes.data)
            if(reviewRes.data.insertedId){
                reset();
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Bio Data is added`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log(res.data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-5 mt-8">
            <div className="flex-col flex my-4">
                <label className="mb-1">Self Bio data Id</label>
                <input  {...register("selfBioDataId", {required: true})} type="text" className="p-2 border" />
            </div>
            <div className="flex-col flex my-4">
                <label className="mb-1">Partner Bio data Id</label>
                <input  {...register("partnerBioDataId", {required: true})} type="text" className="p-2 border" />
            </div>
            <div className="flex-col flex my-4">
                <label className="mb-1">Couple Image</label>
                <input  {...register("image", {required: true})} type="file" className="p-2 border" />
            </div>
            <div className="flex-col flex my-4">
                <label className="mb-1">Marriage Date</label>
                <input  {...register("marriageDate", {required: true})} type="date" className="p-2 border" />
            </div>
            <div className="flex-col flex my-4">
                <label className="mb-1">Ratings <small>(out of 5)</small></label>
                <input  {...register("reviewStar", {required: true})} type="number" className="p-2 border" />
            </div>
            <div className="flex-col flex my-4">
                <label className="mb-1">Success Story</label>
                <textarea  {...register("successStory", {required: true})} type="textarea" className="p-2 border" />
            </div>
        </div>

         <button className="btn mt-4 bg-green-600 px-12 py-2 text-white">Submit</button>

    </form>
    );
};

export default GotMarried;