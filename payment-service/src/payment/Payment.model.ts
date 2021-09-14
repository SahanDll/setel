/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
    orderId: {type:String, required: true },
    status: {type:Number, required: false },
    remarks: String
});

export interface Payment {
    id: string
    orderId: string
    status: PaymentStatus
    remarks: string
}

export enum PaymentStatus{
    DECLINED = 0,
    CONFIRMED = 1,
    DELIVERED = 2

}