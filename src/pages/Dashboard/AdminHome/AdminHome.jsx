import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBookOpen, FaDollarSign } from "react-icons/fa";


const AdminHome = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: stats} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async() => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }

    })

    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>

            <div className="flex gap-8 mt-8">
                <div className=" bg-green-600 rounded-md text-white p-4">
                    <div className="text-2xl text-center">
                        <FaBookOpen className="mx-auto"></FaBookOpen>
                        <div className="stat-title ml-2 capitalize">Total Bio Data</div>
                    </div>
                    <div className="text-center mt-4">${stats?.bioDataItems}</div>
                </div>
                <div className=" bg-green-600 rounded-md text-white p-4">
                    <div className="text-2xl text-center">
                        <FaBookOpen className="mx-auto"></FaBookOpen>
                        <div className="stat-title ml-2 capitalize">Total Male Bio data</div>
                    </div>
                    <div className="text-center mt-4">${stats?.maleCount}</div>
                </div>
                <div className=" bg-green-600 rounded-md text-white p-4">
                    <div className="text-2xl text-center">
                        <FaBookOpen className="mx-auto"></FaBookOpen>
                        <div className="stat-title ml-2 capitalize">Total female Bio data</div>
                    </div>
                    <div className="text-center mt-4">${stats?.femaleCount}</div>
                </div>
                <div className=" bg-green-600 rounded-md text-white p-4">
                    <div className="text-2xl text-center">
                        <FaBookOpen className="mx-auto"></FaBookOpen>
                        <div className="stat-title ml-2 capitalize">Total premium Bio data</div>
                    </div>
                    <div className="text-center mt-4">${stats?.premiumCount}</div>
                </div>
                <div className=" bg-green-600 rounded-md text-white p-4">
                    <div className="text-2xl text-center">
                        <FaDollarSign className="mx-auto"></FaDollarSign>
                        <div className="stat-title ml-2 capitalize">Total Revenue</div>
                    </div>
                    <div className="text-center mt-4">${stats?.revenue}</div>
                </div>
                
            </div>
        </div>
    );
};

export default AdminHome;