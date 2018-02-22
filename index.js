/***
 * index.js is an entry wrapper that calls the actual entry point ./lib/jsPAPI.js
 * Webpack will build directly from ./lib/jsPAPI.js, so only include code here
 * that you want to exlusively run on NodeJS installs, fx. dotenv
 */

// Loads environment variables such as server config, see ./.env
require('dotenv').config();

// Load the main module
jsPAPI = require('./lib/jsPAPI')();

// Set export for NodeJS
module.exports = jsPAPI;
