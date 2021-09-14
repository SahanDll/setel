const expres = require("express");
const router = expres.Router();
const axios = require("axios");
const registry = require("./registry.json");

router.all("/:serviceName/:endPoint", (req, res) => {
  console.log(req.params.serviceName);
  console.log(req.params.endPoint);
  if (registry.services[req.params.serviceName]) {
    axios({
      method: req.method,
      url: registry.services[req.params.serviceName].url + req.params.endPoint,
      Headers: req.headers,
      data: req.body,
    }).then((response) => {
      res.send(response.data);
    });
  } else {
    res.send("API not exist");
  }
});

router.all("/:serviceName/:endPoint/:path", (req, res) => {
  console.log(req.params.serviceName);
  console.log(req.params.endPoint);
  console.log(req.params.path);
  if (registry.services[req.params.serviceName]) {
    axios({
      method: req.method,
      url:
        registry.services[req.params.serviceName].url +
        req.params.endPoint +
        "/" +
        req.params.path,
      Headers: req.headers,
      data: req.body,
    }).then((response) => {
      res.send(response.data);
    });
  } else {
    res.send("API not exist");
  }
});

module.exports = router;
