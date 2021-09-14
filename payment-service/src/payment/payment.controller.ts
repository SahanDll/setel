import { PaymentService } from './payment.service';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('payment')
export class PaymentController {

    constructor(private paymentService:PaymentService){

    }

    @Get('status/:id')
    getPaymentStatus(@Param('id') id: string){
        return this.paymentService.getPaymentStatus(id);
    }

    @Post('pay')
    payOrder(
        @Body('pin') pin:string,
        @Body('orderId') orderId:string,
        @Body('remarks') remarks:string){
        return this.paymentService.payOrder(pin, orderId, remarks);
    }
}
