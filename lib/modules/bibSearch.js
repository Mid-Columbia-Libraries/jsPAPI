/** 
 * @module bibSearch
 */

/**
 * A more robust search method
 *
 * @param {string|array} terms  - either a literal string or an array of the form [[bool, filter, value],['AND', 'AU', 'Tolkien'], ...]
 * @param {int|string} page     - the search result page to return
 * @param {int|string} per      - number of results per page
 * @param {string|array} [limit]
 * @param {string|array} [ccl]
 * 
 * @returns {promise}
 * 
 * @example myPapi.bibSearch('KW=dogs')
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 * 
 * @example myPapi.bibSearch([['AND','AU','Tolkien'],['NOT','TI','Hobbits']])
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 */

module.exports = function(parent) {
    parent.bibSearch = function(terms, page = 1, per = 10, limit = false, ccl = false) {
        var url = 'search/bibs/boolean?q='
        // If a string was given, use as-is
        if(typeof(terms) == 'string') {
            url = url + terms;
        }
        // Otherwise, if an object was given split to key|value pairs
        else if(typeof(terms) == 'object') {
            for(var i = 0; i < terms.length; i++) {
                if(i==0) {
                    url += terms[i][1] + '=' + terms[i][2] + ' ';
                } else {
                    url += terms[i][0] + ' ' + terms[i][1] + '=' + terms[i][2] + ' ';
                }
            }
        }

        // Construct the call URL
        url = url + '&page=' + page + '&bibsperpage=' + per 

        // Perform the call
        return parent.call(url);
    }
    return parent;
}