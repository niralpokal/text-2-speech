
let getObj= (id) => document.getElementById(id);
const speed = <HTMLInputElement>getObj('speedSlide');
const pitch = <HTMLInputElement>getObj('pitchSlide'); 
const voiceOptions = <HTMLSelectElement>getObj('voiceOptions');
const speechText = <HTMLInputElement>getObj('speakText');
const speechButton = <HTMLInputElement>getObj('speakButton');
const synth = window.speechSynthesis;

let populateList = () =>  {
    let appendList = () =>{
        let voices = synth.getVoices();
        for (let voice of voices) {
            let option = document.createElement('option');
            option.textContent = `${voice.name} ${voice.lang} ${voice.default ? '-Default': ''}`;
            option.setAttribute('data-name', voice.name);
            voiceOptions.appendChild(option);
        }
    }
    if (synth.onvoiceschanged) {
        const getVoices = new Promise(done=> synth.onvoiceschanged = done);
        getVoices.then(() => appendList());
    } else {
        appendList();
    }
}

populateList();

let handleSpeak = () :void => {
    let voices = synth.getVoices();
    const selectedOption = voiceOptions.selectedOptions[0].getAttribute('data-name');
    let utter = new SpeechSynthesisUtterance(speechText.value);
    utter.rate = parseFloat(speed.value);
    utter.pitch = parseFloat(pitch.value);
    for (let voice of voices) {
        if (voice.name === selectedOption) {
            utter.voice = voice;
            break;
        }
    }
    synth.speak(utter);
}

document.addEventListener('click', (event) => {
    if (event.target == speechButton) {
        event.preventDefault();
        handleSpeak();
    }
})

