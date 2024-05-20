import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import ZodProductSchema from "./product.zod.validation";


const createProduct = async(payload:TProduct)=>{
    const validatedData = ZodProductSchema.parse(payload)
    return await Product.create(validatedData)
}



export const productServices = {
    createProduct,
}