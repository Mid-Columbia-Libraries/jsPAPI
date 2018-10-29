/** 
 * @module patronItemsOutGet.js
 */

/**
 * Get a Patrons Items Out
 *
 * @param {int|string} Barcode          - The barcode of the User
 * @param {int|string} Password  				- The password of the User
 * @param {string} Satus								- The Status of the item
 * 
 * Satus can be one of the following: (ALL|OVERDUE|LOST)
 * 
 * @returns {promise}
 * 
 * @example myPapi.patronItemsOutGet(Barcode, Password)
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 *
 @example myPapi.patronItemsOutGet(Barcode, Password, Status)
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 */

module.exports = function(parent) {
    parent.patronItemsOutGet = function(barcode, password, status = 'all') {
        url = 'patron/' + barcode + '/itemsout/' + status;    		
        return parent.call( url,
            {  method: 'GET', "pass": password,});        
    }
    return parent;
}