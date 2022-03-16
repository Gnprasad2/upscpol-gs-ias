function doSomething() {
  console.info('DOM loaded');
}

if (document.readyState === 'loading') {  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', doSomething);
} else {  // `DOMContentLoaded` has already fired
  doSomething();
}





window.addEventListener('message', event => {
    // IMPORTANT: check the origin of the data! 
    if (event.origin.startsWith('https://script.google.com/')) { 
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:
        console.log(event.data); 
    } else {
      console.log("the message not pertaining to you");
        // The data was NOT sent from your site! 
        // Be careful! Do not use it. This else branch is
        // here just for clarity, you usually shouldn't need it.
        return; 
    } 
}); 

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
});


//  google translation

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages : 
  'hi,as,bh,bn,dz,gu,kn,ks,ml,mr,ne,or,pa,te,ta,ur,sa,sd,en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}
