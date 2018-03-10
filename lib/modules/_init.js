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

        let defaults = {
            'key':      'SUPERSEC-RETC-0DES-D0NT-PUBL1SH0NWEB',
            'accessid': 'MyAccessID',
            'server':   'catalog.mylibrary.org',
            'domain':   'MY-DOMAIN',
            'appid':    '100',
            'orgid':    '1',
            'scheme':   'https',
            'path':     'PAPIService/REST',
            'version':  'v1',
            'lang':     '1033',
            'encode':   'application/json',
            'accept':   'application/json',
            'auth':     'public',
            'authlvl':  'public',
            'logging':  true,
            'token':    null,
            'pass':     null,
            'method':   'GET',
        }

        for(key in defaults) {
            // Merge env config
            cfg[key] = (typeof(parent._config[key]) == 'undefined') ? parent._config[key] : cfg[key];
            // Merge custom init config
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