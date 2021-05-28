// grab the elements we need
const inputAmount = document.querySelector(".amount");
const inputOriginalCurrency = document.querySelector("#select-one");
const inputNewCurrency = document.querySelector("#select-two");
const outputAmount = document.querySelector("#output-text");
const button = document.querySelector(".ex");
const submitButton = document.getElementById("submit");
const signOut = document.querySelector('#sign-out-btn');
var x = document.querySelector('.container');
var y = document.getElementById('convert-container');
let amount = 0;
let html = '';

function updateCurrencyName(e) {
  // grab data attribute
  const currencyNameOne = inputOriginalCurrency.selectedOptions[0].dataset.name;
  const currencyNameTwo = inputNewCurrency.selectedOptions[0].dataset.name;
  // grab the elements
  fromCurrencyText = document.querySelector("#fromCurrencyText")
  toCurrencyText = document.querySelector("#toCurrencyText");
  // update html with currency details
  fromCurrencyText.innerHTML = currencyNameOne;
  toCurrencyText.innerHTML = currencyNameTwo;
  updateFormat(e);
}

function updateFormat(e) {
  // conditional take from user input or stored number value
  const value = e.type === "blur"? Number(inputAmount.value): amount;
  // update stored number value
  amount = (Number(value)).toFixed(2);
  // console.log(amount, typeof(amount)); *** changing amount to string
  // grab selected original currency
  const originalCurrency = inputOriginalCurrency.value;
  // update html with formatted currency str
  inputAmount.value = formatToCurrency(value, originalCurrency);
}

function formatToCurrency(number, currencyCode){
  //  set options
  const formatOptions = {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    currencyDisplay: "symbol",
  };
  // create intlNum constructor
  const currencyFormatText = new Intl.NumberFormat("en-US", formatOptions).format(number);
  // return str
  return currencyFormatText;
}

function checkNumberKey(e){
  // stop default adding typed value to input
  e.preventDefault();
  // set allowed values
  const allowedKeys = "0123456789";
  const keyArray = allowedKeys.split("");
  const allowOnce = ".";
  // adds to input if matches allowed characters
  if(keyArray.includes(e.key)){
    inputAmount.value += e.key;
  }else if(!inputAmount.value.includes(".") && e.key === allowOnce){ // allows . if not present
    inputAmount.value += e.key;
  }
}

async function getExchangeRate() {
  // grab selections
  const fromCurrency = inputOriginalCurrency.value;
  const toCurrency = inputNewCurrency.value;
  // personal key
  const apiKey = "input your api key here";
  // add the key and query to final url
  const url =
  "http://api.exchangeratesapi.io/v1/latest?access_key=" + apiKey;
  // send it
  const response = await fetch(url);
  const data = await response.json();
  const rates = data.rates;
  const FXRate = rates[inputNewCurrency.value]/rates[inputOriginalCurrency.value];
  // actually calculate the new amount
  const toAmount = amount * FXRate;
  // format currency
  const fromText = formatToCurrency(amount, fromCurrency);
  const toText = formatToCurrency(toAmount, toCurrency);
  // update html with xchange details
  const msg = `${fromText} = ${toText}`;
  outputAmount.innerHTML = msg;
}

function dispData(){
// grab the values of our username and password
  let formData = {
    userName: document.getElementById('username').value,
    passWord: document.getElementById('psw').value
}

//puts it in a local storage
localStorage.setItem('formData', JSON.stringify(formData));
  console.log(JSON.parse(localStorage.getItem('formData')));
  let {userName, passWord} = JSON.parse(localStorage.getItem('formData'));
  
  //create a condition the username and password must fulfil
    if(userName === ''){
      alert('Username cannot be left blank');
    } else if(userName.length <= 7){
      alert('Username must contain at least 8 characters');
    } else if(userName.length <= 7){
      console.log(true)
    }

    if(passWord === ''){
      alert('Password cannot be left blank');
    } else if(passWord.length <= 7){
      alert('Password must contain at least 8 characters');
    } else if(passWord.length <= 7){
      console.log(true)
    } 
  
    if(userName.length >= 7 && passWord.length >= 7){
      var outPut = document.getElementById('que');
      outPut.innerHTML = "Hi! " + userName;
      hideData();
    } else{
      return false
    }
  }
 

// hides the sign up page and introduce the currency converter
function hideData(){
  if (y.style.display == 'none') {
    y.style.display = 'block';
    x.style.display = 'none';
    signOut.style.display = 'block';
} y.style.display = 'block';
x.style.display = 'none'; 
signOut.style.display = 'block';
}

//to sign out of the app
signOut.addEventListener('click', () => {
  window.location.reload();
})

// update the username
submitButton.addEventListener('click', dispData); 

// update currency texts on selection
inputOriginalCurrency.addEventListener("change", updateCurrencyName);
inputNewCurrency.addEventListener("change", updateCurrencyName);

// amount input listeners
inputAmount.addEventListener("keydown", checkNumberKey);
inputAmount.addEventListener("blur", updateFormat);
inputAmount.addEventListener("focus", () => inputAmount.value ="");

// main event
button.addEventListener("click", getExchangeRate);