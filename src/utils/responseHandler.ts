import { Response } from "express";

// utils/responseHandler.js
const sendResponse = async(res:Response, success:boolean, message:string, data:any) => {
    res.status(200).json({
      success,
      message,
      data,
    });
  };
  
  export default sendResponse;
  