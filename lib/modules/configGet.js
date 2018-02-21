/** 
 * @module jsPAPI/configGet
 */

/**
 * Returns value of root config with given key
 *
 * @param {object} key - the key to lookup
 * 
 * @returns {variable} the value
 * 
 */

module.exports = function(parent) {
    parent.configGet = function(key) {
        // Return full config
        if(key == 'all') {
            return parent._config;
        }
        // Otherwise return request key
        return parent._config[key];
    }
    return parent;
}