
//  fisher- Yates algorithm for randomising

function shuffle(arr= []){
  // Logger.log(arr); 
 
    for(var i = 0 ; i < arr.length; i++){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }
   return arr
}

// var tmpArray = [1, 5 , 7 , 8 ,9 ,2434, 768, 769, 879, 67554, 9088];
//   // shuffle(tmpArray);
// Logger.log(shuffle(tmpArray).slice(0, 4));


function copyToAnotherSS() {
  // template 1 rau
  var data;
  var ss = SpreadsheetApp.openById("1SZA9Ay-A_62yvzoNplRZ_z9RSo5aZhQQqf-POWhk2as");
  var sheets = ss.getSheets();
  Logger.log(sheets.length);
  // r2odatabase
  var destinationSS = SpreadsheetApp.openById("1vzSfPEclXzd-DnXEzrqk9yStPYY55oCgqNY2Lrpuvho");
// //   var regex1 = new RegExp(arrChip, 'i');
//             // str1.concat(str2, str3);
//             //row 2 question row 7 answer, row 12 subject, row 17 key words
//             var isRegEx1InQuestion = regex1.test(row[2].concat(row[7], row[12], row[17]));// question column
//             // var isRegEx1InAnswer = regex1.test(row[7]); // answer column
//             // other columns like source can be added here.
//             return isRegEx1InQuestion ;

  var regex1 =  new RegExp("vaji", 'i');
  var numsheets = 0;


  sheets.forEach(function(sheet) {
    data = [];

    if(regex1.test(sheet.getName())) {
      
      var range = sheet.getDataRange();
      var values = range.getValues();
      var sheetName = sheet.getName();
      var newDestinationSheet = destinationSS.insertSheet(sheetName);
      values.forEach(function(row){
       data.push(row);
        

      })
      
      var newDestinationSheetRange = newDestinationSheet.getRange(1 , 1, data.length, data[0].length);
      newDestinationSheetRange.setValues(data);
    
    }

  })

 Logger.log(destinationSS.getSheets().length);
 var destinationSSsheets = destinationSS.getSheets();
 destinationSSsheets.forEach(function(sheet){
   var newRange = sheet.getDataRange();
   var lastRow = newRange.getLastRow();
   var a1Notation = newRange.getA1Notation();
   Logger.log([lastRow, " ", a1Notation, sheet.getName()]);

 })
 

}



function copyToMasterSheet() {

 var au20db = "1CKf9Rh49Ofl_SFa8fbZGuIWAkZ2vCSAGbk71DKwgfNs";
 var sn20db = "1XsHCxxSZf3vJm0pi1-MM0PNejTR-RXjIqBnjOKTqyus";
 var aj20db = "1vzSfPEclXzd-DnXEzrqk9yStPYY55oCgqNY2Lrpuvho";

  // const ssId = "1CKf9Rh49Ofl_SFa8fbZGuIWAkZ2vCSAGbk71DKwgfNs"; select id and remove comment
  const ss = SpreadsheetApp.openById(ssId);
  const sheets = ss.getSheets();
  const masterSheet = ss.getSheetByName("MASTER");
  var data;

  
  sheets.forEach(function(sheet) {
       data = [];
    if((sheet.getName() !== "MASTER")) {
      var range = sheet.getDataRange();
      var values = range.getValues();
        values.forEach(function(row){
          
          data.push(row);
          
        
      })
      data.shift(); // masterSheet.appendRow(row);
      var masterRange = masterSheet.getRange(masterSheet.getLastRow() + 1, 1, data.length, data[0].length);
      masterRange.setValues(data);
      
    }
    Logger.log(sheet.getName());
   
  })


}

// autofill series by applying formula in a single cell. used in new users sheet
// used by checkUserInDtaBase.gs


function autoUpdateSubscriptionStatus(row) {
  var ssid = "107atgVuonGepe7k-tpkM6zwUiGe494q_c8ftKTuCQfU"; // new users ss
  var ss = SpreadsheetApp.openById(ssid);
  var ws = ss.getSheetByName("NewUserData_1");
  var currentRow = row;
  var sourceCellQ2 = ws.getRange("Q2");
  var sourceCellR2 = ws.getRange("R2");
  sourceCellQ2.setFormula(`=IFS(B2="", "", N2="", B2+P2, N2<>"", N2+P2)`);
  sourceCellR2.setFormula(`=IFS(Q2="", "", AND(TODAY()>Q2, N2<>"") , "SUBSCRIPTION_EXPIRED", AND(TODAY()<=Q2, N2<>""), "PAID_ACTIVE", AND(TODAY()<=Q2, B2<>""), "INITIAL_FREE", AND(TODAY()>Q2, B2<>"",N2=""),"FREE_TRIAL_EXPIRED", B2="", "")`);

  var destinationCellSubscriptionStatus = ws.getRange(currentRow, 18, 1, 1);
  var destinationCellValidity =  ws.getRange(currentRow, 17, 1, 1);

  sourceCellQ2.copyTo(destinationCellValidity);
  sourceCellR2.copyTo(destinationCellSubscriptionStatus);
  
 



}


