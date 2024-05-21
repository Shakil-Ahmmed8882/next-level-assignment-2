

import ZodOrderSchema from "./orders.zod.validation";
import { TOrders } from "./orders.interface";
import { Order } from "./orders.model";
import mongoose from "mongoose";
import { Product } from "../products/product.model";



const createNewOrder = async(payload:TOrders) => {
    const validatedData = ZodOrderSchema.parse(payload)
    
    const id = validatedData.productId
    const objectId = new mongoose.Types.ObjectId(id)
    const product = await Product.findOne({_id:objectId})


    if(!product) return {success:false, message:"not found (404)"}


    
    const updatedQuantityDoc = await Product.findOneAndUpdate(
        {_id:objectId},{
            $inc:{quantity: -validatedData.quantity},
            $set:{isStock: validatedData.quantity > 0}
        }
    )



    const result = await Order.create(validatedData)
    return result

}

const getAllOrders = async() => {
    return await Order.find()
}
const getOrdersByUserEmail = async(email:any) => {
    return await Order.findOne({email})
}




export const orderServices = {
    createNewOrder,
    getAllOrders,
    getOrdersByUserEmail
}