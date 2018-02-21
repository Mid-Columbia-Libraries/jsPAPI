/** 
 * @module Papi/_log
 */

/**
 * Dumps input to console
 *
 * @param {anything} dump - whatever you want to dump
 * 
 * @example myPapi.bibSearchKW('dogs', 'KW').then(function(response){ });
 */

module.exports = function(parent) {
    parent._log = function(dump) {
        console.log(parent._polarisDate);
        console.log(dump);
        console.log();
    }
    return parent;
}