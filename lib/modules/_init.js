/** 
 * @module jsPAPI/_init
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

        // Initialize root config object
        parent._config = {};

        // Load essential .env config if it exists
        accessid = (typeof(process.env.PAPI_ACCESSID) != 'undefined') ? process.env.PAPI_ACCESSID : '';
        key      = (typeof(process.env.PAPI_KEY)      != 'undefined') ? process.env.PAPI_KEY      : '';
        server   = (typeof(process.env.PAPI_SERVER)   != 'undefined') ? process.env.PAPI_SERVER   : '';
        domain   = (typeof(process.env.PAPI_DOMAIN)   != 'undefined') ? process.env.PAPI_DOMAIN   : '';

        // Extra config options
        appid    = (typeof(process.env.PAPI_APPID)    != 'undefined') ? process.env.PAPI_APPID    : '100';
        orgid    = (typeof(process.env.PAPI_ORGID)    != 'undefined') ? process.env.PAPI_ORGID    : '1';
        scheme   = (typeof(process.env.PAPI_SCHEME)   != 'undefined') ? process.env.PAPI_SCHEME   : 'https://';
        path     = (typeof(process.env.PAPI_PATH)     != 'undefined') ? process.env.PAPI_PATH     : 'PAPIService/REST';
        version  = (typeof(process.env.PAPI_VERSION)  != 'undefined') ? process.env.PAPI_VERSION  : 'v1';
        lang     = (typeof(process.env.PAPI_LANG)     != 'undefined') ? process.env.PAPI_LANG     : '1033';
        encode   = (typeof(process.env.PAPI_ENCODE)   != 'undefined') ? process.env.PAPI_ENCODE   : 'application/json';
        accept   = (typeof(process.env.PAPI_ACCEPT)   != 'undefined') ? process.env.PAPI_ACCEPT   : 'application/json';
        logging  = (typeof(process.env.PAPI_LOGGING)  != 'undefined') ? process.env.PAPI_LOGGING  : true;
        authlevel = (typeof(process.env.PAPI_AUTHLEVEL) != 'undefined') ? process.env.PAPI_AUTHLEVEL   : 'all';

        // Set some sane defaults
        var defaults = {
            accessid: accessid,
            key: key,
            server: server,
            domain: domain,
            appid: appid,
            orgid: orgid,
            scheme: scheme,
            path: path,
            version: version,
            authlevel: authlevel,
            lang: lang,
            encode: encode,
            accept: accept,
            logging: logging,
            pass: false,
            token: false,
            auth: 'public',
            method: 'GET',
        }
        
        // Merge custom config over defaults
        for(key in defaults) {
            cfg[key] = (typeof(cfg[key]) == 'undefined') ? defaults[key] : cfg[key];
        }

        // Save the initTime
        cfg.initTime = parent._polarisDate();

        // Save combined config
        parent.configSet(cfg);

        return true;
    }
    return parent;
}