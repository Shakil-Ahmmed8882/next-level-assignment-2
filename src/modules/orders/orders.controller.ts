import { NextFunction, Request, Response } from "express";
import { orderServices } from "./orders.services";

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
    res.status(500).json({
      success: false,
      message: "Somthing went wrong",
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
    const result = await orderServices.getAllOrders();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
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
