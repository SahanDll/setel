import React from "react";
import { Link } from "react-router-dom";
import orderS from "../images/orderS.png";
import orderD from "../images/orderD.png";
import orderF from "../images/orderF.png";
import orderP from "../images/orderP.png";

const OrderCard = (props) => {
  const { _id, name, status, amount, customerName, email } = props.order;
  return (
    <div className="item">
      <Link to={{ pathname: `/order/${_id}`, state: { order: props.order } }}>
        <img
          className="ui avatar image"
          src={
            status === 1
              ? orderP
              : status === 2
              ? orderS
              : status === 3
              ? orderD
              : orderF
          }
          alt="user"
        />
        <div className="content">
          <div className="header">{_id}</div>
          <div className="header" style={{ color: "red" }}>
            {name}
          </div>
          <div className="description" style={{ color: "blue" }}>
            {"RM " + amount}
          </div>
          <div>{email}</div>
          <div style={{ color: "blue" }}>
            {status === 1
              ? "Pending Payment"
              : status === 2
              ? "Order Confirmed"
              : status === 3
              ? "Order Delivered"
              : "Order Cancelled"}
          </div>
        </div>
      </Link>
      <i
        className="trash alternate Rounded icon"
        style={{ color: "red", margin: 10 }}
        onClick={() => props.clickDeleteHandler(_id)}
      ></i>
      {status === 1 && (
        <i
          className="delete alternate Rounded icon"
          style={{ color: "orange", margin: 10 }}
          onClick={() => props.clickCancelHandler(_id)}
        ></i>
      )}
    </div>
  );
};

export default OrderCard;
