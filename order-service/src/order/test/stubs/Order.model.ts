/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Order } from "src/order/Order.model";

export const orderStub = (): Order => {
    return {
        id: "52b683d0-13c9-11ec-83e6-3535ef1c2167",
        name: "Order 2",
        customerId: "123",
        customerName: "Sahan",
        address: "SLA",
        email: "sa@gmail.com",
        amount: 25.9,
        status: 1,
        remarks: ""
    }
}