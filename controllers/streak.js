var Streak = require('streakapi'),
    Promise = require('bluebird'),
    config = require('../config/index');

var apiKey = config.streakApiKey;
Streak.init(apiKey);

//Dummy callbacks

var finalCB = function(updatedBoxData) {
  console.log('this is the data');
  console.log(updatedBoxData);
};

var errCB = function(err) {
console.log('this is the err');
console.log(err);
};

// Get user's pipelines, assume only 1 exists and it's career search
var findPipelines = function() {
  return new Promise(function(resolve, reject) {
    Streak.Pipelines.getAll(resolve, reject);
  });
};

//create new box
var newBox = function(userInput, pipelineKey){
  return new Promise(function(resolve, reject) {
    var boxData = {name: userInput.name, notes: userInput.notes};
    Streak.Boxes.create(pipelineKey, boxData, resolve, reject);
  });
};

// update/add a field to the box
var addField = function(fieldData, boxKey) {
    Streak.Boxes.Fields.update(boxKey, fieldData, finalCB, errCB);
};

exports.createNewBox = function(input) {
  console.log('inputted info');
  console.log(input);
  findPipelines().then(function(data){
    console.log('pipeline data..');
    console.log(data[0].pipelineKey);
    newBox(input, data[0].pipelineKey).then(function(savedBox){
      console.log('savedBox');
      console.log(savedBox);
      //have to add each field individually, per Streak API
      input.fields.forEach(function(field){
        addField(field, savedBox.boxKey);
      });
    });
  });
};






