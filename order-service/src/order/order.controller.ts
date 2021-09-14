/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import {OrderStatus } from './Order.model';

@Controller('order')
export class OrderController {

    constructor(private orderService:OrderService){

    }

    @Get('all')
    getAllOrders(){
        return this.orderService.getAllOrders();
    }

    @Get('status/:id')
    getOrderStatus(@Param('id') id: string){
        return this.orderService.getOrderStatus(id);
    }

    @Post('create')
    createOrder(
        @Body('name') name:string,
        @Body('customerId') customerId:string,
        @Body('customerName') customerName:string,
        @Body('address') address:string,
        @Body('email') email:string,
        @Body('amount') amount:number,
        @Body('orderStatus') orderStatus:OrderStatus,
        @Body('remarks') remarks:string,){
        return this.orderService.createOrder(name, email, customerId, customerName, address, amount, orderStatus, remarks);
    }

    @Post('update')
    updateOrder(
        @Body('orderId') orderId:string,
        @Body('status') status:number){
        console.log("Update > ", orderId);
        return this.orderService.updateOrder(orderId, status);
    }

    @Post('cancel/:orderId')
    cancelOrder(
        @Param('orderId') orderId:string){
        console.log("Cancelled > ", orderId);
        return this.orderService.cancelOrder(orderId);
    }

    @Delete('delete/:orderId')
    deleteOrder(
        @Param('orderId') orderId:string){
        console.log("Deleted > ", orderId);
        return this.orderService.deleteOrder(orderId);
    }
}
