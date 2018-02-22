/** 
 * @module jsPAPI._log
 */

/**
 * Dumps input to console
 *
 * @param {anything} dump - whatever you want to dump
 * 
 * @returns {boolean} true if logging enabled, otherwise false
 * 
 * @example myPapi.bibSearchKW('dogs', 'KW').then(function(response){ });
 */

module.exports = function(parent) {
    parent._log = function(dump, type = 'log') {
        if(parent._config.logging) {
            console[type](parent._polarisDate);
            console[type](dump);
            console[type]();
            return true;
        }
        return false;
    }
    return parent;
}