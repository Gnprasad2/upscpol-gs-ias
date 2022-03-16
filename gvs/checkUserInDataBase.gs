
// verify if user already in database , otherwise register

function verifyUserInDataBase(payload) {

      const profileId = payload.sub;
      const email = payload.email;
      const name = payload.name;
      const picture = payload.picture;
      const email_verified = payload.email_verified;
      const iat = payload.iat;
      
      const exp = payload.exp;
      
      const aud = payload.aud;
      const at_hash = payload.at_hash;
      var data = [new Date(), profileId, email, name, email_verified, iat, exp, at_hash, picture, aud];
      const numFreeDays = 7;

      // const ss = SpreadsheetApp.openById("1x_TNn_5du_4dTGb7VNqcq3mymsPt2toETl12nYdcWjU");
      // const ws = ss.getSheetByName("post");



    
      // ws.appendRow(data);












  
  const ssid = "107atgVuonGepe7k-tpkM6zwUiGe494q_c8ftKTuCQfU"; //new users 
  const ssCurrent = SpreadsheetApp.openById(ssid);
  



  // Logger.log([profileId, userEmail]);
   const finderEmail  = ssCurrent.createTextFinder(email);
   const finderProfileId = ssCurrent.createTextFinder(profileId);
   const pofileRange = finderProfileId.findAll();

   

  if(pofileRange.length) {
    if(finderProfileId.findNext()) {
      //  const wsName = finder.getCurrentMatch().getSheet().getSheetName();
      //  const ws = ssCurrent.getSheetByName(wsName);

      const ws = finderProfileId.getCurrentMatch().getSheet();
      const currentRowIndex = finderProfileId.getCurrentMatch().getRowIndex();
      const subscriptionStatus = ws.getRange(currentRowIndex, 18, 1, 1).getValue();
      return subscriptionStatus;
    }
  




  } else if (email_verified) {
    // Logger.log("user not available in database");

    const ws = ssCurrent.getSheetByName("NewUserData_1");
    const currentRowIndex = ws.getLastRow();
    if(currentRowIndex >=10000) {
      var d = new Date();
      var newSheetName =  " "+ d;
      newSheetName = newSheetName.slice(0, 25);
      ws = ssCurrent.insertSheet(newSheetName);
      currentRowIndex = 3;
    }


   
    //  Logger.log(currentRowIndex);
     data.unshift(currentRowIndex);

    const subscriptionStatusCell = ws.getRange(currentRowIndex + 1, 18, 1, 1);
    const validityDaysCell = ws.getRange(currentRowIndex + 1, 16, 1, 1);
    ssCurrent.appendRow(data);
    subscriptionStatusCell.setValue("INITIAL_FREE");
    validityDaysCell.setValue(numFreeDays);
    const subscriptionStatus = "INITIAL_FREE";
    autoUpdateSubscriptionStatus(currentRowIndex + 1); // Testing new functions.gs


    return subscriptionStatus;
  } else {
    const subscriptionStatus = "emailNotVerifiedByGoogle";
    return subscriptionStatus;
  }


  

  // Protect range A1:B10, then remove all other users from the list of editors.
// const ss = SpreadsheetApp.getActive();
// const range = ssCurrent.getRange('L1:L10');
// const protection = range.protect().setDescription('Sample protected range');

// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script throws an exception upon removing the group.
// Logger.log(protection.getEditors());


}


