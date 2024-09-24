import { OrderItem } from "./order-item.interface"

export interface Order {
    id: number
    orderItems: OrderItem[]
    totalAmount: number
    orderDateTime: string
    orderAt: string
    status: string
    should_call: boolean
    should_multi_buy: boolean


}