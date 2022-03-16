// Post evaluation

function userSubmittedForm(mcqs) {

  postEvalMcqs(mcqs);

}





 function getTimeInFormat(timeInMs) {
    // in minutes and seconds. same function getSpentTime(mcq) duplicated.
    let minutes = Math.floor(timeInMs/(60*1000));
    let seconds = Math.floor((timeInMs % (60*1000)) / 1000);
    seconds = seconds > 9 ? `${seconds}` : `0${seconds}`;
    return (`${minutes} m : ${seconds} s`);
  }

 

  function getSpentTime(mcq) {
    // in minutes and seconds. this.time is in milli seconds.
    let minutes = Math.floor(mcq.spentTime/(60*1000));
    let seconds = Math.floor((mcq.spentTime % (60*1000)) / 1000);
    seconds = seconds > 9 ? `${seconds}` : `0${seconds}`;
    return (`${minutes} m : ${seconds} s`);
  }







  function postEvalMcqs(mcqs) {
  var endTimeOfquiz = new Date();
  var visitedButNotAttempted = [];
  var notVisited = [];
  var correctAttempted = [];
  var wronglyAttempted = [];
  var allQuestions = [];
  var testReport = {};

   let numRightQuestions = 0;
  let numWrongQuestions = 0;
  let numNotVisitedQuestions = 0;
  let numVisitedNotAttempted = 0;
  let timeOnRT = 0;
  let timeOnWG = 0;
  let timeOnNA = 0;
  let totalQuestions = mcqs.length;
  let numVisitsOnRT = 0;
  let numVisitsOnWG = 0;
  let numVisitsOnNA = 0;
  let numTotalVisits = 0;
  // time in millis seconds
  let totalQuizTime = 0;
  
  mcqs.forEach(function(mcq){
    totalQuizTime += mcq.spentTime;
      numTotalVisits += mcq.visits;
      allQuestions.push(mcq.id);

     switch (mcq.evaluation) {
      case "correct":
        numRightQuestions += 1;
        timeOnRT += mcq.spentTime;
        numVisitsOnRT += mcq.visits;
        correctAttempted.push(mcq.id);

        
        break;

      case "wrong":
        numWrongQuestions += 1;
        timeOnWG += mcq.spentTime;
        numVisitsOnWG += mcq.visits;
        wronglyAttempted.push(mcq.id);
        break;

      case "notAttempted":
      if(mcq.visits == 0) {
        numNotVisitedQuestions += 1;
        timeOnNA += mcq.spentTime;
        numVisitsOnNA = mcq.visits;
        notVisited.push(mcq.id);
        break;

      } else {
        numVisitedNotAttempted += 1;
        timeOnNA += mcq.spentTime;
        numVisitsOnNA = mcq.visits;
        visitedButNotAttempted.push(mcq.id);
        break;

      }
        



    
  }

  })

  testReport.userName = mcqs[0].userName;
  testReport.testId = mcqs[0].testId;
  testReport.endTimeOfQuiz = endTimeOfquiz;
  testReport.email = mcqs[0].email;
  testReport.totalQuestions = totalQuestions;
  testReport.numRightQuestions = numRightQuestions;
  testReport.numWrongQuestions = numWrongQuestions;
  // testReport.numNotAttemptedQuestions = numNotAttemptedQuestions;
  testReport.numNotVisitedQuestions = numNotVisitedQuestions;
  testReport.numVisitedNotAttempted = numVisitedNotAttempted;
  testReport.totalQuizTime = getTimeInFormat(totalQuizTime);
  testReport.timeOnRightQuestions = getTimeInFormat(timeOnRT);
  testReport.timeOnWrongQuestions = getTimeInFormat(timeOnWG);
  testReport.timeOnNotAttempted = getTimeInFormat(timeOnNA);
  testReport.allQuestions = allQuestions;
  testReport.correctAttempted = correctAttempted;
  testReport.wronglyAttempted = wronglyAttempted;
  // testReport.notAttempted = notAttempted;
  testReport.visitedButNotAttempted = visitedButNotAttempted;
  testReport.notVisited = notVisited;
  testReport.numTotalVisits = numTotalVisits;
  testReport.scoreOnRight = numRightQuestions * 2;
  testReport.scoreOnWrong = numVisitsOnWG * (-2/3);
  testReport.totalScore = numRightQuestions * 2 + numVisitsOnWG * (-2/3);
  testReport.percentageMarks = testReport.totalScore/(testReport.totalQuestions * 2) * 100;

// joined with single space
 var testReportData = [[new Date(),  testReport.percentageMarks.toFixed(2), testReport.totalQuestions, testReport.numRightQuestions, testReport.numWrongQuestions,
                  testReport.numVisitedNotAttempted, testReport.numNotVisitedQuestions, 
                  testReport.totalQuizTime, testReport.timeOnRightQuestions,
                  testReport.timeOnWrongQuestions, testReport.timeOnNotAttempted,
                  
                  testReport.numTotalVisits,  testReport.scoreOnRight, testReport.scoreOnWrong.toFixed(2), testReport.totalScore.toFixed(2), testReport.allQuestions.join(" "),
                  testReport.correctAttempted.join(" "), testReport.wronglyAttempted.join(" "), testReport.visitedButNotAttempted.join(" "), testReport.notVisited.join(" "), testReport.testId, testReport.userName]];



  // Logger.log( endTimeOfquiz.toLocaleTimeString());
  // Logger.log(mcqs[0].ssid);
  
  var currentSpreadSheetId = PropertiesService.getScriptProperties().getProperty('currentSpreadSheetId');
  var wsName = PropertiesService.getScriptProperties().getProperty("currentWorkSheetName");
  // Logger.log(wsName);

  var ss = SpreadsheetApp.openById(currentSpreadSheetId);
  
  var ws = ss.getSheetByName(wsName);

  
  // var range  = ws.getDataRange();
  
   var rowIndex = ss.createTextFinder(testReport.testId).findNext().getRowIndex();
    // Logger.log(rowIndex); 
    if(rowIndex) {
    var range = ws.getRange(rowIndex, 12, 1, testReportData[0].length);
    range.setValues(testReportData);

    } else {
      Logger.log("post evaluation () no corresponding user email.");
    }
   

  


}


function getTimeInFormat(timeInMs) {
    // in minutes and seconds. same function getSpentTime(mcq) duplicated.
    let minutes = Math.floor(timeInMs/(60*1000));
    let seconds = Math.floor((timeInMs % (60*1000)) / 1000);
    seconds = seconds > 9 ? `${seconds}` : `0${seconds}`;
    return (`${minutes} m : ${seconds} s`);
  }






// set formatting and values for test report on the top row of sheets


function setFormatSheet() {
  var ssSetting = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1_xHzJMvuZs-rx8lpnW4wRPUGMcUTYP13pTnzPMZIhvk/edit#gid=448807977");

  var wsSetting = ssSetting.getSheetByName(" Thu Aug 19 2021 07:10:11");
  var rangeSetting = wsSetting.getRange("A1:AB");

  return rangeSetting;
  
}






function rangeSettingCopyTest() {

   var ssSetting = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1_xHzJMvuZs-rx8lpnW4wRPUGMcUTYP13pTnzPMZIhvk/edit#gid=448807977");

  var wsSetting = ssSetting.getSheetByName("Sheet1");


  var rangeSetting = setFormatSheet(); //top row of the new sheet to be formatted
    rangeSetting.copyTo(wsSetting.getRange(1,1));


}








