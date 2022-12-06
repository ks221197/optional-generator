{{^es}}
var express = require('express');
var {{classifyName}}Controller = require('../controllers/{{camelizeName}}.controller')
{{/es}}
{{#es}}
import express from "express";
import {{classifyName}}Controller from "../controllers/{{camelizeName}}.controller";
{{/es}}

var router = express.Router();
const {{camelizeName}}Controller=new {{classifyName}}Controller(); 

router.get('/',  (req, res)=> { {{camelizeName}}Controller.get().then(function (data) {res.send(data)}) });
router.get('/:id',  (req, res)=> { {{camelizeName}}Controller.getById(req).then(function (data) {res.send(data)}) });
router.post('/',  (req, res)=> { {{camelizeName}}Controller.create(req).then(function (data) {res.send(data)}) });
router.put('/:id',  (req, res)=> { {{camelizeName}}Controller.update(req).then(function (data) {res.send(data)}) });
router.delete('/:id',  (req, res)=> { {{camelizeName}}Controller.delete(req).then(function (data) {res.send(data)}) });


{{^es}}module.exports = router{{/es}}{{#es}}export default router{{/es}}
