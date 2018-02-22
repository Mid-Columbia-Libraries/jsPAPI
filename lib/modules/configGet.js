/** 
 * @module jsPAPI/configGet
 */

/**
 * Returns value of root config with given key
 *
 * @param {string} key - the key to lookup, or 'all' to return all values
 * 
 * @returns {object} - the value or object of all values, or null if object not found
 * 
 */

module.exports = function(parent) {
    parent.configGet = function(key) {
        // Return full config
        if(key == 'all') {
            return parent._config;
        }
        // Otherwise return request key
        if(typeof(parent._config[key]) != 'undefined') return parent._config[key];
        // Or if not defined, return null
        return null;
    }
    return parent;
}