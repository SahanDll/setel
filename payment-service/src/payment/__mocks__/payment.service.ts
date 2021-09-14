/* eslint-disable prettier/prettier */
import { PaymentStatus } from "../Payment.model";
import { paymentStub } from "../test/stubs/Payment.model";

/* eslint-disable prettier/prettier */
export const PaymentService = jest.fn().mockReturnValue({
    getPaymentStatus: jest.fn().mockReturnValue(PaymentStatus[1]),
    payOrder: jest.fn().mockReturnValue(paymentStub())
})