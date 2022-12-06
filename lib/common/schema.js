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
    choices: ['MySQL', 'MongoDB', 'PostgreSQL', 'TypeORM'],
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
        "source": "config/_database.js",
        "destination": "src/config/database.js",
        "isOnlyCopy": true
      }
    },
    {
      "_env": {
        "source": "config/_env.js",
        "destination": "src/config/env.js",
        "isOnlyCopy": true
      }
    },
    {
      "_constant": {
        "source": "helper/_constant.js",
        "destination": "src/helper/constant.js",
        "isOnlyCopy": true
      }
    },
    {
      "_responseHandler": {
        "source": "helper/_responseHandler.js",
        "destination": "src/helper/responseHandler.js",
        "isOnlyCopy": true
      }
    },
    {
      "_app": {
        "source": "application/_app.js",
        "destination": "src/app.js",
        "isOnlyCopy": true
      }
    },
    {
      "_server": {
        "source": "application/_server.js",
        "destination": "src/server.js",
        "isOnlyCopy": true
      }
    },
    {
      "_model": {
        "source": "model/_model.js",
        "destination": "src/models/users.model.js",
        "isOnlyCopy": true
      }
    },
    {
      "_babel": {
        "source": "bundler/.babelrc",
        "destination": ".babelrc",
        "isOnlyCopy": false
      }
    },
    {
      "_tsc": {
        "source": "bundler/tsconfig.json",
        "destination": "tsconfig.json",
        "isOnlyCopy": false
      }
    },
    {
      "_interface": {
        "source": "interface/common.interface.js",
        "destination": "src/interface/common.interface.js",
        "isOnlyCopy": true
      }
    },
    {
      "package": {
        "source": "package.js",
        "destination": "package.json",
        "isOnlyCopy": true
      }
    }
  ],
  scriptType: {
    name: "script",
    message: "Which programming language would you like to use?",
    choices: ['TypeScript', 'JavaScript'],
    es:{
      name: "es",
      message: "Do you want ECMA Script support?",
      choices: ['yes', 'no'],
    }
  }
}