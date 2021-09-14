/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { PaymentModule } from './payment/payment.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [PaymentModule, ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.2emba.mongodb.net/OrderDb?retryWrites=true&w=majority')],
})
export class AppModule {}
