import express from "express";
import { orderControllers } from "./orders.controller";
const router = express.Router()


router.post('/',orderControllers.createNewOrder)
router.get('/',orderControllers.getAllOrders)


export const orderRouter = router


