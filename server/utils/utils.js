const fetch = require("node-fetch");

const geocode = (address, callback) => {
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1IjoibWF4aW1rbyIsImEiOiJja2R4aGMzaXIxYW0xMzFzZ3A3NTR6cG85In0.ICHqndh6vVm33Yo4uOTp4Q&limit=1`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.features.length === 0) {
        callback("Bad address");
      } else {
        callback(undefined, data.features[0].geometry.coordinates);
      }
    })
    .catch((err) => {
      callback(err);
    });
};

const weatherInfo = (longitude, latitude, callback) => {
  fetch(
    `http://api.weatherstack.com/current?access_key=458eda688881addb0f68b0f3d16a3d45&query=${longitude},${latitude}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        callback(res.error.info);
      } else {
        callback(undefined, data);
      }
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = { geocode, weatherInfo };
