Generates boilerplate for nodejs with express framework in MVC structure and configuration of mysql.Also generates only configuration, helper or index file as per option provided.

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

**With CLI command**

Install package globally
```bash
$ npm install optional-generator -g
```

_**Options:**_
  *  **-all**   :Generates boilerplate
  *  **-m**     :Generates only controller,Service and route with given module name(default: index)
  *  **-hp**    :Generate only helper folder(responseHandler.js/constant.js)
  *  **-c**     :Generate only config folder(database,js)
  *  **-a**     :Generate only app.js file


Create whole app:

```bash
$ hyung user -all
```

Create only module files(controller ,service and route):

```bash
$ hyung user1 -m
```
Create only helper files:

```bash
$ hyung -hp
```

Create only configuration files:

```bash
$ hyung -c
```
Create only index file(app.js):

```bash
$ hyung -a
```

Install dependencies:

```bash
$ npm install express body-parser mysql --save && npm install nodemon --save-dev
```


**With script**

Install package locally

```bash
$ npm install optional-generator -s
```

Write script in **package.json** with option you want to provide.

```
"scripts": {
    "create": "hyung user --all"
},
```

Run script to create app.js

```bash
$ npm run create
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
