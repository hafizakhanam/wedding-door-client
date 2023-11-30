import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useFavourite from "../../../hooks/useFavourite";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const Favourite = () => {
    const [favourite, refetch] = useFavourite();
    const axiosSecure = useAxiosSecure();

    const handleDelete = id =>{
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/favourites/${id}`)
                .then(res =>{
                    if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                })
            }
        });
    }
    return (
        <div>
            <SectionTitle heading={"My Favourite List"} ></SectionTitle>
            <div className="overflow-x-auto mt-8">
                <table className="table-auto border-collapse border border-slate-300 w-full">
                    {/* head */}
                    <thead>
                    <tr>
                        <th className="border border-slate-300 bg-green-600 p-2">#</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Name</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Bio data Id</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Permanent Address</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Occupation</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            favourite.map((item, index) => <tr key={item._id}>
                                <th className="border border-slate-300 p-2">{index + 1}</th>
                                <td className="border border-slate-300 p-2">{item.name}</td>
                                <td className="border border-slate-300 p-2">{item.bioDataId}</td>
                                <td className="border border-slate-300 p-2">{item.permanentDiv}</td>
                                <td className="border border-slate-300 p-2">{item.occupation}</td>
                                <th className="border border-slate-300 p-2">
                                <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg"> <FaTrash className="text-red-600"/> </button>
                                </th>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Favourite;