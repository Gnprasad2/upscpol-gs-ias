// Properies service create new sheet

function testCreateSheet() {
  var d = new Date();

  // The code below creates a new spreadsheet "Finances" and logs the URL for it
// var ssNew = SpreadsheetApp.create("Finances"+d.getUTCDate());


  // var folder = DriveApp.getFolderById("1vZ-CKHY862KA8bRKzBw1jXAp8X6fBXse");

  // var folder = DriveApp.getFolderById("1vZ-CKHY862KA8bRKzBw1jXAp8X6fBXse");
  var ssNew = SpreadsheetApp.create("Testing"+d.toDateString());
  // DriveApp.getFileById(ssNew.getId()).moveTo(folder);
  // Logger.log(ssNew.getId());
  // Logger.log(ssNew.getName());
  
  

  var ss = SpreadsheetApp.openById("1x_TNn_5du_4dTGb7VNqcq3mymsPt2toETl12nYdcWjU");
  var ws = ss.getSheets()[0];
 
  
  // var range  = ws.getDataRange();
  var rowIndex = ss.createTextFinder("6876113").findNext().getRowIndex();

  Logger.log(rowIndex);
 
  Logger.log(ss.getNumSheets());
  // But there is a 5 million cells limit that will decide how many tabs you can have in the Google Sheets. By default, a new worksheet has 26000 cells (1000 rows and 26 columns). And if you stick to this row and column limit in each sheet, you can insert a maximum of 192 worksheets.


}



// the following returns the new spreadsheet for posting of test results.

function getSpreadSheetId() {

  var currentSpreadSheetId = PropertiesService.getScriptProperties().getProperty('currentSpreadSheetId');
  var ss = SpreadsheetApp.openById(currentSpreadSheetId);
  var numSheets = ss.getNumSheets();
 
  var wsName = PropertiesService.getScriptProperties().getProperty("currentWorkSheetName");
  // Logger.log(wsName);
  var ws = ss.getSheetByName(wsName);
  var lastRow = ws.getDataRange().getLastRow();
  var d = new Date();
  
  if(numSheets >= 150) {
    var newSpreadSheetName =  " "+ d;
    // current spread sheet to be made previous spreadsheet
    PropertiesService.getScriptProperties().setProperty("previousSpreadSheetId", currentSpreadSheetId);


    newSpreadSheetName = "User Test Report "+ newSpreadSheetName.slice(0, 25);

    
    var ssNew = SpreadsheetApp.create(newSpreadSheetName);
    currentSpreadSheetId = ssNew.getId();
    PropertiesService.getScriptProperties().setProperty('currentSpreadSheetId', currentSpreadSheetId );
    var newSheetName =  " "+ d;
    newSheetName = newSheetName.slice(0, 25);
    Logger.log(newSheetName);
    var newWs = ssNew.insertSheet(newSheetName);
    PropertiesService.getScriptProperties().setProperty("currentWorkSheetName",newSheetName);
    // manually format the new SpreadSheet or use prperty service
    

  } else if(lastRow >= 900){
   var newSheetName =  " "+ d;
   newSheetName = newSheetName.slice(0, 25);
   Logger.log(newSheetName);
   var newWs = ss.insertSheet(newSheetName);
   PropertiesService.getScriptProperties().setProperty("currentWorkSheetName",newSheetName);
   var rangeSetting = setFormatSheet(); // new sheet to be formatted
    rangeSetting.copyTo(newWs.getRange(1,1));
   
  }

  

}

function scriptTest() {
  //  PropertiesService.getScriptProperties().setProperty('currentSpreadSheetId', "1x_TNn_5du_4dTGb7VNqcq3mymsPt2toETl12nYdcWjU" );
  // PropertiesService.getScriptProperties().setProperty("currentWorkSheetName","Sheet1" );
  var currentSpreadSheetId = PropertiesService.getScriptProperties().getProperty('currentSpreadSheetId');
   PropertiesService.getScriptProperties().setProperty("previousSpreadSheetId", currentSpreadSheetId);
  
  // PropertiesService.getScriptProperties().deleteProperty("SERVER_URL")

  var url = PropertiesService.getScriptProperties().getProperties();
 
 Logger.log(url);
}








