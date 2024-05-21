import { Request, Response } from "express";
import { productServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await productServices.createProduct(req.body);

    // response
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProducts();
    // response
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
} catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch data",
        error
      });

  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const {productId} = req.params

    const result = await productServices.getSingleProduct(productId);

    // response
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
} catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch data",
        error
      });

  }
};
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const {productId} = req.params
    const {data} = req.body

    const result = await productServices.updateSingleProduct(productId,data);

    // response
    res.status(200).json({
      success: true,
      message: "Products updated successfully!",
      data: result,
    });
} catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch data",
        error
      });

  }
};


export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct

};
