import { IExpense } from './../../../types/Expenses/index';
export interface IProps {
    isOpen: boolean
    onClose: () => void
    refetch: () => void
    gasto?: IExpense
}