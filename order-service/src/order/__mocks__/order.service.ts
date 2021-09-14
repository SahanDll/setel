/* eslint-disable prettier/prettier */
import { OrderStatus } from "../Order.model";
import { orderStub } from "../test/stubs/Order.model";

/* eslint-disable prettier/prettier */
export const OrderService = jest.fn().mockReturnValue({
    createOrder: jest.fn().mockReturnValue(orderStub()),
    getAllOrders: jest.fn().mockReturnValue(orderStub()),
    updateOrder: jest.fn().mockReturnValue(orderStub()),
    cancelOrder: jest.fn().mockReturnValue(orderStub()),
    deleteOrder: jest.fn().mockReturnValue(true),
    getOrderStatus: jest.fn().mockReturnValue(OrderStatus[1])
})