import React from "react";

const Header = () => {
  return (
    <div
      className="ui fixed menu"
      style={{ alignItems: "center", backgroundColor: "yellow" }}
    >
      <div
        className="ui container center"
        style={{
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Order Management System</h2>
      </div>
    </div>
  );
};

export default Header;
