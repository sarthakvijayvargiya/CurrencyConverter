// amount lena h
// country code display
// according to that flag
//

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const inputData = document.querySelector("#input");
const dropdown = document.querySelectorAll(".dropdown");
const mess = document.querySelector("#mess p");
const buttn = document.querySelector("#submitButton");
const toSlct = document.querySelector("#toSelect");
const fromSlct = document.querySelector("#fromSelect");
for (select of dropdown) {
  for (const countryCode in countryList) {
    let createOption = document.createElement("option");
    createOption.innerHTML = countryCode;
    createOption.value = countryCode;
    if (select.name === "from" && countryCode === "USD") {
      createOption.selected = "selected";
    } else if (select.name === "to" && countryCode === "INR") {
      createOption.selected = "selected";
    }
    select.append(createOption);
  }
  select.addEventListener("change", function (e) {
    updateFlag(e.target);
  });
}

function updateFlag(element) {
  let value = element.value;
  let currCode = countryList[value];
  console.log(currCode);
  let newFlag = `https://flagsapi.com/${currCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newFlag;
}

async function getExchangeRate() {
  let input = inputData.value;
  if (input <= 0 || input === null) {
    input = 1;
  }
  let fromSlctV = fromSlct.value.toLowerCase();
  let toSlctV = toSlct.value.toLowerCase();

  console.log(fromSlctV);
  console.log(toSlctV);
  const updatedEcx = `${BASE_URL}/${fromSlctV}/${toSlctV}.json`;

  console.log(input);
  const response = await fetch(updatedEcx);
  const data = await response.json();
  console.log(data);
  mess.innerHTML = `${input} ${fromSlct.value} = ${
    input * data[toSlctV].toFixed(2)
  } ${toSlct.value}`;
}

buttn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

window.addEventListener("load", () => {
  getExchangeRate();
});
