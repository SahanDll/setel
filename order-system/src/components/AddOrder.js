import React from "react";
import { Link } from "react-router-dom";

class AddOrder extends React.Component {
  state = {
    name: "",
    customerName: "",
    address: "",
    email: "",
    amount: 0,
    orderStatus: 1,
    remarks: "",
  };

  add = (e) => {
    e.preventDefault();
    if (
      this.state.name === "" ||
      this.state.customerName === "" ||
      this.state.address === "" ||
      this.state.email === "" ||
      this.state.amount === 0
    ) {
      alert("All the fields are mandatory");
      return;
    }
    this.props.addOrderHandler(this.state);
    this.setState({
      name: "",
      customerName: "",
      address: "",
      email: "",
      amount: 0,
      orderStatus: 1,
      remarks: "",
    });
    console.log(this.props);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="ui main" style={{ marginTop: 50 }}>
        <h2>Add Order</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Order Name</label>
            <input
              type="text"
              name="Oname"
              placeholder="Order Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />

            <label>Your Name</label>
            <input
              type="text"
              name="Cname"
              placeholder="Your Name"
              value={this.state.customerName}
              onChange={(e) => this.setState({ customerName: e.target.value })}
            />

            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={this.state.address}
              onChange={(e) => this.setState({ address: e.target.value })}
            />

            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />

            <label>Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={this.state.amount}
              onChange={(e) => this.setState({ amount: e.target.value })}
            />

            <label>Remarks</label>
            <input
              type="text"
              name="remarks"
              placeholder="Remarks"
              value={this.state.remarks}
              onChange={(e) => this.setState({ remarks: e.target.value })}
            />
          </div>

          <button className="ui button blue"> Add</button>
        </form>
        <div className="ceneter-div" style={{ marginTop: 10 }}>
          <Link to="/">
            <button className="ui button blue center">Back</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default AddOrder;
