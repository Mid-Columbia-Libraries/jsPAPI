/** 
 * @module jsPAPI/configSet
 */

/**
 * Updates root config with given key:values
 *
 * @param {object} cfg - {{key:value},{key2:value2}}
 * 
 */

module.exports = function(parent) {
    parent.configSet = function(cfg) {
        // Loop through input params
        for(key in cfg) {
            // Save to root config
            parent._config[key] = cfg[key];
        }
    }
    return parent;
}