
const path = require('path');
const BASE_URL = process.env.NODE_ENV === 'production' ? '/public/' : '/'
module.exports = {
  publicPath: BASE_URL,  //   部署应用包时的基本 URL
}
