import { IExpense } from "../../../types"
import { api } from "../../api"
import { useQuery } from "@tanstack/react-query";

export const createExpense = async (expense: IExpense) => {
    let { data } = await api.post('/expenses', expense)
    return data
}

export const editExpense = async (expense: IExpense) => {
    let { data } = await api.put(`/expenses/${expense._id}`, expense)
    return data
}


export const deleteExpense = async (id: any) => {
    let { data } = await api.delete(`/expenses/${id}`)
    return data
}

export const listAll = async () => {
    let { data } = await api.get('/expenses')
    return data
}

export const useGetAllExpenses = () => {
    return useQuery(['get-all-expenses'], () => {
        return listAll()
    })
}