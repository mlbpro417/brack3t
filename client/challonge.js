const challonge = require('challonge');
const API_KEY = require('../api_key');

const challongeClient = challonge.createClient({
  apiKey: API_KEY,
});

exports.challongeClient = challongeClient;
