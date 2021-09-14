/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Test } from "@nestjs/testing"
import { OrderController } from "../order.controller"
import { Order, OrderStatus } from "../Order.model";
import { OrderService } from "../order.service"
import { orderStub } from "./stubs/Order.model";

/* eslint-disable @typescript-eslint/no-empty-function */

jest.mock('../order.service');
describe('OrderController', () => {

    let orderController: OrderController;
    let orderService: OrderService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers:[OrderController],
            providers: [OrderService]
        }).compile();

        orderController = moduleRef.get<OrderController>(OrderController);
        orderService = moduleRef.get<OrderService>(OrderService);
        jest.clearAllMocks();
    })
    
    describe('getOrderStatus' ,() => {
        describe('when getOrderStatus is called' , () => {
            let status: string;
            beforeEach(async () => {
                status = await orderController.getOrderStatus(orderStub().id)
            })

            test('then it should call orderService', () => {
                expect(orderService.getOrderStatus).toBeCalledWith(orderStub().id)
            })

            test('then it should call orderService times', () => {
                expect(orderService.getOrderStatus).toBeCalledTimes(1);
            })

            test('then it should return a status', () => {
                expect(status).toEqual(OrderStatus[orderStub().status])
            })
        })
    })

    describe('getAllOrders' ,() => {
        describe('when getAllOrders is called' , () => {
            let order;
            beforeEach(async () => {
                order = await orderController.getAllOrders()
            })

            test('then it should call orderService', () => {
                expect(orderService.getAllOrders).toBeCalledWith()
            })

            test('then it should call orderService times', () => {
                expect(orderService.getAllOrders).toBeCalledTimes(1);
            })

            test('then it should return a order', () => {
                expect(order).toEqual(orderStub())
            })
        })
    })

    describe('createOrder' ,() => {
        describe('when createOrder is called' , () => {
            let order;
            beforeEach(async () => {
                order = await orderController.createOrder(orderStub().name,
                orderStub().email,orderStub().customerId,orderStub().customerName,orderStub().address,
                orderStub().amount,orderStub().status,orderStub().remarks)
            })

            test('then it should call orderService', () => {
                expect(orderService.createOrder).toBeCalledWith(orderStub().name,
                orderStub().address, orderStub().email,orderStub().customerId,orderStub().customerName,
                orderStub().amount,orderStub().status,orderStub().remarks)
            })

            test('then it should call orderService times', () => {
                expect(orderService.createOrder).toBeCalledTimes(1);
            })

            test('then it should return a order', () => {
                expect(order).toEqual(orderStub())
            })
        })
    })


    describe('cancelOrder' ,() => {
        describe('when cancelOrder is called' , () => {
            let order;
            beforeEach(async () => {
                order = await orderController.cancelOrder(orderStub().id)
            })

            test('then it should call orderService', () => {
                expect(orderService.cancelOrder).toBeCalledWith(orderStub().id)
            })

            test('then it should call orderService times', () => {
                expect(orderService.cancelOrder).toBeCalledTimes(1);
            })

            test('then it should return a order', () => {
                expect(order).toEqual(orderStub())
            })
        })
    })


    describe('updateOrder' ,() => {
        describe('when updateOrder is called' , () => {
            let order;
            beforeEach(async () => {
                order = await orderController.updateOrder(orderStub().id, orderStub().status)
            })

            test('then it should call orderService', () => {
                expect(orderService.updateOrder).toBeCalledWith(orderStub().id, orderStub().status)
            })

            test('then it should call orderService times', () => {
                expect(orderService.updateOrder).toBeCalledTimes(1);
            })

            test('then it should return a order', () => {
                expect(order).toEqual(orderStub())
            })
        })
    })


    describe('deleteOrder' ,() => {
        describe('when deleteOrder is called' , () => {
            let status:boolean;
            beforeEach(async () => {
                status = await orderController.deleteOrder(orderStub().id)
            })

            test('then it should call orderService', () => {
                expect(orderService.deleteOrder).toBeCalledWith(orderStub().id)
            })

            test('then it should call orderService times', () => {
                expect(orderService.deleteOrder).toBeCalledTimes(1);
            })

            test('then it should return a order', () => {
                expect(status).toEqual(true)
            })
        })
    })

})