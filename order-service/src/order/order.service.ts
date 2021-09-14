/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Order, OrderStatus } from './Order.model';
import { Model } from 'mongoose';
import {OrderGateway} from './order.gateway';

@Injectable()
export class OrderService {
    
    private orders: Order[] = [];

    constructor(private orderGateway:OrderGateway, @InjectModel('Order') private readonly orderModel: Model<Order>){}

    async getAllOrders(){
        const result = await this.orderModel.find().exec();
        //console.log(result);
        return result;
    }

    async getOrderStatus(orderId:string){
        let result;
        try{
            result = await this.orderModel.findById(orderId).exec();
        } catch(error){
            throw new NotFoundException('Order not found'); 
        }
        if(!result){
            throw new NotFoundException('Order not found'); 
        }
        console.log(result);
        return OrderStatus[result.status];
    }

    async createOrder(name:string, email:string, customerId:string, customerName:string, address:string, amount:number, status:OrderStatus, remarks:string){
        const newOrder = new this.orderModel({name, customerId, customerName, address, email, amount, status, remarks});
        const result = await newOrder.save();
        console.log(result);
        return result;
    }

    async updateOrder(orderId:string, status:number){
        console.log(orderId,status)
        let order;
        try{
            order = await this.orderModel.findById(orderId).exec();
            order.status = status === 0 ? OrderStatus.CANCELLED : status === 1 ? OrderStatus.CONFIRMED : OrderStatus.DELIVERD;
            await order.save();
            console.log(order);
            const orders = await this.orderModel.find().exec();
            this.orderGateway.pushData(orders);
        } catch(error){
            throw new NotFoundException('Order not found'); 
        }
        return order;
    }

    async cancelOrder(orderId:string){
        let order;
        try{
            order = await this.orderModel.findById(orderId).exec();
            order.status = OrderStatus.CANCELLED;
            order.save();
            console.log(order);
        } catch(error){
            throw new NotFoundException('Order not found'); 
        }
        return order;
    }

    async deleteOrder(orderId:string){
        let order;
        try{
            order = await this.orderModel.deleteOne({_id: orderId}).exec();
            console.log(order);
        } catch(error){
            throw new NotFoundException('Order not found'); 
        }
        return true;
    }
}
