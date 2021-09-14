/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    name: {type:String, required: true },
    customerId: {type:String, required: false },
    customerName: String,
    address: String,
    email: String,
    amount: Number,
    status: Number,
    remarks: String
});

export interface Order {
    id: string
    name: string
    customerId: string
    customerName: string
    email: string
    address: string
    amount: number
    status: OrderStatus
    remarks: string
}

export enum OrderStatus{
    CREATED = 1,
    CONFIRMED = 2,
    DELIVERD = 3,
    CANCELLED = 4
}