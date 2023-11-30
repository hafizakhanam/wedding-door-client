import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBioData = () => {
    const axiosPublic = useAxiosPublic();

    const {refetch, data: bioData =[], isPending: loading} = useQuery({
        queryKey: ['bioData'],
        queryFn: async() => {
            const res = await axiosPublic.get('/bioData');
            //console.log(res.data);
            return res.data;
        }
    })
    return [bioData, loading, refetch]
}

export default useBioData;