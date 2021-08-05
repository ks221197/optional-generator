const { createOrUpdateFile } = require("../utils");
const defaultValue = require("../../lib/common/schema");


module.exports = () => {
  generateApplicationFiles()
  process.exit(0);
}

function generateApplicationFiles() {
  defaultValue.paths.find(value => {
    if (Object.keys(value)[0] == '_app') {
      const path = Object.values(value)
      const source = '../../' + defaultValue.root + path[0].source;
      const destination = path[0].destination.replace('{{moduleName}}', 'index');
      createOrUpdateFile(source, destination, {isOnlyCopy:false,isCommand:true})
    }
  })
}

