import type { Product } from "../feature/home/types/product-type"
import { apiClient } from "../libs/apiClient"

export const getAllDummyData= async(): Promise<Product[]>=> {
    const {data}= await apiClient.get("/")
    return data
}