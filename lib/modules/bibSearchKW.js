/** 
 * @module Papi/bibSearchKW
 */

/**
 * A simplified search interface accepting a Type:Value pair
 *
 * @param {string} search   - The search term
 * @param {string} kw       - KW|TI|AU|SU|NOTE|PUB|GENRE|SE|ISBN|ISSN|LCCN|PN|LC|DD|LOCAL|SUDOC|CODEN|STRN|CN|BC
 * @param {int|string} page - the search result page to return
 * @param {int|string} per  - number of results per page
 * 
 * @returns {promise}
 * 
 * @example myPapi.bibSearchKW('dogs', 'KW').then(function(response){ });
 */

module.exports = function(parent) {
    parent.bibSearchKW = function(search, kw = 'KW', page = 1, per = 10) {
        return parent.call( 'search/bibs/keyword/' + kw.toUpperCase() + '?q=' + search + '&page=' + page + '&bibsperpage=' + per );
    }
    return parent;
}