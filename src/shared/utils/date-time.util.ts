const { format } = require('date-fns');

function getCurrentServerDateTime() {
  const now = new Date();
  return format(now, 'yyyy-MM-dd HH:mm:ss');
}

module.exports = {
  getCurrentServerDateTime,
};