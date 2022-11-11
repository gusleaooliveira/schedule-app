import { IRevenue } from "../../../types"
import { api } from "../../api"
import { useQuery } from "@tanstack/react-query";

export const createRevenue = async (revenue: IRevenue) => {
    let { data } = await api.post('/revenues', revenue)
    return data
}

export const editRevenue = async (revenue: IRevenue) => {
    let { data } = await api.put(`/revenues/${revenue._id}`, revenue)
    return data
}


export const deleteRevenue = async (id: any) => {
    let { data } = await api.delete(`/ revenues / ${id}`)
    return data
}

export const listAll = async () => {
    let { data } = await api.get('/revenues')
    return data
}

export const useGetAllRevenues = () => {
    return useQuery(['get-all-revenues'], () => {
        return listAll()
    })
}