/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';

@Module({
  imports: [OrderModule, MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.2emba.mongodb.net/OrderDb?retryWrites=true&w=majority')],
})
export class AppModule {}
