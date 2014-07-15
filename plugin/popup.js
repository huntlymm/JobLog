var companyName,
    positionName,
    listing_url,
    notesContent,
    allData = {};

//Populate job data from page into popup form
function setJobData() {
  var company = document.getElementById('company-name');
  company.value = companyName;
  var position = document.getElementById('position');
  position.value = positionName;
  var url = document.getElementById('url');
  url.innerText = listing_url;
  var notes = document.getElementById('notes');
  notes.value = notesContent;
}

//Listen for job data sent from send_data js
chrome.extension.onRequest.addListener(function(jobData) {
  companyName = jobData.companyName;
  positionName = jobData.position;
  listing_url = jobData.url;
  notesContent = jobData.notes;
  setJobData();
});




// Inject data.js into all frames in the active tab
window.onload = function() {
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'send_data.js', allFrames: true});
    });
  });
};
