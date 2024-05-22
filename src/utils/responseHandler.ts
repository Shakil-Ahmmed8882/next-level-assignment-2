import { Response } from "express";
import mongoose from "mongoose";

// utils/responseHandler.js
const sendResponse = async(res:Response, success:boolean, message:string, data:any) => {
    res.status(200).json({
      success,
      message,
      data,
    });
  };




  const validateObjectId = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error(`Invalid ID format: ${id}`);
      error.name = 'ValidationError';
      throw error;
    }
  };
  
  export const utils = {
    sendResponse,
    validateObjectId

}
  