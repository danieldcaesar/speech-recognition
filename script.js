// caters for Firefox & Chrome browsers
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
    
        p.textContent = transcript;
    console.log(transcript);
});

recognition.start();
recognition.addEventListener('end', recognition.start);