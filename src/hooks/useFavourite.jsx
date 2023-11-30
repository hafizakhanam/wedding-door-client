import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useFavourite = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {refetch, data: favourite =[]} = useQuery({
        queryKey: ['favourite', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/favourites?email=${user.email}`)
            return res.data;
        }
    })
    //console.log(favourite)
    return [favourite, refetch]
};

export default useFavourite;