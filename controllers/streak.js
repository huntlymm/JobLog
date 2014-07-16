var Streak = require('streakapi'),
    Promise = require('bluebird'),
    config = require('../config/index');

var apiKey = config.streakApiKey;
Streak.init(apiKey);

// Get user's pipelines, assume only 1 exists and it's career search
var findPipelines = function() {
  return new Promise(function(resolve, reject) {
    Streak.Pipelines.getAll(resolve, reject);
  });
};

//create new box
var newBox = function(userInput, pipelineKey){
  return new Promise(function(resolve, reject) {
    var boxData = {name: userInput.name, notes: userInput.notes, stageKey: userInput.stageKey};
    Streak.Boxes.create(pipelineKey, boxData, resolve, reject);
  });
};

// update/add a field to the box
var addField = function(fieldData, boxKey) {
  return new Promise(function(resolve, reject) {
    Streak.Boxes.Fields.update(boxKey, fieldData, resolve, reject);
  });
};

exports.createNewBox = function(input, cb) {
  console.log('inputted info');
  console.log(input);
  findPipelines().then(function(data){
    console.log('pipeline data..');
    console.log(data[0].pipelineKey);
    newBox(input, data[0].pipelineKey)
      .then(function(savedBox){
        console.log('savedBox');
        console.log(savedBox);

        var fieldPromiseArr;
        //have to add each field individually, per Streak API
        fieldPromiseArr = input.fields.map(function(field){
          return addField(field, savedBox.boxKey);
        });
        Promise.all(fieldPromiseArr)
          .then(function(boxFieldArr){
            console.log('this is the boxFieldArr');
            console.log(boxFieldArr);
            var savedPosition;
            boxFieldArr.forEach(function(boxField){
              if (boxField.key === "1003") {
                savedPosition = boxField.value;
              }
            });
            cb({status: true, position: savedPosition});
          });
        })
      .catch(function(err){
        cb({status: false, error: err});
      });
  });
};






