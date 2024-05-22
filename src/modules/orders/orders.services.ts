

import ZodOrderSchema from "./orders.zod.validation";
import { TOrders } from "./orders.interface";
import { Order } from "./orders.model";
import mongoose from "mongoose";
import { Product } from "../products/product.model";
import { utils } from "../../utils/responseHandler";


const createNewOrder = async (payload: TOrders) => {
    // Validate the order payload
    const validatedData = ZodOrderSchema.parse(payload);

    // get product id and validate it, is it valid
    const id = validatedData.productId;
    utils.validateObjectId(id)
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


const getAllOrders = async(filter:any) => {
    return await Order.find(filter)
}




export const orderServices = {
    createNewOrder,
    getAllOrders,
}