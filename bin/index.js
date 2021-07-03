#!/usr/bin/env node


const { Command } = require('commander'); 
var path = require('path')
const fs = require("fs")
const mustache = require('mustache');
var mkdirp = require('mkdirp')

const program = new Command();
var MODE_0755 = parseInt('0755', 8)
var currentDir='.'

  function makeFolder (base, folder) {
    var loc = path.join(base, folder)
    console.log('   \x1b[36mcreate\x1b[0m : ' + loc + path.sep)
    mkdirp.sync(loc, MODE_0755)
  }

  function copyFile(from, to){
   if(!fs.existsSync(to))
   {
    console.log('   \x1b[33madd\x1b[0m : ' + to + path.sep);
    fs.copyFileSync(from,to , (err) => {
      if (err) { console.log(err); } 
     });
   } 
   else console.log('   \x1b[34mexists\x1b[0m : ' + to + path.sep);
  }

  function writeFile(from, to,moduleName){
    if(!fs.existsSync(to))
    {
      console.log('   \x1b[33mupdate\x1b[0m : ' + to + path.sep);
      const template = fs.readFileSync(from).toString();
      let content = mustache.render(template, {
        constName: capitalizeFirstLetter(moduleName),
        fileName: moduleName
      }); 
      fs.writeFileSync(path.resolve(to), content, (err) => {
        if (err) {
            console.log(err);
        }
    });   
    } 
    else console.log('   \x1b[34mexists\x1b[0m : ' + to + path.sep);
   }

  function addOrUpdateFile(base,folderPath,fileName,copyFilePath,isFile=false,moduleName='') {
    try {
      base= base?base:currentDir
      const destinationPath=path.join(base, folderPath)
      if (!fs.existsSync(destinationPath) && !isFile) {
        makeFolder(currentDir,folderPath)
      } 
      if(copyFilePath) {
        if(moduleName)
        {
          writeFile(path.resolve(copyFilePath),path.resolve(isFile?destinationPath:path.join(destinationPath,fileName)),moduleName)
        }
        else copyFile(path.resolve(copyFilePath),path.resolve(isFile?destinationPath:path.join(destinationPath,fileName)))
      }
    } catch(e) {
      console.log(e);
      console.log("Please try again...")
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function createModule(moduleName,optionValue) {
    moduleName=moduleName?moduleName:'index'
    
    if (optionValue.all || optionValue.app) {
      //app.js
      addOrUpdateFile(currentDir,'app.js','app.js',path.resolve(__dirname, '../templates/app'),true,moduleName)
    }

    if (optionValue.all || optionValue.module) {
      //controller ,service and route
      addOrUpdateFile(currentDir,'src/controllers',moduleName+'.controller.js',path.resolve(__dirname, '../templates/controller'),false,moduleName)
      addOrUpdateFile(currentDir,'src/services',moduleName+'.service.js',path.resolve(__dirname, '../templates/service'),false,moduleName)
      addOrUpdateFile(currentDir,'src/routes',moduleName+'.route.js',path.resolve(__dirname, '../templates/route'),false,moduleName)
    }

    if (optionValue.all || optionValue.helper) {
      //helpers
      addOrUpdateFile(currentDir,'src/helper','constant.js',path.resolve(__dirname, '../templates/constant.js'))
      addOrUpdateFile(currentDir,'src/helper','responseHandler.js',path.resolve(__dirname, '../templates/responseHandler.js'))
    }

    if (optionValue.all || optionValue.config) {
      //mysql config
      addOrUpdateFile(currentDir,'src/config','database.js',path.resolve(__dirname, '../templates/database.js'))
    }

    console.log('   \x1b[31m\x1b[4mNOTES  : Must include these package in your project\x1b[0m '+'\n\n'+
                '   --------> \x1b[1mnpm install express body-parser mysql --save && npm install nodemon --save-dev\x1b[0m \n' );

  }

// program
// .version('1.0.0')
//   .option('    --git', 'add .gitignore')
//   .option('-c, --collect <value>', 'repeatable value', collect, [])
//   .option('   --create [module_name]', 'make whole module', createModule,'index')

  program
  .name('generator')
  .arguments('[moduleName]')
  .usage('Crud generator')
  .option('-all, --all', 'Generates boilerplate')
  .option('-m, --module', 'Generates only controller,Service and route with given module name(default: index)')
  .option('-hp, --helper', 'Generate only helper folder(responseHandler.js/constant.js)')
  .option('-c, --config', 'Generate only config folder(database,js)')
  .option('-a, --app', 'Generate only app.js file')
  .action(function(moduleName,options) {
    createModule(moduleName, options);
  })
  .parse(process.argv);

// if (process.argv.length < 3) {
//   program.help();
// }


// // Try the following:
// //    node arguments.js --help
// //    node arguments.js user
// //    node arguments.js user secret
