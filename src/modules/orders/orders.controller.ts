import { NextFunction, Request, Response } from "express";
import { orderServices } from "./orders.services";
import { utils } from "../../utils";
import { CustomError } from "../../utils/index.interface";



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
  } catch (error) {
    next(error)
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
    const filter : any = {}
    if(email){
      filter.email = email  
    }

    const result = await orderServices.getAllOrders(filter);
    utils.sendResponse(res,"Successfully fetched order",result)


  } catch (error) {
    next(error)
  }
};

export const orderControllers = {
  createNewOrder,
  getAllOrders
};
