{{^es}}
const app = require("./app")
const config = require("./config/env")
{{/es}}
{{#es}}
import app from "./app";
import config from "./config/env";
{{/es}}

const port = config[process.env.NODE_ENV || "local"].port

app.listen(port, function () {
  console.log(`App listening on http://localhost:${port}`)
})