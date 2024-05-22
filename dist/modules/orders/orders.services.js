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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const orders_zod_validation_1 = __importDefault(require("./orders.zod.validation"));
const orders_model_1 = require("./orders.model");
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("../products/product.model");
const utils_1 = require("../../utils");
const createNewOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the order payload
    const validatedData = orders_zod_validation_1.default.parse(payload);
    // get product id and validate it, is it valid
    const id = validatedData.productId;
    utils_1.utils.validateObjectId(id);
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    // Finding the product by ID in DB
    const product = yield product_model_1.Product.findOne({ _id: objectId }, { inventory: 1 });
    if (!product)
        throw new Error("Order not found (404)");
    const productQuantity = product.inventory.quantity;
    const orderQuantity = validatedData.quantity;
    // if user orders more than available products
    if (orderQuantity > productQuantity)
        throw new Error("Oops! Insufficient quantity available in inventory");
    // Reducing product quanity by order quantity
    const updatedProduct = yield product_model_1.Product.findOneAndUpdate({ _id: objectId }, {
        $inc: { 'inventory.quantity': -validatedData.quantity }
    }, { new: true });
    // if quntity was not updated return false
    if (!updatedProduct)
        throw new Error("Error updating product inventory");
    // if there is no product then set inStock === false and save
    if (updatedProduct.inventory.quantity <= 0) {
        updatedProduct.inventory.inStock = false;
        updatedProduct.save();
    }
    // finally create an order in Order collection 
    const result = yield orders_model_1.Order.create(validatedData);
    return { success: true, data: result };
});
const getAllOrders = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orders_model_1.Order.find(filter);
});
exports.orderServices = {
    createNewOrder,
    getAllOrders,
};
