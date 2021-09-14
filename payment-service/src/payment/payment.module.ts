/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { HttpModule } from '@nestjs/axios'
import { PaymentSchema } from './Payment.model';

@Module({
  imports: [HttpModule.register({timeout: 5000, maxRedirects: 5,}), MongooseModule.forFeature([{name: 'Payment', schema: PaymentSchema}])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
