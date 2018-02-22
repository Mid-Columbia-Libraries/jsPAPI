/** 
 * @module jsPAPI.limitFiltersGet
 */

/**
 * Returns the limit filters that this Polaris API understands
 * 
 * This method does not appear to be very useful to me,
 * there are tons of other filters that seem to work
 *
 * @returns {promise}
 * 
 * @example myPapi.limitFiltersGet()
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 * 
 */
module.exports = function(parent) {
    parent.limitFiltersGet = function() {
        return parent.call('limitfilters');
    }
    return parent;
}