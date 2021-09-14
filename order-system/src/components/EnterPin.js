import React from "react";
import PinInput from "react-pin-input";
import { Link } from "react-router-dom";

const EnterPin = (props) => {
  console.log(props);
  const { _id, name, status, customerName, address, email, amount, remarks } =
    props.location.state.order;
  return (
    <div className="main" style={{ marginTop: 50 }}>
      <h2>Enter Pin</h2>
      <div className="container" style={{ marginTop: 50 }}>
        <PinInput
          length={6}
          focus
          secret={false}
          type="numeric"
          onChange={(pin) => props.pinEnterHandler(pin)}
        />
      </div>
      <div>
        <Link to="/">
          <button
            style={{ marginTop: 100 }}
            className="ui button red center"
            onClick={() => props.payOrderHandler(_id)}
          >
            Done
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EnterPin;
