var devConfig = require('./index');

module.exports = {
  streakApiKey: process.env.STREAK_KEY ||
                devConfig.streakApiKey
};
