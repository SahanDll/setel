/* eslint-disable no-unused-vars */
const socket = io("http://127.0.0.1/3001");

const response = document.getElementById("response");
const dataSet = document.getElementById("data");

const handleSubmit = () => {
  socket.emit("request", { data: "" });
};

socket.on("response", ({ data }) => {
  handleNewData(data);
});

const handleNewData = (data) => {
  dataSet.appendChild();
};

const buildNewRequest = (data) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(data));
  return li;
};
