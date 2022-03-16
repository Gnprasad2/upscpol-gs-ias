// get the candidates mistake questions for revision


function getMyMistakes(email) {
  
  var email = email;
  var previousSpreadSheetId =  PropertiesService.getScriptProperties().getProperty("previousSpreadSheetId");
  var currentSpreadSheetId = PropertiesService.getScriptProperties().getProperty('currentSpreadSheetId');
  var ssCurrent = SpreadsheetApp.openById(currentSpreadSheetId);
  var ssPrevious = SpreadsheetApp.openById(previousSpreadSheetId);
  var myMistakeQuestionIds = [];
  var myCorrectQuestionIds = [];
  // var myNotAttemptedQuestionIds = [];

// if data set increased add ssPrevious to the following array
  var ssArr = [ssCurrent];
  for(i = 0; i < ssArr.length; i++) {

    var finder  = ssCurrent.createTextFinder(email);
    while(finder.findNext()) {
      //  var wsName = finder.getCurrentMatch().getSheet().getSheetName();
      //  var ws = ssCurrent.getSheetByName(wsName);

      var ws = finder.getCurrentMatch().getSheet();
       var currentRowIndex = finder.getCurrentMatch().getRowIndex();
      
       var myMistakesCellArr = ws.getRange(currentRowIndex, 29, 1, 1 ).getValues()[0].join().split(" ");
       var myCorrectsCellArr = ws.getRange(currentRowIndex, 28, 1, 1 ).getValues()[0].join().split(" ");
       var myVistedNotAttemptedCellArr = ws.getRange(currentRowIndex, 30, 1, 1 ).getValues()[0].join().split(" ");
      //  Logger.log(prepMode);
      //  Logger.log(myCorrectsCellArr);
       myMistakesCellArr.forEach(function(myMistake) {
          myMistakeQuestionIds.push(myMistake);
       })
       myCorrectsCellArr.forEach(function(myCorrect) {
         myCorrectQuestionIds.push(myCorrect);
       })
       myVistedNotAttemptedCellArr.forEach(function(myNotAttempt){
         myMistakeQuestionIds.push(myNotAttempt);
       })



      //  convert to set and back to array
    }

       var uniqueMyMistakeQuestionIds = [...new Set(myMistakeQuestionIds)];
       var uniqueMyCorrectQuestionIds = [...new Set(myCorrectQuestionIds)];
     

       
  
      //  Logger.log(myMistakeQuestionIds);
      //  Logger.log(uniqueMyMistakeQuestionIds);
      // Logger.log(myCorrectQuestionIds);
      // Logger.log(uniqueMyCorrectQuestionIds);
      // Logger.log(uniqueMyNotAttemptQuestionIds);
    }

   
    // mymistakes column Z 26
    // var myMistakeIds = ssArr[i][0].getRange(currentRowIndex, 26, 1, 1 ).split(" ");
    // myMistakeQuestionIds.push(myMistakeIds);

    // corrected Question Ids subtracted, x is questionid in the following
    var myMistakeQuestionIdsToBeCorrected = uniqueMyMistakeQuestionIds.filter(function(x) {
      return (!uniqueMyCorrectQuestionIds.includes(x));
    }) 

  // Logger.log(uniqueMyMistakeQuestionIds);
  // Logger.log(myMistakeQuestionIdsToBeCorrected);


return [uniqueMyMistakeQuestionIds, myMistakeQuestionIdsToBeCorrected];

}
