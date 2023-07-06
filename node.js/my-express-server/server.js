const express = require("express");
const { get } = require("express/lib/response");
const app = express();

app.get("/", function (request, response) {
  response.send();
});

app.get("/contact", function (req, res) {
  res.send("contact me at My home");
});
app.get("/about", function (req, res) {
  res.send(
    "<h1 style='text-align:center'>About<h1><p style='text-align:center'>I am abhinav nice to meet you at my server's about page<p>"
  );
});
app.listen(3000, function () {
  console.log("the server has started at 3000 port");
});
