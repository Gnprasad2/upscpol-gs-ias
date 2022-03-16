// function doGet(e) {

//   // Logger.log(e);
//   // Logger.log(e.parameter);
//   // Logger.log(e.parameter.name)
  
//   var title =" GS IAS"
  

//   var tmp =  HtmlService.createTemplateFromFile('testing');
//   return tmp.evaluate()
//   .addMetaTag('viewport', 'width=device-width, initial-scale=1')
//   .setTitle(title)
//   .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

// }









function includeExternalFile(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function add(a, b) {
  
  return a + b ;

}





function webFunction() {
  var url  = "https://script.googleusercontent.com/macros/echo?user_content_key=UWDtTlzI6ugFpGaidOnP0uuGKOwmDfF9ts3VXQimpbiZCP5bFg9MYcecRJ3CBbEjsZOz4Z8Bv6l7E7KvwCbOQjImdQT1CzaJm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnO_QVb-TcnmjHC2sjRDzEeAyVp-cMj1i_etjdrvgGR7XQUFTpKRdw-X7GzJZ-PXYEXJFjWkyKj0mO_VfqSsPIshhQieqSOOOSA&lib=McYG_2xYbkmiUpzrcj37gbdw1nH9IbQoU";
  var response = UrlFetchApp.fetch(url);
  var parsedResponse = JSON.parse(response);
  // Logger.log(parsedResponse);
}






// returns objects from sheets headers
function makeObject(multiArr) {
  var obj = {};
  var headers = multiArr.shift();
  for(var i = 0; i < headers.length; i++) {
    obj[headers[i]] = multiArr.map(function(item){
      return item[i];
    })

  }
}


//user clicked client side run button and record is validated.

function userClicked(testInfo) {
  // Test Initiation Data  spreadsheet
  
  getSpreadSheetId();

  // for posting user data

  var currentSpreadSheetId = PropertiesService.getScriptProperties().getProperty('currentSpreadSheetId');
  var wsName = PropertiesService.getScriptProperties().getProperty("currentWorkSheetName");
  // Logger.log(wsName);

  var ss = SpreadsheetApp.openById(currentSpreadSheetId);
  
  // Logger.log(testInfo);
  var ws = ss.getSheetByName(wsName);
  var lastRow =  ws.getLastRow();
  
  testInfo.testId = Math.floor(Math.random() * 100000000);

   
  ws.appendRow([lastRow, testInfo.testId, new Date(), testInfo.userName, testInfo.email, testInfo.subjects.join(), testInfo.year, testInfo.chips.join() , testInfo.prepMode, testInfo.exams.join(), testInfo.numQuestions]);
   console.log(testInfo);
  //  console.log(testInfo.chips);
   
 
  return getQuestionsfromSheet(testInfo);

  
  
  // console.log("user clicked function executed at server side.")
}



function getQuestionsfromSheet(testInfo) {
  //include filter and randomise functions here
  var questionsList = [];

  // gnp test ss
  // var spreadSheetId = '1dewdHvFNS2h-e8ZxVRaPiwPfTcEmV6iHFr1I39SOzus';
  // var ss = SpreadsheetApp.openById( spreadSheetId);
  // var ws = ss.getSheetByName("questions");

//  upsc data base
  //   var spreadSheetId = '1SuoCQ4I2i7cykXmQL74pEm7Vqyc5UpBNw61XUCGZKKo';
  // var ss = SpreadsheetApp.openById( spreadSheetId);
  // var ws = ss.getSheetByName("MASTER");
  // // selectedRange = ws.getRange(1, 1, 51, 16);
  // var selectedRange = ws.getDataRange();
  // // selectedRange.randomize();
  // var selectedData =  selectedRange.getValues();

   var exams = testInfo.exams;

  var selectedData =  getDataRangesValuesArr(exams);




  // Logger.log(selectedData);
  // Logger.log(selectedData.length);

  // selectedData = selectedData.filter(function(row){
  //     // ! in the below line is NOT and negates the return value.
  //     return !row.every(function(cellValue) {
  //     return cellValue === "";
  //   })
  // })
  // Logger.log(selectedData.length);

   // filter complete blank rows
  // var cellC3 = ws.getRange("Y2");// testing blank cell value is null
  // Logger.log(cellC3.value);
  // Getting filtered questions based on conditions
  // Tested Filter criteria


  // The following arrays shall be included in the getQuestionsFromSheet arguments list as three arrays.
  // selectedQuestionSet shall be replaced with selected data
  // var subjects = ["CA", "GG", "EC", "HS", "PO", "ALL" ];
  
  var years    = [ 2020, 2021, "Previous", "ALL"];
  var subjects = testInfo.subjects;
  var year = testInfo.year;
  
  // var previousExams = ["UPSC", , "MIS", "ALL"];
  // var arrChips = ["election", "president", "ALL"];
  var arrChips = testInfo.chips;
  var prepMode = testInfo.prepMode;

  var userName = testInfo.userName;
  var userEmail = testInfo.email;
  var testId = testInfo.testId;
 

  if((exams.includes("MIS") || exams.includes("AWA")) && !(exams.includes("ALL"))) {
    var myMistakeQuestionIds = getMyMistakes(userEmail);
    // Logger.log(myMistakeQuestionIds);
    if(exams.includes("AWA")){
     var mySelectedMistakeQuestionIds = myMistakeQuestionIds[0];
    } else if(exams.includes("MIS")) {
     var mySelectedMistakeQuestionIds = myMistakeQuestionIds[1];
    }
    selectedData = selectedData.filter(function(row) {
     return mySelectedMistakeQuestionIds.some(function(myMistakeQuestionId) {
        return row[0].toString() == myMistakeQuestionId;
      })
    })
  }
//following added on 21/08. to be checked
//  upsc year filteration
 
    // if(exams.includes("UPSC")) {
    selectedData = selectedData.filter(function(row){
      var yearFilter = true;
      var upscFilter;
      if(row[14]) {
        if(!year){ year = 0;}
        if(year > 2020) {year = 2020;} // replace with latest year in the data base
       yearFilter =  parseInt(row[14]) >= parseInt(year);
      }
       if(exams.includes("UPSC") && !(exams.includes("ALL"))) {
        upscFilter = row[15].toString().toLowerCase() == "UPSC".toLowerCase();
       } else {
         upscFilter = true;
       }

      return yearFilter && upscFilter;
      
    })
  // }

  






  // Logger.log(selectedData);
  
  
  

  var numOfQuestions = parseInt(testInfo.numQuestions) ; // This shall be done after randomising.
  var filteredQuestions = selectedData.filter(function(row) {
    var subjectFilter = subjects.some(function(subject) {
      if (subject === "ALL") {
        return true;
      } else {
        // Logger.log(subject.toString().toLowerCase());
        // Logger.log(row[12].toString().toLowerCase());
        return (subject.toString().toLowerCase() === row[12].toString().toLowerCase());
      }
    });

    var yearFilter = years.some(function(year) {
      if (year === "ALL") {
        return true;
      } else {
        return year.toString().toLowerCase() === row[14].toString().toLowerCase();
      }
    });

    // var previousExamFilter = previousExams.some(function(previousExam){
    //   if (previousExam === "ALL") { 
    //     return true;
    //   } else {
    //     return previousExam.toString().toLowerCase() === row[15].toString().toLowerCase();
    //   }
    // });

      if (arrChips.length === 0) {
        var chipsFilter = true;
      } else {
        var chipsFilter = arrChips.some(function(arrChip) {
          
            var regex1 = new RegExp(arrChip, 'i');
            // str1.concat(str2, str3);
            //row 2 question row 7 answer, row 12 subject, row 17 key words
            var isRegEx1InQuestion = regex1.test(row[2].concat(row[7], row[12], row[17]));// question column
            // var isRegEx1InAnswer = regex1.test(row[7]); // answer column
            // other columns like source can be added here.
            return isRegEx1InQuestion ;
          })
        };
      
      


    var finalRturn = subjectFilter && yearFilter  && chipsFilter;
    // var finalRturn = subjectFilter && yearFilter && previousExamFilter && chipsFilter;

    // Logger.log(`Question No:${row[1]}  subject : ${subjectFilter}, yearFilter : ${yearFilter}, previousExamFilter: ${previousExamFilter} chipsFilter: ${chipsFilter} finalReturn:${finalRturn}`);

    return subjectFilter && yearFilter  && chipsFilter;
  
  });

  // shuffle and slice the array added on 22/08/21
//  Logger.log(filteredQuestions.length);
  if(filteredQuestions.length < numOfQuestions ) { numOfQuestions = filteredQuestions.length;}
  filteredQuestions = shuffle(filteredQuestions).slice(0, numOfQuestions);

// Logger.log(filteredQuestions.length);
// Logger.log(filteredQuestions);
  var mcqObject = filteredQuestions.map(function(question, questionNum) {
    // qnum property added here. others also can be added.
    var finalQuestionSet = new Mcq(question);
    finalQuestionSet.qnum = questionNum + 1;
    finalQuestionSet.prepMode = prepMode;
    finalQuestionSet.userName = userName;
    finalQuestionSet.email = userEmail;
    finalQuestionSet.testId = testId;
    
    
    return finalQuestionSet;
  })

  // Logger.log(mcqObject.length);
  // Logger.log(mcqObjects);
  // Logger.log(mcqObject);
 
 
  return mcqObject;
}


class Mcq {
  //get the mcq object from question array
  constructor(arr=[]) {
    this.id=arr[0];
    this.question=this.preProcessQuestion(arr[2]);
    this.oA=arr[3]; 
    this.oB=arr[4];
    this.oC=arr[5];
    this.oD=arr[6];
    this.explanation=this.preProcessingAnswer(arr[7]);
    this.source=arr[8];
    this.cA=arr[9].trim(); //Correct Answer
    this.imgQ=arr[10];
    this.imgA=arr[11];
    this.subject=arr[12];
    this.isCurrentAffair=arr[13];
    this.year=arr[14];
    this.status = "unvisited";
    this.selectedAnswer = ""
    this.checkedOption = 6;
    this.evaluation = "notAttempted"; //"correct", "wrong"
    this.visits = 0;
    this.spentTime = 0 ; // time in ms.
    this.score = 0;
    this.candidateProbableChoices = [false, false, false, false];
    this.color = "grey";
    this.hindiExplanation = arr[17];
    this.questionToSpeak = arr[2];
    // this.answerToSpeak = arr[7];
     
    
  }

  preProcessQuestion (question) {
    // var regExpression = /([1-6][.])/g; // modified on 13/07/2021 have to check
    var regExpression = /\s[(]?([2-6A])[\.\)]\s/g;
    var regExpression2 = /\.[\s]*(Which)/;
    var regExpression3 = /(Select)/;
    var regExpression4 = /\s[(]?([1])[\.\)]\s/g
    
    
    
    
    
    
    var processedQuestion = question.replace(regExpression4, "<br><br><mark class='questionHighLight'>$1) </mark>")
    .replace(regExpression, "<br><mark class='questionHighLight'>$1) </mark>")
    .replace(regExpression2, "<br><br>$1 ")
    .replace(regExpression3, "<br><br>$1 ");
    
   
   
    
   
    // var processedQuestion = processedQuestion.replace(regExpression2, "<br><br>$1 ");
    // console.log(processedQuestion);
    return processedQuestion;
  }

  preProcessingAnswer (answer) {
  
    // var regExpression1 = /([0-9]?\s\w+[^not]\scorrect[:]?.*[\.\)]?)/gi;
    var regExpression1 = /([\w]*[\(0-9•\)]+[\w]*)/gi;
    
    
    var regExpression2 = /([\(\s?[0-9]+[\.\)]\s?)/gi;

    var regExpression3a = /(•)/gi;
    var regExpression3b = /(•)/gi;
    var regExpression3 = regExpression3a || regExpression3b;
    // var regExpression4 = /(\([a-zivx•]\))/gi;
    var regExpression4 = /(\([a-z0-9ivx\-]+\))/gi;
    

  
    
    var replacedData = answer.replace(regExpression1, "<mark class='correctHighLight'>$1</mark>");
    replacedData = replacedData.replace(regExpression2, "<mark class='answerHighLight'>$1</mark>");
    replacedData = replacedData.replace(regExpression3, "<br>$1");
    replacedData = replacedData.replace(regExpression4,  "<mark class='romanAnswer'>$1</mark>");
    return replacedData;
  
  }

 
}




class TestMcq {
  constructor(mcqObject, prepMode, userName=""){
    this.mcqObject = mcqObject;
    this.prepMode = prepMode;
    this.userName = userName;
  }
}

// switch(expression) {
//   case x:
//     // code block
//     break;
//   case y:
//     // code block
//     break;
//   default:
//     // code block
// }


// 