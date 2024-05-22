import { NextFunction, Request, Response } from "express";
import { productServices } from "./product.service";
import { utils } from "../../utils";

const createProduct = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await productServices.createProduct(req.body);

    // response 
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    next(error)
    }
  
};

const searchProducts = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { searchTerm } = req.query;
    let filter : any = {}

    if(searchTerm){
      filter ={
        $or:[
          {name: {$regex:searchTerm,$options:'i'}},
          {description: {$regex:searchTerm,$options:'i'}}
        ]
      }
    }


    // Perform regular search if searchTerm does not exist
    const result = await productServices.searchProducts(filter);

    utils.sendResponse(res,"Products fetched successfully.",result)

  } catch (error: any) {
    next(error)
  }
};

const getSingleProduct = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { productId } = req.params;
    utils.validateObjectId(productId)
    const result = await productServices.getSingleProduct(productId);

    // response
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};
const updateSingleProduct = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { productId } = req.params;
    const { data } = req.body;

    const result = await productServices.updateSingleProduct(productId, data);
    // response
    utils.sendResponse(res,'Products updated successfully!',result)
  } catch (error) {
    next(error)
  }
};
const deleteSingleProduct = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { productId } = req.params;

    await productServices.deleteSingleProduct(productId);

    // response
    res.status(200).json({
      success: true,
      message: "Products deleted successfully!",
      data: null,
    });
  } catch (error) {
    next(error)
  }
  
};

export const productControllers = {
  createProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  searchProducts,
};
