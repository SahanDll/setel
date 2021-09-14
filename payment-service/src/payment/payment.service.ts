/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import {Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentStatus } from './Payment.model';
import {v1 as uuid} from 'uuid';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios'

@Injectable()
export class PaymentService {
    constructor(private httpService: HttpService, @InjectModel('Payment') private readonly paymentModel: Model<Payment>) {}

    private payments: Payment[] = [];

    async getPaymentStatus(orderId:string){
        const result = await this.paymentModel.findOne({orderId: orderId}).exec();
        console.log(result);
        return PaymentStatus[result.status];
    }

    async payOrder(pin:string, orderId:string, remarks:string){
        const status = Math.round(Math.random());
        if(pin !== "" && pin.length === 6){
            const newPayment = new this.paymentModel({orderId, status, remarks});
            const result = await newPayment.save();
            console.log(result);
            this.orderUpdate({orderId: orderId, status: status});
            return result;
        }
        const payment = {
            status,
            remarks
        }
        payment.status = 4;
        payment.remarks = "Invalid Pin Entered";
        return payment;
    }

    @Cron('*/30 * * * * *')
    async checkForPayments() {
        const payments = await this.paymentModel.find({status: 1}).exec();
        payments.map(async (pay) => {
            const status = await this.orderUpdate({orderId: pay.orderId, status: 2}) ;
            if(status){
                pay.status = 2;
                pay.save();
                console.log("Deliverd to > ",pay);
            }
        })
    }

    async orderUpdate(data: {}){
        console.log("Data > ",data)
        return this.httpService.post('http://127.0.0.1:3001/order/update', data)
        .toPromise()
        .then(res => {
            console.log("Response ",res.data);
            return true;
        })
        .catch(err => {
            console.log("Error ",err);
            return false;
        });
    }
}
