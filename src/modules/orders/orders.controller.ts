import { NextFunction, Request, Response } from "express";
import { orderServices } from "./orders.services";
import sendResponse from "../../utils/responseHandler";

const createNewOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await orderServices.createNewOrder(req.body);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error:any) {
    const statusCode = error.message.includes("Insufficient stock") || error.message.includes("Product not found") ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
      error,
    });
  }
};


const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // search query 
    const {email} = req.query
    
    // if email passed find specific order
    // else all orders 
    let filter : any = {}
    if(email){
      filter.email = email  
    }

    
    const result = await orderServices.getAllOrders(filter);
    return await sendResponse(
       res,
       true,
       "Orders fetched successfully for user email!",
       result);


  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error
    });
  }
};

export const orderControllers = {
  createNewOrder,
  getAllOrders
};
