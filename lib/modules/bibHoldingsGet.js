/** 
 * @module bibHoldingsGet
 */

/**
 * Returns holdings information for a specified bibliographic record.
 *
 * @param {integer} id - The bibligraphic ID you want to load
 * 
 * @returns {promise}
 * 
 * @example myPapi.bibHoldingsGet('123456')
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 */
module.exports = function(parent) {
    parent.bibHoldingsGet = function(id) {
        return parent.call(
            'bib/' + id + '/holdings'
        );
    }
    return parent;
} 