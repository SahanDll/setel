import React from "react";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";

const OrderList = (props) => {
  const deleteOrderHandler = (id) => {
    props.getOrderId(id);
  };

  const cancelOrderHandler = (id) => {
    props.getOrderCancelId(id);
  };

  const renderOrderList = props.orders.map((order) => {
    return (
      <OrderCard
        order={order}
        clickDeleteHandler={deleteOrderHandler}
        clickCancelHandler={cancelOrderHandler}
        key={order._id}
      ></OrderCard>
    );
  });

  return (
    <div className="main" style={{ marginTop: 50 }}>
      <h2>Order List</h2>
      <Link to="/add">
        <button className="ui button blue right">Create Order</button>
      </Link>
      <div className="ui celled list">{renderOrderList}</div>{" "}
    </div>
  );
};

export default OrderList;
