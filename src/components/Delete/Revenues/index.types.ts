import { IRevenue } from './../../../types/Revenues/index';
export interface IProps {
    isOpen: boolean
    onClose: () => void
    refetch: () => void
    recebimento?: IRevenue
}