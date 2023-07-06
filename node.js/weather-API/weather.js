const express = require("express");

const https = require("https"); //requiring HTTPS module it helps to make http request using https module

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true })); //middleware for handeling https request {extended true }allows to recieve data rich of arrays and objects
var temp;

app.listen(3000, function () {
  console.log("Hello this is Local port 3000 ready in your service, SIR");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/weather.html");
});

app.post("/", function (req, res) {

  var userCity = req.body.cityName;
  var units = req.body.units;
  
  var appid = "c48b004777c6c7c1af3270dac0ee3446";
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userCity +
    "&appid=" +
    appid +
    "&units=" +
    units;
  https.get(url, function (response) {
    //to innitiate get request to a specified URL and handeling it using callback function
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      temp = weatherData.main.temp;
      console.log(temp);
      var iconText = weatherData.weather[0].icon;
      var icon = "https://openweathermap.org/img/wn/" + iconText + "@2x.png";
      res.write(
        "<p style='text-align:center;'>The weather is currently " +
          weatherData.weather[0].description +
          "<p>"
      );
      if (units == "metric") {
        res.write(
          "<h1 style='text-align:center;'>Temperature in " +
            userCity +
            " is " +
            weatherData.main.temp +
            " degree C<h1> "
        );
      } else {
        res.write(
          "<h1 style='text-align:center;'>Temperature in " +
            userCity +
            " is " +
            weatherData.main.temp +
            " degree F<h1> "
        );
      }
      console.log(userCity);
      res.write("<img src=" + icon + ">");
      //   res.write(icon);

      res.send();
    });
  });
});
