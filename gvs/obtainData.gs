

function getDataRangesValuesArr(exams=[]) {

  var exams = exams;

  const dbValuesArr = [];
  var ssidArr = [];

  const ssidUpsc = "1SuoCQ4I2i7cykXmQL74pEm7Vqyc5UpBNw61XUCGZKKo";
  const ssidau20db  = "1CKf9Rh49Ofl_SFa8fbZGuIWAkZ2vCSAGbk71DKwgfNs";
  const ssidaj20db = "1vzSfPEclXzd-DnXEzrqk9yStPYY55oCgqNY2Lrpuvho";
  const ssidsn20db = "1XsHCxxSZf3vJm0pi1-MM0PNejTR-RXjIqBnjOKTqyus";

  if (exams.includes("ALL")) {
    ssidArr = [ssidUpsc,ssidau20db, ssidaj20db, ssidsn20db ];
  } else {
  if (exams.includes("UPSC")) {ssidArr.push(ssidUpsc)};
  if (exams.includes("aus")) {ssidArr.push(ssidau20db)};
  if (exams.includes("vaj")) {ssidArr.push(ssidaj20db)};
  if (exams.includes("vsn")) {ssidArr.push(ssidsn20db)};

  }


  
  

  


  

   // further new dbs can be added here.

  ssidArr.forEach(function(ssid) {
    const ss = SpreadsheetApp.openById(ssid);
    const ws = ss.getSheetByName("MASTER");
    const range = ws.getDataRange();
    const values = range.getValues();
    values.shift();
    values.forEach(function(row) {
      dbValuesArr.push(row);
    })


  })
  Logger.log(dbValuesArr.length);
  return dbValuesArr;


}