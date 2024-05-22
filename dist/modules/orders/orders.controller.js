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
exports.orderControllers = void 0;
const orders_services_1 = require("./orders.services");
const utils_1 = require("../../utils");
const createNewOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orders_services_1.orderServices.createNewOrder(req.body);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // search query 
        const { email } = req.query;
        // if email passed find specific order
        // else all orders 
        const filter = {};
        if (email) {
            filter.email = email;
        }
        const result = yield orders_services_1.orderServices.getAllOrders(filter);
        return yield utils_1.utils.sendResponse(res, true, "Orders fetched successfully for user email!", result);
    }
    catch (error) {
        next(error);
    }
});
exports.orderControllers = {
    createNewOrder,
    getAllOrders
};
