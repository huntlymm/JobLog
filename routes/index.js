var express = require('express');
var router = express.Router();
var streak = require('../controllers/streak');

/* GET home page. */
router.get('/', function(req, res) {
  // streak.createBox();
  res.render('index', { title: 'Express' });
});

router.post('/create-pursuit', function(req, res) {
  console.log('this is the request body');
  //request should look like this:
  // { name: 'facebook',
  // notes: 'social media giant',
  // nextsteps: 'email my connect',
  // connection: 'mark zuckerberg',
  // position: 'product manager',
  // tier: 'top' }
  console.log(req.body);
  var input = {fields: []};
  input.name = req.body.name;
  input.notes = req.body.notes;
  input.stageKey = req.body.stageKey;
  input.fields.push({key: '1001', value: req.body.nextsteps});
  input.fields.push({key: '1002', value: req.body.connection});
  input.fields.push({key: '1003', value: req.body.position});
  input.fields.push({key: '1004', value: req.body.tier});
  input.fields.push({key: '1005', value: req.body.url});

  streak.createNewBox(input, function(status) {
    console.log('sending back response now')
    res.send(status);
  });
});

module.exports = router;
