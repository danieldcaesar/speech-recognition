// caters for Firefox & Chrome browsers

const url = "https://api.openweathermap.org/data/2.5/weather?id=3573890&appid=7bf22ac363470173f3b7d0d5ed68ef11&units=metric";

async function getWeather() {
    let response = await fetch(url);
    let data = await response.json();
    let list = document.createElement("ul");
    para.appendChild(list);
    let iconcode = data.weather[0].icon;
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    list.innerHTML += `<li>City: ${data.name}</li>`;
    list.innerHTML += `<li>Temperature: ${data.main.temp}°C</li>`;
    list.innerHTML += `<li>Wind Speed: ${data.wind.speed} m/s</li>`;
    list.innerHTML += `<li>Humidity: ${data.main.humidity} %</li>`;
    list.innerHTML += `<li>Weather: ${data.weather[0].main} <img src=${iconurl} alt='weather icon'></li>`;
  }

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
            getWeather();            
        }
});

recognition.addEventListener('end', recognition.start);
recognition.start();
