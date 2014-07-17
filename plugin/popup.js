var company_name,
    positionName,
    listing_url,
    notesContent,
    allData = {};

//Populate job data from page into popup form
function setJobData() {
  var company = document.getElementById('companyName');
  company.value = company_name;
  var position = document.getElementById('position');
  position.value = positionName;
  var url = document.getElementById('url');
  url.value = listing_url;
  var notes = document.getElementById('notes');
  notes.value = notesContent;
}

//Listen for job data sent from send_data js
chrome.extension.onRequest.addListener(function(jobData) {
  company_name = jobData.companyName;
  positionName = jobData.position;
  listing_url = jobData.url;
  notesContent = jobData.notes;
  setJobData();
});

// Inject send_data.js into all frames in the active tab
window.onload = function() {
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'send_data.js', allFrames: true});
    });
  });
};



function saveJob(job, callback) {
  console.log('saveJob run');

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        console.log('status = 200');
        var data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        console.log('status DOES NOT = 200');
        callback(null);
      }
    }
  };


  var url = 'http://limitless-reaches-6594.herokuapp.com/create-pursuit';
  xhr.open('POST', url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(job));
};


$(document).ready(function() {
  $("#jobForm").submit(function(event){
    event.preventDefault();

    //Set stage to warm lead if connection exists, else it's a cold lead
    var stageKey;
    connection.value === "" ? stageKey = 5001 : stageKey = 5002;

    //create and send job JSON to back streak API layer
    var finalJob = {
      name: companyName.value,
      notes: notes.value,
      connection: connection.value,
      position: position.value,
      tier: tier.value,
      url: url.value,
      stageKey: stageKey
    };
    console.log(finalJob);

    //add spinner while waiting for response from server
    $("#jobForm").fadeOut(function(){
      $(".spinner").fadeIn();
    });
    saveJob(finalJob, function(data){
      console.log('this is the returned data from the API layer');
      console.log(data);
      if (data.status === true) {
        $(".spinner").fadeOut(function(){
          $("body").css("min-height", "0px");
          $("#status").text("The position " + data.position + " was saved").show();
        });
      }
    });
  });
});
