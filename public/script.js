// caters for Firefox & Chrome browsers

async function success(position) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=7bf22ac363470173f3b7d0d5ed68ef11&units=metric`;

    let response = await fetch(url);
    let data = await response.json();
    let list = document.createElement("ul");
    para.appendChild(list);
    let iconcode = data.weather[0].icon;
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    list.innerHTML += `<li>Weather: ${data.weather[0].main} <img src=${iconurl} alt='weather icon'></li>`;
    list.innerHTML += `<li>City: ${data.name}</li>`;
    list.innerHTML += `<li>Temperature: ${data.main.temp}°C</li>`;
    list.innerHTML += `<li>Wind Speed: ${data.wind.speed} m/s</li>`;
    list.innerHTML += `<li>Humidity: ${data.main.humidity} %</li>`;
  }

function error(err) {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        window.alert("Denied the request for Geolocation.");
        break;
      case err.POSITION_UNAVAILABLE:
        window.alert("Location information is unavailable.");
        break;
      case er.TIMEOUT:
        window.alert("The request to get user location timed out.");
        break;
      case err.UNKNOWN_ERROR:
        window.alert("An unknown error occurred.");
        break;
    }
}
let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let para = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(para);

recognition.addEventListener('result', evt => {
    const transcript = Array.from(evt.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    
        para.textContent = transcript;
        if(evt.results[0].isFinal){
            para = document.createElement('p');
            words.appendChild(para);
        }
        if (transcript.includes('weather')) {
            navigator.geolocation.getCurrentPosition(success, error, options);      
        }
});

recognition.addEventListener('end', recognition.start);
recognition.start();
