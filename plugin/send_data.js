var jobData = {};
var pullData = {};
var fullPosition;
var jobLocation;
var salary;

//Define current page's site, to choose appropriate scraper//
var baseUrl = location.host.replace(/www./,"");
var site = baseUrl.slice(0,baseUrl.indexOf("."));
if (baseUrl === "careers.stackoverflow.com") {
  site = "stackoverflow";
}

// Page scrape functions //
var getCompany = function(companyClass, arrIndex){
  jobData.companyName = document.getElementsByClassName(companyClass)[arrIndex].textContent;
};

var getPosition = function(pageTitleWordBreak) {
  fullPosition = document.title.toString();
  jobData.position = fullPosition.slice(0,fullPosition.indexOf('pageTitleWordBreak'));
};

var getUrl = function() {
  jobData.url = location.href;
};

var getLocation = function(locationClass) {
  var jobLocations = document.getElementsByClassName(locationClass);
  if (typeof jobLocations[0] !== "undefined") {
    jobLocation = jobLocations[0].textContent;
  }
};

var getSalary = function(salaryClass) {
  salary = document.getElementsByClassName(salaryClass)[0].textContent;
  salary = salary.replace("Salary", "").replace(/\n/g, "");
};

// Website Specific Scraper Functions //
pullData.angel = function() {
  getCompany("profile-link", 0);
  getPosition(' job');
  getUrl();
  getLocation("locations");
  getSalary("salary");
  jobData.notes = "Location: " + jobLocation + "\n" + "Comp: " + salary;
};

//LinkedIn functionality not working- code runs 2x-3x when popup is loaded, need to debug
pullData.linkedin = function() {
  console.log('on linked in');
  getPosition(' at');
};

pullData.stackoverflow = function() {
  getCompany("employer", 0);
  getPosition(' at');
  getUrl();
  jobData.notes = "";
};

pullData.jobs = function() {
  getPosition(' at');
}

//Run scraper, send job data to popup.js
pullData[site]();
chrome.extension.sendRequest(jobData);