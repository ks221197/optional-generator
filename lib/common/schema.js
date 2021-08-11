module.exports = {
  root: 'lib/',
  module: {
    name: "name",
    message: "What name would you like to use for the new module?",
    defaultName: "index",
    name_reqex: /^(?!.*\/\/)[A-Za-z][A-Za-z0-9_]*$/g,
    error_message: 'Please enter a valid module name (eg:user ,user123 ,user_123)',
  },
  database: {
    name: "type",
    message: "What database type would you like to use for this application?",
    choices: ['MySQL', 'MongoDB', 'PostgreSQL'],
  },
  paths: [
    {
      "_controller": {
        "source": "module/_controller.js",
        "destination": "src/controllers/{{moduleName}}.controller.js",
        "isOnlyCopy": true
      }
    },
    {
      "_service": {
        "source": "module/_service.js",
        "destination": "src/services/{{moduleName}}.service.js",
        "isOnlyCopy": true
      }
    },
    {
      "_route": {
        "source": "module/_route.js",
        "destination": "src/routes/{{moduleName}}.route.js",
        "isOnlyCopy": true
      }
    },
    {
      "_database": {
        "source": "database/_database.js",
        "destination": "src/config/database.js",
        "isOnlyCopy": true
      }
    },
    {
      "_constant": {
        "source": "helper/_constant.js",
        "destination": "src/helper/constant.js",
        "isOnlyCopy": false
      }
    },
    {
      "_responseHandler": {
        "source": "helper/_responseHandler.js",
        "destination": "src/helper/responseHandler.js",
        "isOnlyCopy": false
      }
    },
    {
      "_app": {
        "source": "application/_app.js",
        "destination": "app.js",
        "isOnlyCopy": true
      }
    },
    {
      "_model": {
        "source": "model/_model.js",
        "destination": "src/models/users.model.js",
        "isOnlyCopy": true
      }
    }
  ],
}