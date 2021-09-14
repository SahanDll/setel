/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { OrderSchema } from './Order.model';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderGateway } from './order.gateway';

@Module({
  imports:[MongooseModule.forFeature([{name: 'Order', schema: OrderSchema}])],
  controllers: [OrderController],
  providers: [OrderService, OrderGateway],
})
export class OrderModule {}
