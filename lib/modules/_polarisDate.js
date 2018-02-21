/** 
 * @module Papi/_polarisDate
 */

/**
 * Get date formated to RFC-1123.
 *
 * @returns {string} - RFC-1123 formatted
 */

module.exports = function(parent) {
    parent._polarisDate = function() {
        return new Date().toUTCString();
    }
    return parent;
}