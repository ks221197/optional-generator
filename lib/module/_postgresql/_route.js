
var express = require('express');
var router = express.Router();
var {{constName}}Controller = require('../controllers/{{fileName}}.controller')

const {{fileName}}Controller=new {{constName}}Controller(); 

router.get('/',  (req, res)=> { {{fileName}}Controller.get(req).then(function (data) {res.send(data)}) });
router.get('/:id',  (req, res)=> { {{fileName}}Controller.getById(req).then(function (data) {res.send(data)}) });
router.post('/',  (req, res)=> { {{fileName}}Controller.create(req).then(function (data) {res.send(data)}) });
router.put('/:id',  (req, res)=> { {{fileName}}Controller.update(req).then(function (data) {res.send(data)}) });
router.delete('/:id',  (req, res)=> { {{fileName}}Controller.delete(req).then(function (data) {res.send(data)}) });


module.exports = router
