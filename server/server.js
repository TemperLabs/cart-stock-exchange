const data = require('./db/data.json')
const names = require('./db/names.json')

module.exports = () => ({
  list: data,
  names: names
})
