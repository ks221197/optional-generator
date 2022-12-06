{
    "name": "boilerplate",
    "version": "1.0.0",
    "description": "",
    "main": "app.js",
    "scripts": {
        {{^ts}}
        "serve": "nodemon --exec babel-node src/server.js",
        "start": "node dist/server.js --watch",
        "build": "rm -rf dist && babel -s -d dist src"
        {{/ts}}
        {{#ts}}
        "serve": "nodemon --exec ts-node src/server.ts",
        "start": "ts-node src/server.ts",
        "build": "rm -rf dist/ && tsc"
        {{/ts}}
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "body-parser": "^1.20.0",
        "express": "^4.17.3",
        {{#mysql}}
        "mysql": "^2.18.1"
        {{/mysql}}
        {{#mongodb}}
        "mongoose": "^6.3.1"
        {{/mongodb}}
        {{#postgresql}}
        "pg": "^8.7.3"
        {{/postgresql}}
    },
    "devDependencies": {
        {{^ts}}
        "@babel/cli": "^7.8.4",
        "@babel/core": "^7.9.0",
        "@babel/preset-env": "^7.9.5",
        "@babel/node": "^7.16.8",
        {{/ts}} 
        {{#ts}}
        "@types/express": "^4.17.13",
        {{#mysql}}
        "@types/mysql": "^2.15.21",
        {{/mysql}}
        {{#postgresql}}
        "@types/pg": "^8.6.5",
        {{/postgresql}}
        "@types/node": "^17.0.23",
        "typescript": "^4.6.3", 
        "ts-node": "^10.7.0", 
        {{/ts}} 
        "nodemon": "^2.0.15"
    }
}