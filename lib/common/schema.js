module.exports = {
  root: 'lib/',
  name_reqex: /^(?!.*\/\/)[A-Za-z][A-Za-z0-9_]*$/g,
  error_message: 'Please enter a valid module name (eg:user ,user123 ,user_123)',

  module1: {
    name: "name",
    message: "What name would you like to use for the new module?",
    defaultName: "index",
    name_reqex: /^(?!.*\/\/)[A-Za-z][A-Za-z0-9_]*$/g,
    error_message: 'Please enter a valid module name (eg:user ,user123 ,user_123)',
  },
  databaseType: {
    name: "type",
    message: "What database type would you like to use for this application?",
    choices: ['MySQL', 'MongoDB', 'PostgreSQL'],
  },
  customDatabaseSetup: {
    name: "customSetup",
    message: "Do you want to setup custom database?",
    choices: ['Yes', 'No'],
    databaseName: {
      name: "dbName",
      message: "Provide database name",
      defaultName: "boilerplate",
    },
    tableName: {
      name: "tblName",
      message: "Provide table name",
      defaultName: "users",
    },
    columns: {
      name: "columns",
      message: "Please provide column names\x1b[33m(with comma(,) separate)\x1b[0m",
      defaultName: "id,name",
    },
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

  module: [
    //moduleName:
    {
      type: 'input',
      name: "name",
      message: "What name would you like to use for the new module?",
      default: "index",
      validate(value) {
        const isValid = value.match(module.exports.name_reqex);
        if (isValid) {
          return true;
        }
        return module.exports.error_message;
      },
    }],
  database: [
    //databaseType:
    {
      type: 'list',
      name: 'type',
      message: "What database type would you like to use for this application?",
      choices: ['MySQL', 'MongoDB', 'PostgreSQL'],
    },
    //setup:
    {
      type: 'confirm',
      name: "setup",
      message: "Do you want to setup custom database?",
    },
    //databaseName:
    {
      type: 'input',
      name: "dbName",
      message: "Provide database name",
      default: "boilerplate",
      // validate(value) {
      //   const pass = value.match(module.exports.module.name_reqex);
      //   if (pass) {
      //     return true;
      //   }
      //   return module.exports.module.error_message;
      // },
      when(answers) {
        return answers.setup;
      },
    },
    //tableName:
    {
      type: 'input',
      name: "tblName",
      message: "Provide table name",
      default: "users",
      when(answers) {
        return answers.setup;
      },
    },
    //columns:
    {
      type: 'input',
      name: "columns",
      message: "Please provide column names \x1b[33mwith comma(,) separate\x1b[0m\n\x1b[31mFirst value will be Primary key\x1b[0m",
      default: "id,name",
      when(answers) {
        return answers.setup;
      },
    },
  ]
}