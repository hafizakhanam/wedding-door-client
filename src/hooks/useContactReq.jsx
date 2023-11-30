import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useContactReq = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {refetch, data: reqContact =[]} = useQuery({
        queryKey: ['reqContact', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/reqContacts?email=${user.email}`)
            return res.data;
        }
    })
    //console.log(reqContact)
    return [reqContact, refetch]
};

export default useContactReq;