import { useQuery } from "@tanstack/react-query";
import { getAllDummyData } from "../../../service/dashboard-service";

export const useGetAllData= ()=> {
    const {data,isLoading,isError}= useQuery({
    queryKey:['productdata'],
    queryFn:getAllDummyData
})
return{
    data,
    isLoading,
    isError
}
}