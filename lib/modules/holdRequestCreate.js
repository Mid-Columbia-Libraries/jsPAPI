/** 
 * @module holdRequestCreate
 */

/**
 * Create a patron hold on an item
 *
 * @param {int|string} PatronID     - The Id of the patron placing the hold.  (Seperate from Barcode)
 * @param {int|string} BibID				- The internal id of the item being put on hold
 * @param {int|string} RequestingOrgID - ID of the Organization making the request.
 * @param {int|string} PickupOrgID     - ID of the organization at which the item will be picked up
 * 
 * @returns {promise}
 * 
 * @example myPapi.holdRequestCreate(PatronID, BibID, RequestingOrgId)
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 *
 @example myPapi.holdRequestCreate(PatronID, BibID, RequestingOrgId, PickupOrgID)
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 */

module.exports = function(parent) {
    parent.holdRequestCreate = function(PatronID, BibID, RequestingOrgID, PickupOrgID = RequestingOrgID, 
    WorkstationID = 1, UserID = 1) {
        url = 'holdrequest'
    		
    		
    		
        return parent.call( url,
            { method: 'POST' },
            { "PatronID": PatronID , 
            	"BibId": BibID,
            	"PickupOrgID": PickupOrgID,
            	"RequestingOrgID": RequestingOrgID,
            	"WorkstationID": WorkstationID,
            	"UserID": UserID,
            	});
        
    }
    return parent;
}