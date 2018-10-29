/** 
 * @module holdRequestCancel
 */

/**
 * Cancel a Patrons Hold
 *
 * @param {int|string} Barcode          - The barcode of the User
 * @param {int|string} Password  				- The password of the User
 * @param {int|string} RequestId        - The Id of the Hold Request to be canceled
 * @param {int|string} WorkstationID  	- The ID of the workstation from which the request is being canceled.  (Use 1)
 * @param {int|string} UserID           - The Id of the user of the workstation.  Not patron userid.  (Use 1).
 * 
 * 
 * @returns {promise}
 * 
 * @example myPapi.holdRequestCancel(Barcode, Password)
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 *
 @example myPapi.holdRequestCancel(Barcode, Password, RequestId)
 *      .then(function(response) {
 *          console.log(response.data);
 *      });
 */

module.exports = function(parent) {
    parent.holdRequestCancel = function(barcode, password, requestID, WorkstationID = 1, UserID = 1) {
        url = 'patron/' + barcode + '/holdrequests/' + requestID + '/cancelled';
        url += '?wsid=' + WorkstationID + '&userid=' + UserID;
    		    		
    		
        return parent.call( url,
            { method: 'PUT', pass: password, 
            	"wsid": WorkstationID,
            	"userid": UserID,},
       				{
            	"wsid": WorkstationID,
            	"userid": UserID,
            	});
        
    }
    return parent;
}