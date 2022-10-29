// speech synthesis



var answerSpeaker = document.getElementById("answerSpeak");
var os; // operating system
var answeSpeaking;
var mainSection = document.getElementsByClassName("main")[0];
var speakTranslateSection = document.getElementsByClassName("notranslate")[0];
// Global event listeners

document.addEventListener('dblclick', function (e) {
  speakTranslateSection.classList.toggle('noDisplay');
})




// event listener functions for speech synthesis

function stopSpeak() {
  if (synth.speaking) {
    synth.cancel();
    amIPaused = false;
    document.getElementById("pause-resume").textContent = "pause";
    document.getElementById("answerSpeakI").textContent = "play_circle_filled";
    answeSpeaking = false;
  }
}

function resumeSpeak() {
  if (synth.speaking) {
    // console.log(amIPaused);
    if (document.getElementById("pause-resume").textContent == "play_arrow") {
      synth.resume();
      document.getElementById("pause-resume").textContent = "pause";
      amIPaused = false;
      //  console.log('inside resume executed');
    } else {
      pauseSpeak();
      document.getElementById("pause-resume").textContent = "play_arrow";
      amIPaused = true;
      // console.log('outside resume executed');
    }
  }

}

function pauseSpeak() {
  if (synth.speaking) {
    synth.pause();
  }

}

function answerSpeak() {

 
    var textInputForSpeech = mainSection.textContent;
   

}



function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  }
}

function goForward() {
  window.history.forward();
}

//  google translation

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en', includedLanguages:
      'hi,as,bh,bn,dz,gu,kn,ks,ml,mr,ne,or,pa,te,ta,ur,sa,sd,en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}



document.addEventListener('contextmenu', function (ev) {
  ev.preventDefault();
  return false;
}, false);


window.onload = (event) => {


  M.AutoInit();

  let parentDiv = document.getElementsByClassName("top_nav")[0].parentNode;

}





