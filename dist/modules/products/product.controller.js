"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = void 0;
const product_service_1 = require("./product.service");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productServices.createProduct(req.body);
        // response 
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const searchProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        let filter = {};
        if (searchTerm) {
            filter = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } }
                ]
            };
        }
        // Perform regular search if searchTerm does not exist
        const result = yield product_service_1.productServices.searchProducts(filter);
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productServices.getSingleProduct(productId);
        // response
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { data } = req.body;
        const result = yield product_service_1.productServices.updateSingleProduct(productId, data);
        // response
        res.status(200).json({
            success: true,
            message: "Products updated successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield product_service_1.productServices.deleteSingleProduct(productId);
        // response
        res.status(200).json({
            success: true,
            message: "Products deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.productControllers = {
    createProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
    searchProducts,
};
