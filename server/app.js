const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geocode, weatherInfo } = require("./utils/utils");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./templates/views"));
app.use(express.static(path.join(__dirname, "./public")));
hbs.registerPartials(path.join(__dirname, "./templates/parts"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Main",
    name: "Max",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "Set the address please",
    });
  }
  geocode(address, (error, addressCoordinates) => {
    if (error) {
      return console.log(error);
    }

    weatherInfo(
      addressCoordinates[1],
      addressCoordinates[0],
      (error, weatherInfoData) => {
        if (error) {
          return console.log(error);
        }

        console.log(weatherInfoData);
        res.send({
          title: "Main",
          forecast: weatherInfoData,
          name: "Max",
        });
      }
    );
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "TEST About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "TEST Help",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404Page", {
    title: "Help page not found",
    name: "Max",
    errorMessage: "This help page does not exist",
  });
});

app.get("*", (req, res) => {
  res.render("404Page", {
    title: "Page not found",
    name: "Max",
    errorMessage: "Page not found",
  });
});

app.listen(5000, () => {
  console.log("Started");
});
