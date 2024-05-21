

import ZodOrderSchema from "./orders.zod.validation";
import { TOrders } from "./orders.interface";
import { Order } from "./orders.model";
import mongoose from "mongoose";
import { Product } from "../products/product.model";


const createNewOrder = async (payload: TOrders) => {
    // Validate the order payload
    const validatedData = ZodOrderSchema.parse(payload);
    
    const id = validatedData.productId;
    const objectId = new mongoose.Types.ObjectId(id);

    // Finding the product by ID in DB
    const product = await Product.findOne({ _id: objectId },{inventory:1});
    if (!product) throw new Error("Product not found (404)");


    const productQuantity = product.inventory.quantity
    const orderQuantity = validatedData.quantity

    // if user orders more than available products
    if(orderQuantity > productQuantity) throw new Error("Oops! Insufficient stock");


    // Reducing product quanity by order quantity
    const updatedProduct = await Product.findOneAndUpdate({_id:objectId},{
        $inc:{'inventory.quantity':-validatedData.quantity}
    },{new:true})

    // if quntity was not updated return false
    if(!updatedProduct) throw new Error("Error updating product inventory");

    // if there is no product then set inStock === false and save
    if(updatedProduct.inventory.quantity <= 0){
        updatedProduct.inventory.inStock = false ;
        updatedProduct.save()
    }

    // finally create an order in Order collection 
    const result = await Order.create(validatedData);
    return { success: true, data: result };
};







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