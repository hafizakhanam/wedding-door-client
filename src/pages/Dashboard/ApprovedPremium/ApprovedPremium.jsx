import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const ApprovedPremium = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: reqPremium =[]} = useQuery({
        queryKey: ['reqPremium'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/requestPremium')
            return res.data;
        }
    })

    const handleContact = (id, reqId) =>{
        const patchRequests = [
            axiosSecure.patch(`/bioData/premium/${id}`),
            axiosSecure.patch(`/requestPremium/${reqId}`),
        ];

        Promise.all(patchRequests)
            .then(responses => {
                const bioDataResponse = responses[0];
                const requestPremiumResponse = responses[1];
            
                if (bioDataResponse.data.modifiedCount > 0 && requestPremiumResponse.data.modifiedCount > 0) {
                    refetch();
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
            <SectionTitle heading={"Manage Premium request"} ></SectionTitle>
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
                            reqPremium.map((reqPremium, index) => <tr key={reqPremium._id}>
                                <th className="border border-slate-300 p-2">{index + 1}</th>
                                <td className="border border-slate-300 p-2">{reqPremium.bioDataName}</td>
                                <td className="border border-slate-300 p-2">{reqPremium.bioDataEmail}</td>
                                <td className="border border-slate-300 p-2">{reqPremium.bioDataId}</td>
                                <th className="border border-slate-300 p-2">
                                     <button onClick={() => handleContact(reqPremium.bioDataId, reqPremium._id)} className="btn bg-green-600 p-2 btn-md">{reqPremium.status}</button>
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

export default ApprovedPremium;