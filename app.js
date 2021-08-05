const express = require('express');
const bodyParser = require('body-parser');
{{#options.isCommand}}
const {{ classifyName }}Router = require('./src/routes/{{camelizeName}}.route')
{{/options.isCommand}}
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


{{#options.isCommand}}
app.use('/{{camelizeName}}', {{ classifyName }}Router, function (req, res, next) {
  next()
})
{{/options.isCommand}}


const port = 3000

app.listen(port, function () {
  console.log(`App listening on http://localhost:${port}`)
})

app.get('/', function (req, res) {
  res.send('Hello user!!!')
})