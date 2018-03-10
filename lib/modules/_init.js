/** 
 * @module _init
 */

/**
 * Do initial setup stuff, for example reading config from .env and merging with custom params
 * 
 * @param {object} cfg - pass in any config values you want to override defaults
 * 
 * @returns {boolean} - true for success, false for failure
 * 
 */

module.exports = function(parent) {
    parent._init = function(cfg = {}) {

        // Merge custom config over defaults
        for(key in parent._config) {
            cfg[key] = (typeof(cfg[key]) == 'undefined') ? parent._config[key] : cfg[key];
        }

        // Save the initTime
        cfg.initTime = parent._polarisDate();

        // Save combined config
        parent.configSet(cfg);
        
        return true;
    }
    return parent;
}