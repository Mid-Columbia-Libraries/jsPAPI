/** 
 * @module Papi/bibHoldingsGet
 */

/**
 * Returns holdings information for a specified bibliographic record.
 *
 * @param {integer} id - The bibligraphic ID you want to load
 * 
 * @returns {promise}
 * 
 * @example myPapi.bibGet('1314713').then(function(response){ });
 */
module.exports = function(parent) {
    parent.bibHoldingsGet = function(id) {
        return parent.call(
            'bib/' + id + '/holdings'
        );
    }
    return parent;
} 