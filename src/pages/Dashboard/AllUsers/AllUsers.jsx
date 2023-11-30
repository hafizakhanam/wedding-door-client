import { FaMedal, FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const {refetch, data: users =[]} = useQuery({
        queryKey: ['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.email} is an admin now`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

    const handleMakePremium = user =>{
        axiosSecure.patch(`/users/premium/${user._id}`)
        .then(res =>{
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.email} is premium now`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

    const handleDeleteUser = user =>{
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
                axiosSecure.delete(`/users/${user._id}`)
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
            <SectionTitle heading={"Manage users"} ></SectionTitle>
            <div className="overflow-x-auto mt-8">
                <table className="table-auto border-collapse border border-slate-300 w-full">
                    {/* head */}
                    <thead>
                    <tr>
                        <th className="border border-slate-300 bg-green-600 p-2">#</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Name</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Email</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Role</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Type</th>
                        <th className="border border-slate-300 bg-green-600 p-2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th className="border border-slate-300 p-2">{index + 1}</th>
                                <td className="border border-slate-300 p-2">{user.name}</td>
                                <td className="border border-slate-300 p-2">{user.email}</td>
                                <th className="border border-slate-300 p-2">
                                    {
                                        user.role === 'admin' ? 'Admin'
                                        : <button onClick={() => handleMakeAdmin(user)} className="btn bg-green-600 p-2 btn-md"> <FaUsers className="text-white"/> </button>
                                    }
                                </th>
                                <th className="border border-slate-300 p-2">
                                    {
                                        user.type === 'premium' ? 'Premium'
                                        : <button onClick={() => handleMakePremium(user)} className="btn bg-green-600 p-2 btn-md"> <FaMedal className="text-white"/> </button>
                                    }
                                </th>
                                <th className="border border-slate-300 p-2">
                                    <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg"> <FaTrash className="text-red-600"/> </button>
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

export default AllUsers;