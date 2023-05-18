'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch('/fortune')
    .then( (response) => {
      return response.text()
    })
    .then( (responseText) => {
      const status_text = document.querySelector('#fortune-text');
      status_text.innerHTM = responseText; 
    })
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  // 90000 { 'zipcode':'9000' }

  // TODO: request weather with that URL and show the forecast in #weather-info
  fetch(`${url}?zipcode=${zipcode}`) // query string: basically a dict. where ':' --> '=', ',' --> '&'
  // { 'key1': 'val1', 'key2': 'val2' } --> '?key1=val1&key2=val2' 
  .then( (response) => response.json() )
  .then( (responseText) => {
    console.log(responseText)
    const forecast_text = document.querySelector('#weather-info');
    forecast_text.innerHTML = responseText['forecast']; 
  })
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();
  // const url = '/order-melons.json';
  // const code = document.querySelector('#zipcode-field').value;
  // const result = document.querySelector('#zipcode-field').value;


  // TODO: show the result message after your form
  const formInputs = {
    qty: document.querySelector('#qty-field').value,
    melon_type: document.querySelector('#melon-type-field').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then( (response) => response.json())
  .then( (responseText) => {
    const code = responseText['code']
    const message = responseText['msg']
    const message_text = document.querySelector('#order-status');
    if (code === 'ERROR'){
      message_text.innerHTML = (` ${message}`);
      message_text.classList.add("order-error")
    }
    else {
      message_text.innerHTML = (`${message}`); 
    }
    
    // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
})
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
