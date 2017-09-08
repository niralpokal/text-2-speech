$(document).ready(function () { return $('select').material_select(); });
var getObj = function (id) { return document.getElementById(id); };
var speed = getObj('speedSlide');
var pitch = getObj('pitchSlide');
var voiceOptions = getObj('voiceOptions');
var speechText = getObj('speakText');
var speechButton = getObj('speakButton');
var synth = window.speechSynthesis;
var isChrome = (window.chrome && window.chrome.webstore);
var populateList = function () {
    var appendList = function () {
        var voices = synth.getVoices();
        for (var _i = 0, voices_1 = voices; _i < voices_1.length; _i++) {
            var voice = voices_1[_i];
            var option = document.createElement('option');
            option.textContent = voice.name + " " + voice.lang + " " + (voice["default"] ? '-Default' : '');
            option.setAttribute('data-name', voice.name);
            voiceOptions.appendChild(option);
        }
    };
    if (isChrome) {
        var getVoices = new Promise(function (done) { return synth.onvoiceschanged = done; });
        getVoices.then(function () { return appendList(); });
    }
    else {
        appendList();
    }
};
populateList();
var handleSpeak = function () {
    synth.cancel();
    var voices = synth.getVoices();
    var selectedOption = voiceOptions.selectedOptions[0].getAttribute('data-name');
    var utter = new SpeechSynthesisUtterance(speechText.value);
    utter.rate = parseFloat(speed.value);
    utter.pitch = parseFloat(pitch.value);
    for (var _i = 0, voices_2 = voices; _i < voices_2.length; _i++) {
        var voice = voices_2[_i];
        if (voice.name === selectedOption) {
            utter.voice = voice;
            break;
        }
    }
    synth.speak(utter);
};
document.addEventListener('click', function (event) {
    if (event.target == speechButton) {
        event.preventDefault();
        handleSpeak();
    }
});
document.addEventListener('keydown', function (event) {
    var key = event.which || event.keyCode;
    if (key === 13) {
        event.preventDefault();
        handleSpeak();
    }
});
