const { createOrUpdateFile, defaultCMDInstruction } = require("../utils");
const defaultValue = require("../../lib/common/schema");


module.exports = () => {
  generateIndexFile()
  defaultCMDInstruction()
  process.exit(0);
}

function generateIndexFile() {
  defaultValue.paths.find(value => {
    if (Object.keys(value)[0] == '_app' || (Object.keys(value)[0] == '_server')) {
      const path = Object.values(value)
      const source = '../../' + defaultValue.root + path[0].source;
      const destination = path[0].destination;
      //isCommand is concept where if only app.js/.ts will copy with not route for any module
      createOrUpdateFile(source, destination, { isOnlyCopy: true, isCommand: true })
    }
  })
}

