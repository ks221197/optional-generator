
var express = require('express');
var router = express.Router();
var {{classifyName}}Controller = require('../controllers/{{camelizeName}}.controller')

const {{camelizeName}}Controller=new {{classifyName}}Controller(); 

router.get('/',  (req, res)=> { {{camelizeName}}Controller.get(req).then(function (data) {res.send(data)}) });
router.get('/:id',  (req, res)=> { {{camelizeName}}Controller.getById(req).then(function (data) {res.send(data)}) });
router.post('/',  (req, res)=> { {{camelizeName}}Controller.create(req).then(function (data) {res.send(data)}) });
router.put('/:id',  (req, res)=> { {{camelizeName}}Controller.update(req).then(function (data) {res.send(data)}) });
router.delete('/:id',  (req, res)=> { {{camelizeName}}Controller.delete(req).then(function (data) {res.send(data)}) });


module.exports = router
