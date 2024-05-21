

import ZodOrderSchema from "./orders.zod.validation";
import { TOrders } from "./orders.interface";
import { Order } from "./orders.model";



const createNewOrder = async(payload:TOrders) => {
    const validatedData = ZodOrderSchema.parse(payload)
    return await Order.create(validatedData)
}

const getAllOrders = async() => {
    return await Order.find()
}

export const orderServices = {
    createNewOrder,
    getAllOrders
}