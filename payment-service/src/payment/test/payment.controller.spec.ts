/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Test } from "@nestjs/testing"
import { PaymentController } from "../payment.controller";
import { PaymentStatus } from "../Payment.model";
import { PaymentService } from "../payment.service";
import { paymentStub } from "./stubs/Payment.model";

jest.mock('../payment.service');
describe('PaymentController', () => {
    
    let paymentController: PaymentController;
    let paymentService: PaymentService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers:[PaymentController],
            providers: [PaymentService]
        }).compile();

        paymentController = moduleRef.get<PaymentController>(PaymentController);
        paymentService = moduleRef.get<PaymentService>(PaymentService);
        jest.clearAllMocks();
    })

    describe('getPaymentStatus' ,() => {
        describe('when getPaymentStatus is called' , () => {
            let status: string;
            beforeEach(async () => {
                status = await paymentController.getPaymentStatus(paymentStub().id)
            })

            test('then it should call paymentService', () => {
                expect(paymentService.getPaymentStatus).toBeCalledWith(paymentStub().id)
            })

            test('then it should call paymentService times', () => {
                expect(paymentService.getPaymentStatus).toBeCalledTimes(1);
            })

            test('then it should return a status', () => {
                expect(status).toEqual(PaymentStatus[paymentStub().status])
            })
        })
    })

    describe('getPaymentStatus' ,() => {
        describe('when payOrder is called' , () => {
            let payment;
            beforeEach(async () => {
                payment = await paymentController.payOrder('123456', paymentStub().orderId, paymentStub().remarks)
            })

            test('then it should call paymentService', () => {
                expect(paymentService.payOrder).toBeCalledWith('123456', paymentStub().orderId, paymentStub().remarks)
            })

            test('then it should call paymentService times', () => {
                expect(paymentService.payOrder).toBeCalledTimes(1);
            })

            test('then it should return a status', () => {
                expect(payment).toEqual(paymentStub())
            })
        })
    })

})