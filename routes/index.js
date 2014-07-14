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
  input.fields.push({key: '1001', value: req.body.nextsteps});
  input.fields.push({key: '1002', value: req.body.connection});
  input.fields.push({key: '1003', value: req.body.position});
  input.fields.push({key: '1004', value: req.body.tier});

  streak.createNewBox(input);
  res.render('index', { title: 'Express' });
});

router.get('/find', function(req, res) {
  streak.findBox();
  res.render('index', { title: 'Express' });
});

router.get('/findpipelines', function(req, res) {
  streak.findPipelines();
  res.render('index', { title: 'Express' });
});

module.exports = router;
