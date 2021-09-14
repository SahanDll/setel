/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Payment } from "src/payment/Payment.model";

export const paymentStub = (): Payment => {
    return {
        id: "e0e54d30-132e-11ec-b9b3-59f9c1099f71",
        orderId: "52b683d0-13c9-11ec-83e6-3535ef1c2167",
        status: 1,
        remarks: ""
       }
}