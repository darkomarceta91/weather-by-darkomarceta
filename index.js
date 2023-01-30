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
    (now.getSeconds() < 10 ? "0" : "") +
    now.getSeconds();
  clock.innerHTML = clockString;
};

setInterval(clockHandler, 1000);
///////////////////////// DATE HANDLER //////////////////////////////
const dateHandler = () => {
  const now = new Date();

  return `${days[now.getDay()]}, ${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
};

fullDate.innerHTML = dateHandler();
///////////////////////// WEEK DAYS HANDLER //////////////////////////////
const weekDaysHandler = () => {
  const newDate = new Date();
  const today = newDate.getDay();
  const showOnlyThreeDigits = (day) => {
    const daysUppercase = days.map((element) => element.toUpperCase());
    return `${daysUppercase[today + day].slice(0, 3)}`;
  };
  button3.innerHTML = showOnlyThreeDigits(1);
  button4.innerHTML = showOnlyThreeDigits(2);
  button5.innerHTML = showOnlyThreeDigits(3);
  button6.innerHTML = showOnlyThreeDigits(4);
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
    const settingTemperature = (day) => {
      const currentTemperature = Math.round(json.list[day].main.temp);
      document.querySelector(`.temp${day + 1}`).innerHTML =
        currentTemperature + "°";
    };
    settingTemperature(0);
    settingTemperature(1);
    settingTemperature(2);
    settingTemperature(3);
    settingTemperature(4);

    /////////////////// GENERATING ICONS ////////////////////

    const iconName = (day) => {
      const currentIcon = json.list[day].weather[0].icon;
      const changeicon = currentIcon.slice(0, -1);
      const fullnameofIcon = changeicon + "d";
      return `http://openweathermap.org/img/wn/${fullnameofIcon}@4x.png`;
    };

    document.querySelector(".icon1").src = iconName(0);
    document.querySelector(".icon2").src = iconName(1);
    document.querySelector(".icon3").src = iconName(2);
    document.querySelector(".icon4").src = iconName(3);
    document.querySelector(".icon5").src = iconName(4);
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

    // fullDate.innerHTML = dateHandler();
  }
};

inputField.addEventListener("input", (event) => {
  cityNameFromInput = event.target.value;
});

const buttonSubmit = (event) => {
  inputField.value = "";
  weatherApi(cityNameFromInput);

  // fullDate.innerHTML = dateHandler();
};

inputField.addEventListener("keyup", enterSubmit);
button.addEventListener("click", buttonSubmit);

///////////////////////// LOADING CONTENT WHEN WEBPAGE IS LOADED ///////////
window.addEventListener("load", () => {
  document.querySelector(".loading-screen").style.display = "none";
  document.querySelector(".website-content").style.display = "block";
});
