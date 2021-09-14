/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddOrder from "./AddOrder";
import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";
import orderApi from "../api/orders";
import paymentApi from "../api/payment";
import EnterPin from "./EnterPin";
const ENDPOINT = "http://127.0.0.1:3001/";
const socket = socketIOClient(ENDPOINT, {
  transports: ["websocket"],
});

function App() {
  const LOCAL_STORAGE_KEY = "orderPin";
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const messageListener = (response) => {
      console.log("RES : " + JSON.stringify(response));
      setOrders(response);
    };

    async function connect() {
      socket.on("orders", messageListener);
      console.log("Web socket connected");
    }
    connect();
  }, []);

  const retrievOrders = async () => {
    const response = await orderApi.get("all");
    //console.log(response);
    return response.data;
  };

  const addOrderHandler = async (order) => {
    console.log(order);
    const request = {
      ...order,
    };

    const response = await orderApi.post("create", request);
    setOrders([...orders, response.data]);
  };

  const removeOrderHandler = async (id) => {
    await orderApi.delete(`delete/${id}`);
    const newOrderList = orders.filter((order) => {
      return order._id !== id;
    });
    alert("Order deleted : " + id);
    setOrders(newOrderList);
  };

  const cancelOrderHandler = async (id) => {
    await orderApi.post(`cancel/${id}`);
    alert("Order cancelled : " + id);
    getAllOrders();
  };

  const pinEnterHandler = async (pin) => {
    console.log(pin);
    localStorage.setItem(LOCAL_STORAGE_KEY, pin);
  };

  const payOrderHandler = async (id) => {
    console.log(id);
    const request = {
      pin: localStorage.getItem(LOCAL_STORAGE_KEY),
      orderId: id,
      remarks: "",
    };
    console.log(request);
    const response = await paymentApi.post("pay", request);
    if (response.data.status === 1) {
      alert("Payment Confirmed");
    } else if (response.data.status === 4) {
      alert(response.data.remarks);
    } else {
      alert("Payment Declined");
    }
    console.log(response.data);
    localStorage.setItem(LOCAL_STORAGE_KEY, "");
  };

  const getAllOrders = async () => {
    const allOrders = await retrievOrders();
    console.log("All : ", allOrders);
    if (allOrders) setOrders(allOrders);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <OrderList
                {...props}
                orders={orders}
                getOrderId={removeOrderHandler}
                getOrderCancelId={cancelOrderHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddOrder {...props} addOrderHandler={addOrderHandler} />
            )}
          />
          <Route
            path="/order/:id"
            render={(props) => (
              <OrderDetail {...props} payOrderHandler={payOrderHandler} />
            )}
          />
          <Route
            path="/pin"
            render={(props) => (
              <EnterPin
                {...props}
                payOrderHandler={payOrderHandler}
                pinEnterHandler={pinEnterHandler}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
