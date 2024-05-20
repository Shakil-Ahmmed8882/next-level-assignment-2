import { Request, Response } from "express";
import { productServices } from "./product.service";



const createProduct = async(req:Request,res:Response) => {
   
    try {
        const result = await productServices.createProduct(req.body) 
        
        // response
        res.status(200).json({
            success:true,
            message:'successfully added a product',
            data:result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Something went wrong',
            error
        })
        
    }


}


export const productControllers = {
    createProduct
}