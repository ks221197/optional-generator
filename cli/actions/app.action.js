const { createOrUpdateFile, defaultCMDInstruction } = require("../utils");
const defaultValue = require("../../lib/common/schema");


module.exports = () => {
  generateIdexFile()
  defaultCMDInstruction()
  process.exit(0);
}

function generateIdexFile() {
  defaultValue.paths.find(value => {
    if (Object.keys(value)[0] == '_app') {
      const path = Object.values(value)
      const source = '../../' + defaultValue.root + path[0].source;
      const destination = path[0].destination;
      createOrUpdateFile(source, destination, { isOnlyCopy: true, isCommand: true })
    }
  })
}

