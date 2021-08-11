- Generates boilerplate for nodejs with express framework in MVC structure 
- Makes database configuration with MySQL, mongoDB, PostgreSQL based on selected options.
- Also generates only database configuration, helper or index file as per option provided.
- This package will not run any database migration commands. [database commands](#database-commands)
#### New features
- Generates CRUD with MySQL, MongoDB, PostgreSQL database configuration

### File structure

    .
    ├── ...                   
    ├── src                          # Source files 
        ├── config                   # Configuration files
        ├── controllers              # Controller files
        ├── routes                   # Route files
        ├── services                 # Service files
        ├── helper                   # utils,constant files  
    ├── app.js
    └── ...

## Installation

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install optional-generator
```
This package also contains CLI command, to use CLI command - install package globally.
```bash
$ npm install optional-generator -g
```

## Usage

| Commands  | Options | Inputs  | Default | Description  | 
| ------------- | ------------- | ------------- | ------------- | ------------- | 
| new  | -d  | Module name, Database type  | Index  | Generates application with provided name and database type  | 
| module  | -d  | Module name, Database type  | Index  | Generates CRUD with provided name and database type  | 
| helper  | -  | -  | -  | Generate common useful files(responseHandler.js/constant.js)  | 
| database  | -  | Database type  | -  | Generate database configuration file(database,js)  | 
| app  | -  | -  | -  | Generate application root file  |

<br />

**With CLI command**

Install package globally
```bash
$ npm install optional-generator -g
```

Create new application:

```bash
$ hyung n user
$ hyung n user -d mongodb
```

Create only module files(controller ,service and route):

```bash
$ hyung m user
```
Create only helper files:

```bash
$ hyung hp
```

Create only database configuration files:

```bash
$ hyung c
```
Create only index file(app.js):

```bash
$ hyung a
```

### Install package locally/ Directory level


```bash
$ npm init -y 
$ npm install optional-generator -s
```

Write script in **package.json** with option you want to provide.

```
"scripts": {
    "create": "hyung n"
},
```

or directly run command on terminal

```
$ npx hyung n -d mysql
```

Run script to create app.js(with or without custom module name)

```bash
$ npm run create 
```
 or
```bash
$ npm run create user
```

---

Start the server:

```bash
$ node app.js
```
or
```bash
$ nodemon app.js
```

View the website at: http://localhost:3000


### Database commands 

**MongoDB**
```
> show dbs
> use boilerplate
> db.boilerplate.insert({ name: "Park" })
> show collections
```

**MySQL**
```
CREATE DATABASE boilerplate;

CREATE TABLE `users` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL
) 
```

**PostgreSQL**
```
CREATE DATABASE boilerplate;

CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(50) NOT NULL
);
```