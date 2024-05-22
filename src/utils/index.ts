import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CustomError } from "./index.interface";

const RouteNotFoundError = (req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "Route not found",
  });
};




function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  res.status(err.statusCode || 500).send({
    success: false,
    message: err.message || "Internal Server Error",
    error: err,
  });
}


const sendResponse = async (
  res: Response,
  success: boolean,
  message: string,
  data: any
) => {
  res.status(200).json({
    success,
    message,
    data,
  });
};

const validateObjectId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`Invalid ID format: ${id}`);
    error.name = "ValidationError";
    throw error;
  }
};

export const utils = {
  RouteNotFoundError,
  errorHandler,
  sendResponse,
  validateObjectId,
};
