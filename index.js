"stict";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const daysUppercase = days.map((element) => element.toUpperCase());

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
///////////////////////////// SELECTORS /////////////////////////////////////
const clock = document.querySelector(".clock1");
const displaycityName = document.querySelector(".city1");
const displaycountryName = document.querySelector(".country1");
const fullDate = document.querySelector(".date1");
const button = document.querySelector(".button1");
const button3 = document.querySelector(".button3");
const button4 = document.querySelector(".button4");
const button5 = document.querySelector(".button5");
const button6 = document.querySelector(".button6");

const clockHandler = () => {
  const now = new Date();
  const clockString =
    now.getHours() +
    ":" +
    (now.getMinutes() < 10 ? "0" : "") +
    now.getMinutes() +
    ":" +
    now.getSeconds();
  clock.innerHTML = clockString;
};

setInterval(clockHandler, 1000);
///////////////////////// DATE HANDLER //////////////////////////////
const dateHandler = () => {
  const now = new Date();

  return `${days[now.getDay()]}, ${now.getDay()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
};

fullDate.innerHTML = dateHandler();
///////////////////////// WEEK DAYS HANDLER //////////////////////////////
const weekDaysHandler = () => {
  const newDate = new Date();
  const today = newDate.getDay();
  button3.innerHTML = `${daysUppercase[today + 1].slice(0, 3)}`;
  button4.innerHTML = `${daysUppercase[today + 2].slice(0, 3)}`;
  button5.innerHTML = `${daysUppercase[today + 3].slice(0, 3)}`;
  button6.innerHTML = `${daysUppercase[today + 4].slice(0, 3)}`;
};
weekDaysHandler();

/////////////////  API FETCH FOR WEATHER BASED ON DEVICE LOCATION //////////////
// async function reverseGeo(lat, lon) {
//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=3f25d5bf2ed3676a50e8bc2a4de6a3aa
//         `
//     );
//     const json = await response.json();
//     const cityName = json[0].name;
//     //   console.log(cityName);

//     weatherApi(cityName);
//   } catch (error) {
//     alert(`Geolocating is denied!`);
//   }
// }

///////////////////////////////// API FETCH FOR GETTING WEATHER ////////////////
async function weatherApi(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3f25d5bf2ed3676a50e8bc2a4de6a3aa&units=metric`
    );
    if (!response.ok) {
      throw new Error(console.log(response.statusText));
    }
    const json = await response.json();
    /////////////////////// SETTING TEMPERATURES //////////////////////
    const currentTemperature = Math.round(json.list[0].main.temp);
    const secondTemperature = Math.round(json.list[1].main.temp);
    const thirdTemperature = Math.round(json.list[2].main.temp);
    const forthTemperature = Math.round(json.list[3].main.temp);
    const fifthTemperature = Math.round(json.list[4].main.temp);
    document.querySelector(".temp1").innerHTML = currentTemperature + "°";
    document.querySelector(".temp2").innerHTML = secondTemperature + "°";
    document.querySelector(".temp3").innerHTML = thirdTemperature + "°";
    document.querySelector(".temp4").innerHTML = forthTemperature + "°";
    document.querySelector(".temp5").innerHTML = fifthTemperature + "°";
    /////////////////// GENERATING ICONS ////////////////////
    const currentIcon = json.list[0].weather[0].icon;
    const changeicon = currentIcon.slice(0, -1);
    const fullnameofIcon = changeicon + "d";

    document.querySelector(
      ".icon1"
    ).src = `http://openweathermap.org/img/wn/${fullnameofIcon}@4x.png`;

    const secondIcon = json.list[1].weather[0].icon;
    const changeicon1 = secondIcon.slice(0, -1);
    const fullnameofIcon1 = changeicon1 + "d";

    document.querySelector(
      ".icon2"
    ).src = `http://openweathermap.org/img/wn/${fullnameofIcon1}@2x.png`;

    const thirdIcon = json.list[2].weather[0].icon;
    const changeicon2 = thirdIcon.slice(0, -1);
    const fullnameofIcon2 = changeicon2 + "d";

    document.querySelector(
      ".icon3"
    ).src = `http://openweathermap.org/img/wn/${fullnameofIcon2}@2x.png`;

    const forthIcon = json.list[3].weather[0].icon;
    const changeicon3 = forthIcon.slice(0, -1);
    const fullnameofIcon3 = changeicon3 + "d";

    document.querySelector(
      ".icon4"
    ).src = `http://openweathermap.org/img/wn/${fullnameofIcon3}@2x.png`;

    const fifthIcon = json.list[4].weather[0].icon;
    const changeicon4 = fifthIcon.slice(0, -1);
    const fullnameofIcon4 = changeicon4 + "d";

    document.querySelector(
      ".icon5"
    ).src = `http://openweathermap.org/img/wn/${fullnameofIcon4}@2x.png`;
    /////////////////////CHANGING CITY NAME AND COUNTRY NAME ////////////////

    displaycityName.innerHTML = json.city.name;
    displaycountryName.innerHTML = json.city.country;
  } catch (error) {
    alert(`Unrecognized City, please check typo!`);
  }
}
weatherApi("BanjaLuka");
// const coords = (position) => {
//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;
//   //   console.log([lat, lon]);
//   reverseGeo(lat, lon);
// };

// navigator.geolocation.getCurrentPosition(coords);

///////////////////////// GENERATING WEATHER FROM INPUT FIELD ///////////////

let cityNameFromInput = "";
const inputField = document.querySelector(".inputBar");
const enterSubmit = (event) => {
  if (event.keyCode === 13 && cityNameFromInput.length !== 0) {
    event.currentTarget.value = "";
    weatherApi(cityNameFromInput);

    fullDate.innerHTML = dateHandler();
  }
};

inputField.addEventListener("input", (event) => {
  cityNameFromInput = event.target.value;
});

const buttonSubmit = (event) => {
  inputField.value = "";
  weatherApi(cityNameFromInput);

  fullDate.innerHTML = dateHandler();
};

inputField.addEventListener("keyup", enterSubmit);
button.addEventListener("click", buttonSubmit);

///////////////////////// LOADING CONTENT WHEN WEBPAGE IS LOADED ///////////
window.addEventListener("load", () => {
  document.querySelector(".loading-screen").style.display = "none";
  document.querySelector(".website-content").style.display = "block";
});
