var jobData = {};

//Get relevant job data from job listing html
jobData.companyName = document.getElementsByClassName("profile-link")[0].textContent;

var fullPosition = document.title.toString();
jobData.position = fullPosition.slice(0,fullPosition.indexOf('job')-1);

jobData.url = location.href;

var jobLocations = document.getElementsByClassName("locations");
var jobLocation;

if (typeof jobLocations[0] !== "undefined") {
  jobLocation = jobLocations[0].textContent;
}

var salary = document.getElementsByClassName("salary")[0].textContent;

salary = salary.replace("Salary", "").replace(/\n/g, "");

jobData.notes = "Location: " + jobLocation + "\n" + "Comp: " + salary;

console.log(jobData);

//send job data to popup.js
chrome.extension.sendRequest(jobData);