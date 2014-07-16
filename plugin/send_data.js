var jobData = {};

//Get relevant job data from job listing html
jobData.companyName = document.getElementsByClassName("profile-link")[0].textContent;

var fullPosition = document.title.toString();
jobData.position = fullPosition.slice(0,fullPosition.indexOf('job')-1);

jobData.url = location.href;

var jobLocation = document.getElementsByClassName("locations")[0].textContent;

var salary = document.getElementsByClassName("salary")[0].textContent;

salary = salary.replace("Salary", "").replace(/\n/g, "");

jobData.notes = "Location: " + jobLocation + "\n" + "Comp: " + salary;

//send job data to popup.js
chrome.extension.sendRequest(jobData);