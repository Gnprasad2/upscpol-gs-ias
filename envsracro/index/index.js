// speech synthesis

  // Init SpeechSynth API
  const synth = window.speechSynthesis; // select voice, lang , methods speak, play, pause and properties paused, pending etc
  var speakText = new SpeechSynthesisUtterance(); // set the text input and settings like rate, pitch, volume etc.
  var selectedVoice;
  // DOM Elements
  // const textForm = document.querySelector('form');
  // const textInput = document.querySelector('#text-input');
  var amIPending = false;
  var amISpeaking = synth.speaking;
  var amIPaused = false;
  var answerSpeaker= document.getElementById("answerSpeak");
  var os; // operating system
  var answeSpeaking;
  var mainSection = document.getElementsByClassName("main")[0];
  var speakTranslateSection = document.getElementsByClassName("notranslate")[0];
  // Global event listeners

document.addEventListener('dblclick', function(e) {
  speakTranslateSection.classList.toggle('noDisplay');
})

  
  
  
  // Init voices array
  let voices = [];
  
  const getVoices = () => {
    voices = synth.getVoices();
    // console.log(voices);
    os = getOperatingSystem();
    
  
  
   
  };
  
  //Line 35, 36 causes voice list duplication
  getVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
  }
  
  
  
  
  
  
  
  
  // Speak function
  const gsSpeak = function (textInputForSpeech){
    // Check if speaking
    if (synth.speaking) {
      synth.cancel(); 
    }
  
  
      var selectedVoiceArr = voices.filter(function(voice) {
          // console.log(voice);
          // || voice.localService == true
          let userAgentString = navigator.userAgent;
          if(voice.default == true || voice.lang == 'hi-IN' || voice.localService == true){
            switch (os){
              case "Windows OS":
              if(userAgentString.indexOf("Chrome") > -1) {
                speakText.lang = 'hi-IN';
                speakText.voice = voice;
                selectedVoice = voice;
                return true;
              } else {
                  speakText.lang = voice.lang;
                  speakText.voice = voice;
                  selectedVoice = voice;
                  return true;
              }
              
              case "Android OS":
              if(voice.default == true){
                speakText.lang = voice.lang;
                speakText.voice = voice;
                selectedVoice = voice;
                return true;
              }
              
            default:
              speakText.lang = voice.lang;
              speakText.voice = voice;
              selectedVoice = voice;
              return true;
            }
  
          } else {
            return false;
          }
  
        })
  
  
    
    
  
  
    // voices.forEach(function(voice) {
    //     // console.log(voice);
    //     if (voice.name === 'Google हिन्दी') {
    //       speakText.voice = voice;
    //       selectedVoice = voice;
    //       speakText.lang = 'hi-IN';
          
    //       console.log(selectedVoice);
    //         console.log(selectedVoice.localService + 'local service');
    //     } 
    // });
  
   
   
    
  
    // console.log(`selected voice: ${selectedVoice}`);
    // console.log(`selected voice: ${selectedVoice.lang}`);
  
  
    if (textInputForSpeech !== '') {
      // alert(selectedVoice.localService);
      
  
          const str = textInputForSpeech;
  
      if(str.length > 190 && selectedVoice.localService == false) {
        // if(str.length > 170 ) {
  
          // var regex = /\.^\D/g;
      
  
        var myArr = str.split('.');
  
        // var myArr = str.split(regex);
  
        // Logger.log(myArr.length);
        // var newArr = [];
        // var groupLength = 1;
        // var prevIndex = 0;
        // var nextIndex = groupLength;
  
        // while(nextIndex <= myArr.length) {
  
  
        //   newArr.push(myArr.slice(prevIndex, nextIndex).join('.') + '.');
        //   prevIndex = nextIndex;
        //   nextIndex += groupLength;
          
        //   // Logger.log(newArr.length);
        // }
  
        // if(nextIndex > myArr.length) {
        //   newArr.push(myArr.slice(prevIndex, myArr.length).join('.'));
        // }
        // console.log('arrspeak section executed');
  
        arrSpeak(myArr);
  
      } else {
  
          speakText.text = textInputForSpeech;
          speakText.lang = "en-US";
          synth.speak(speakText);
          // alert("else en-GBsection executed");
  
      }
  
  
  
  
      }
  
  
      
  
  
  
  
  
  
  
      // Get speak text
      
  
  
  
  
  
  
  
      // Speak end
      speakText.onend = e => {
  
          // console.log('Done speaking...');
      document.getElementById("answerSpeakI").textContent = "play_circle_filled"; 
      answeSpeaking = false; 
  
        
        // body.style.background = '#141414';
      };
  
      // Speak error
      speakText.onerror = e => {
        // console.error('Something went wrong');
      };
  
      // Loop through voices
      
  
      // Set pitch and rate
      // speakText.rate = rate.value;
      // speakText.pitch = pitch.value;
      // Speak
      // synth.speak(speakText);
      
    
  };
  
  // EVENT LISTENERS
  
  // Text form submit
  // textForm.addEventListener('submit', e => {
  //   e.preventDefault();
  //   var textInputToSpeak = textInput.value;
  //   gsSpeak(textInputToSpeak);
  //   textInput.blur();
  // });
  
  
  function eachSpeak(utterText, index=0) {
    if(utterText !== '' && utterText !== '.' ) {
            // synth.pause();
            // synth.resume();
            
            speakText = new SpeechSynthesisUtterance(utterText);
            speakText.text = utterText ;
            speakText.rate = 1.0;
            
            //  speakText.lang = "en-US";
            speakText.lang = "hi-IN";
  
            
            // voices.forEach(function(voice) {
            //     // console.log(voice);
            //     if (voice.name === 'Google हिन्दी') {
            //       speakText.voice = voice;
            //       speakText.lang = "hi-IN";
            //       // console.log(voice);
            //     } 
            // });
            
  
            speakText.voice = selectedVoice;
            synth.speak(speakText);
            // amIPending = synth.pending;
            // console.log(`am i pending: ${amIPending}, ${index}`);
            // console.log(`am i speaking: ${amISpeaking}, ${index}`);
            //  console.log(`am i paused: ${amIPaused}, ${index}`);
            // console.log(utterText);
  
             speakText.onend = e => {
              //  console.log('Done speaking...');
             
        
        // body.style.background = '#141414';
      };
  
    }
  
     
  
    
  }
  
  
  function arrSpeak(newArr=[]) {
  
    newArr.forEach(function(utterText, index) {
            if (utterText.length < 190) {
              eachSpeak(utterText, index);
            } else {
  
              var utterTextNewArr = utterText.split(',');
              utterTextNewArr.forEach(function(utterTextN){
               let string = utterTextN;
                let numParts = parseInt(string.length/190) + 1;
                let m = parseInt(string.length/numParts) + 1;
                // console.log(`m value is ${m}, sringlength:${string.length}`);
                let start = 0;
                for( let i = 0; i < numParts; i++) {
  
                  let k = i * m;
                  while(string.charAt(k+m) !== " " && k+2*m <= string.length+190) {
                    k++;
                  }
                  // let currentText = string.substring(i * m, Math.min(((i+1)*m), i*m + 190 ));
                  let currentText = string.substring(start, Math.min((k+m), k + 190 ));
                  start = Math.min((k+m), k + 190 );
                  eachSpeak(currentText);
                  // console.log(currentText);
                }
          
              })
            }
    })
               
  
             
              //   let string = utterText;
              //   let numParts = parseInt(string.length/190) + 1;
              //   let m = parseInt(string.length/numParts) + 1;
              //   console.log(`m value is ${m}, sringlength:${string.length}`);
                
              //   for( let i = 0; i < numParts; i++) {
              //     let currentText = string.substring(i * m, Math.min(((i+1)*m), i*m + 190 ));
              //     eachSpeak(currentText);
              //     console.log(currentText);
              //   }
          
              //   }
              // })
               
  
  }
  
  
  
  
  
  
  // event listener functions for speech synthesis
  
  function stopSpeak() {
    if (synth.speaking) {
      synth.cancel(); 
      amIPaused = false;
      document.getElementById("pause-resume").textContent="pause";
      document.getElementById("answerSpeakI").textContent = "play_circle_filled"; 
      answeSpeaking = false; 
    }       
  }
  
  function resumeSpeak() {
    if (synth.speaking) {
        // console.log(amIPaused);
      if(document.getElementById("pause-resume").textContent == "play_arrow") {
        synth.resume();
        document.getElementById("pause-resume").textContent="pause";
        amIPaused = false;
        //  console.log('inside resume executed');
      } else {
        pauseSpeak();
        document.getElementById("pause-resume").textContent="play_arrow";
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
  
    if(!answeSpeaking) {
        if (synth.speaking) {
          synth.cancel(); 
        }  
      // var textInputForSpeech = mcqs[currentQuestionNo - 1].answerToSpeak;
    var textInputForSpeech = mainSection.textContent;
    answeSpeaking = true;
    document.getElementById("answerSpeakI").textContent = "stop";
    gsSpeak(` ${textInputForSpeech}.  over.`);
    document.getElementById("pause-resume").textContent="pause";
    
    } else {
      stopSpeak();
      answeSpeaking = false;
     
    }
  
      if(os == "Windows OS") {
        if(document.getElementById("pause-resume").classList.contains("noDisplay")) {
          document.getElementById("pause-resume").classList.remove("noDisplay");
        }
  
      }
  
  }
  
  
  function referenceActiveTabSpeak() {
  
  
  }
    
  
  
  function questionSpeak() {
    if (synth.speaking) {
      synth.cancel();  
    }  
  
  
      var textInputForSpeech = mcqs[currentQuestionNo - 1].questionToSpeak;
      // var textInputForSpeech = sidebarSection.textContent;
      gsSpeak(`question number ${mcqs[currentQuestionNo - 1].qnum}...  ${textInputForSpeech} . question number ${mcqs[currentQuestionNo - 1].qnum} over.`);
      document.getElementById("pause-resume").textContent="pause";
      answeSpeaking = false;
      amIPaused = false;
  
      document.getElementById("answerSpeakI").textContent = "play_circle_filled"; 
      if(os == "Windows OS") {
        if(document.getElementById("pause-resume").classList.contains("noDisplay")) {
          document.getElementById("pause-resume").classList.remove("noDisplay");
        }
  
      }
  
      
  }
  
  
  
  function getOperatingSystem() {
  
      var os = "Unknown OS";
          if (navigator.userAgent.indexOf("Win") != -1) { os = "Windows OS"; }
          if (navigator.userAgent.indexOf("Mac") != -1) { os = "Macintosh"; }
          if (navigator.userAgent.indexOf("Linux") != -1) { os = "Linux OS"; }
          if (navigator.userAgent.indexOf("Android") != -1) { os = "Android OS"; }
          if (navigator.userAgent.indexOf("like Mac") != -1) { os = "iOS"; }
  
      // alert(os);
      return os;
    
  }

  function goBack() {
    if(window.history.length > 1) {
      window.history.back();
    }    
  }

  function goForward() {
    window.history.forward();
 }

//  google translation

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages : 
    'hi,as,bh,bn,dz,gu,kn,ks,ml,mr,ne,or,pa,te,ta,ur,sa,sd,en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
  }

  window.onload = (event) => {
    M.AutoInit();
    if (synth.speaking) {
      synth.cancel();  
    }  
    
    // if(window.location == window.top.location) {
    //   window.location = "https://script.google.com/macros/s/AKfycbyaV7YNwZLEfpRagpgkMctfJPrwjACjoOP5fmumjcc/dev";
    // }

  };



  
  

  