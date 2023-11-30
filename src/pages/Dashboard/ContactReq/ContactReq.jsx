import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useContactReq from "../../../hooks/useContactReq";


const ContactReq = () => {
    const [reqContact, refetch] = useContactReq();
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
                axiosSecure.delete(`/reqContacts/${id}`)
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
            <SectionTitle heading={"My Requested Contact List"} ></SectionTitle>
            <div className="overflow-x-auto mt-8">
                <table className="table-auto border-collapse border border-slate-300 w-full">
                    {/* head */}
                    <thead>
                    <tr>
                        <th className="border border-slate-300 bg-green-600 p-2">#</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Biodata Id</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Status</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Mobile No</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Email</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            reqContact.map((item, index) => <tr key={item._id}>
                                <th className="border border-slate-300 p-2">{index + 1}</th>
                                <td className="border border-slate-300 p-2">{item.reqBioDataId}</td>
                                <td className="border border-slate-300 p-2">{item.status}</td>
                                <td className="border border-slate-300 p-2">{item.reqmobile}</td>
                                <td className="border border-slate-300 p-2">{item.reqemail}</td>
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

export default ContactReq;