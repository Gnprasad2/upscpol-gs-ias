
// const url = "https://script.google.com/macros/s/AKfycbwkXarjwcYLZXynzxY7EEmdWQrmyd6KmCKxvWP558Hr/dev";




// function doGet() {

//   var response = [{status: "cool"}];
//   return ContentService
//   .createTextOutput(JSON.stringify(response))
//   .setMimeType(ContentService.MimeType.JSON);
  
  

  
    


// }


function doGet(e) {
  return loadForm();

}



function doPost(e) {
    var sampleJWT = {
    "iss": "https://accounts.google.com",
    "azp": "1234987819200.apps.googleusercontent.com",
    "aud": "1234987819200.apps.googleusercontent.com",
    "sub": "10769150350006150715113082367",
    "at_hash": "HK6E_P6Dh8Y93mRNtsDB1Q",
    "hd": "example.com",
    "email": "jsmith@example.com",
    "email_verified": "true",
    "iat": 1353601026,
    "exp": 1353604926,
    "nonce": "0394852-3190485-2490358"
  }

  const authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
  const  status = authInfo.getAuthorizationStatus();
  // var  url = authInfo.getAuthorizationUrl();
  //  Logger.log(url);

  const idToken = ScriptApp.getIdentityToken();
  var userStatus = "EXPIRED";

  // Logger.log(idToken);

  if (idToken != null) {

      var body = idToken.split('.')[1];
      var decoded = Utilities.newBlob(Utilities.base64Decode(body)).getDataAsString();
      var payload = JSON.parse(decoded);
      // var profileId = payload.sub;
      // var email = payload.email;
      // var name = payload.name;
      // var picture = payload.picture;
      // var email_verified = payload.email_verified;
      // var iat = payload.iat;
      
      // var exp = payload.exp;
      
      // var aud = payload.aud;
      // var at_hash = payload.at_hash;
      // var data = [new Date(), profileId, email, name, email_verified, iat, exp, at_hash, picture, aud];

  // Logger.log('Profile ID: ' + profileId);
  // Logger.log('email: ' + email );
  // Logger.log(payload);
  // payloadlog :	{at_hash=FM_5KhEGxK5fhPkQh85VlQ, sub=114914007886158376377, iat=1.629080084E9, exp=1.629083684E9, email_verified=true, aud=492588668881-nlesns1bou9aone4fcl6kuhnpthlgpde.apps.googleusercontent.com, email=72.giddaluri@gmail.com, iss=https://accounts.google.com}
  // [{sub=114914007886158376377, email_verified=true, iss=https://accounts.google.com, given_name=giddaluri, aud=492588668881-nlesns1bou9aone4fcl6kuhnpthlgpde.apps.googleusercontent.com, at_hash=jQPRGHEFyMcSe3pIbZDoYA, locale=en-GB, family_name=nagendra, name=giddaluri nagendra, exp=1.629112717E9, iat=1.629109117E9, email=72.giddaluri@gmail.com, picture=https://lh3.googleusercontent.com/a/AATXAJxbMSDZLBdnmcMndwiH7NwPbSONlxT_h7eH5V5T=s96-c}]


  
    // var data = [];
    // data.push(payload);
    //   const ss = SpreadsheetApp.openById("1x_TNn_5du_4dTGb7VNqcq3mymsPt2toETl12nYdcWjU");
    //   const ws = ss.getSheetByName("post");
    
    // ws.appendRow(data);
    // Logger.log(Session.getActiveUser().getEmail());
    // Logger.log(PropertiesService.getUserProperties());
    // Logger.log(ScriptApp.getOAuthToken());
    

    
    // Logger.log(data);

    // Logger.log(status);
    // Logger.log(url);

    var url = ScriptApp.getService().getUrl();
    // Logger.log(url);

    // verify the user in the registration data
    // const userData = [profileId, email];
     userStatus = verifyUserInDataBase(payload);
    Logger.log(userStatus);

  }

 

    if(status == "NOT_REQUIRED") {
      switch (userStatus) {
        case "INITIAL_FREE":
          return freeSample();
          break;

        case "PAID_ACTIVE":
        // Logger.log("inside paid active executed");
          return paidActive();
          break;

        case "SUBSCRIPTION_EXPIRED":
          return suscriptionExpired();
          break;

        case "FREE_TRIAL_EXPIRED":
        return freeTrialExpired();
        break;

        case "emailNotVerifiedByGoogle":
        return emailNotVerified();
          break;

    
      }
    
     
    //   var response = [{new_status_great: "cool"}];
    //   return ContentService
    //         .createTextOutput(JSON.stringify(response));
    // // .setMimeType(ContentService.MimeType.JSON);
    

    }  else {
    Logger.log("Invalid ID token.");
  }



}


function usertest () {
   var idToken = ScriptApp.getIdentityToken();

  // Logger.log(idToken);

  if (idToken != null) {

      var body = idToken.split('.')[1];
      var decoded = Utilities.newBlob(Utilities.base64Decode(body)).getDataAsString();
      var payload = JSON.parse(decoded);
      var profileId = payload.sub;
      var email = payload.email;
      var name = payload.name;
  }
  var loginId = Session.getEffectiveUser().getEmail();
  // var email = Session.getActiveUser().getEmail();
  // Logger.log([email, loginId, profileId]);
  return [email, name];
}
 

var scriptId = "1usQOxBVxiNXu7DSH6-RnIuVLCbhZ14cpKayQRuWZCVOn7d1hmIJJY6YY";
var deploymentSite = "https://script.google.com/macros/s/AKfycbygV9bupb4AS3WKz-F3JyijwHpodFyjb5aPcrYgWb8xUKzrZZJX7lWmaV8MWFfAe0zu/exec";


var reDirectionUri = "https://script.google.com/macros/d/1usQOxBVxiNXu7DSH6-RnIuVLCbhZ14cpKayQRuWZCVOn7d1hmIJJY6YY/usercallback";


function getCallbackURL(callbackFunction) {
  // IMPORTANT: Replace string below with the URL from your script, minus the /edit at the end.
  var scriptUrl = 'https://script.google.com/macros/s/AKfycbzKuHbI616j3GHdMlEeaebpQK2s2s1gxSCMGPuhOHz-rehA9BQ';
  var urlSuffix = '/usercallback?state=';
  var stateToken = ScriptApp.newStateToken()
      .withMethod(callbackFunction)
      .withTimeout(120)
      .createToken();
  return scriptUrl + urlSuffix + stateToken;
}








// login form below




  

function loadForm() {
var title =" test gs IAS"
  

  var tmp =  HtmlService.createTemplateFromFile('index');
  return tmp.evaluate()
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setTitle(title)
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


function logRedirectUri() {
  
  var service = getService();
  Logger.log(service.getRedirectUri());
}


function freeSample() {
var title =" test gs IAS"
  

  var tmp =  HtmlService.createTemplateFromFile('free-sample');

  return tmp.evaluate()
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setTitle(title)
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function paidActive() {
        var title =" GS IAS"
        var tmp =  HtmlService.createTemplateFromFile('testing');
        return tmp.evaluate()
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setTitle(title)
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


function suscriptionExpired() {
        var title =" GS IAS"
        var tmp =  HtmlService.createTemplate("<h3>Subscription Expired</h3>");
        return tmp.evaluate()
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setTitle(title)
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function freeTrialExpired() {
        var title =" GS IAS"
        var tmp =  HtmlService.createTemplate("<h3>Free Trial Expired</h3>");
        return tmp.evaluate()
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setTitle(title)
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function emailNotVerified() {
        var title =" GS IAS"
        var tmp =  HtmlService.createTemplate("<h3>Your gmail account has not been verified by Google yet. Please use verified account.</h3>");
        return tmp.evaluate()
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setTitle(title)
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}










