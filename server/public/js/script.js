console.log(" I am loaded");

const addressform = document.querySelector("form");
const locationNameBlock = document.querySelector("#location-name");
const locationForecastBlock = document.querySelector("#location-forecast");
const errorBlock = document.querySelector("#error-block");

addressform.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputAddress = document.querySelector("input").value;

  fetch("http://localhost:5000/weather?address=" + inputAddress)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        errorBlock.textContent = data.error;
      } else {
        locationNameBlock.textContent = data.forecast.location.region;
        locationForecastBlock.textContent = JSON.stringify(
          data.forecast.current
        );
      }
    })
    .catch((e) => {
      errorBlock.textContent = e;
    });
});
