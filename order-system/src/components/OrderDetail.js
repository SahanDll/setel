import React from "react";
import { Link } from "react-router-dom";
import order from "../images/order.png";

const OrderDetail = (props) => {
  console.log(props);
  const { _id, name, status, customerName, address, email, amount, remarks } =
    props.location.state.order;

  return (
    <div className="ui main" style={{ marginTop: 50 }}>
      <div className="ui card centered">
        <div className="image">
          <img src={order} alt="order" />
          <div className="content">
            <div className="header" style={{ color: "blue", marginTop: 10 }}>
              {status === 1
                ? "Pending Payment"
                : status === 2
                ? "Order Confirmed"
                : status === 3
                ? "Order Delivered"
                : "Order Cancelled"}
            </div>
            <div className="header" style={{ fontWeight: "bold" }}>
              {"Order Id : " + _id}
            </div>
            <div className="description" style={{ color: "red" }}>
              {"Order Name : " + name}
            </div>
            <div className="description" style={{ color: "green" }}>
              {"Amount : RM " + amount}
            </div>

            <div className="description" style={{ marginTop: 10 }}>
              {customerName}
            </div>
            <div className="description">{address}</div>
            <div className="description">{email}</div>
            <div className="description">{remarks}</div>
          </div>
        </div>
      </div>
      {status === 1 && (
        <div>
          <Link
            to={{
              pathname: `/pin`,
              state: { order: props.location.state.order },
            }}
          >
            <button
              className="ui button red center"
              //onClick={() => props.payOrderHandler(id)}
            >
              Pay
            </button>
          </Link>
        </div>
      )}

      <div className="ceneter-div" style={{ marginTop: 10 }}>
        <Link to="/">
          <button className="ui button blue center">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderDetail;
