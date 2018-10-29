/** 
 * @module patronHoldRequestsGet
 */

/**
 * Get a Patrons Holds
 *
 * @param {int|string} Barcode          - The barcode of the User
 * @param {int|string} Password  				- The password of the User
 * @param {int|string} SatusOrId        - The status of the Holds or the ID of the individual hold.
 * 
 * Satus can be one of the following: (ALL|INACTIVE|PENDING|SHIPPED|HELD|NOTSUPPLIED|UNCLAIMED|EXPIRED|CANCELLED)
 * 
 * @returns {promise}
 * 
 * @example myPapi.patronHoldRequestsGet(Barcode, Password)
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 *
 @example myPapi.patronHoldRequestsGet(Barcode, Password, StatusOrId)
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 */

module.exports = function(parent) {
    parent.patronHoldRequestsGet = function(barcode, password, statusOrId = 'all') {
        url = 'patron/' + barcode + '/holdrequests/' + statusOrId;    		
        return parent.call( url,
            {  method: 'GET', "pass": password,});        
    }
    return parent;
}