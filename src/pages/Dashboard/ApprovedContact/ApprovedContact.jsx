import { FaMedal} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const ApprovedContact = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reqContact =[]} = useQuery({
        queryKey: ['reqContact'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/requestContacts')
            return res.data;
        }
    })

    const handleContact = id =>{
        const bioData = {
            contactStatus: 'approved'
        }
        axiosSecure.patch(`/bioData/premium/${id}`, bioData)
        .then(res =>{
            console.log(res)
            if(res.data.modifiedCount > 0){
                
                // refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${id} is premium now`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

    return (
        <div>
            <SectionTitle heading={"Manage Bio data contact request"} ></SectionTitle>
            <div className="overflow-x-auto mt-8">
                <table className="table-auto border-collapse border border-slate-300 w-full">
                    {/* head */}
                    <thead>
                    <tr>
                        <th className="border border-slate-300 bg-green-600 p-2">#</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Name</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Email</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Bio  data Id</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Approved contact request</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            reqContact.map((reqContact, index) => <tr key={reqContact._id}>
                                <th className="border border-slate-300 p-2">{index + 1}</th>
                                <td className="border border-slate-300 p-2">{reqContact.userBioDataName}</td>
                                <td className="border border-slate-300 p-2">{reqContact.email}</td>
                                <td className="border border-slate-300 p-2">{reqContact.userBioDataId}</td>
                                <th className="border border-slate-300 p-2">
                                     <button onClick={() => handleContact(reqContact.userBioDataId)} className="btn bg-green-600 p-2 btn-md"> <FaMedal className="text-white"/> </button>
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

export default ApprovedContact;