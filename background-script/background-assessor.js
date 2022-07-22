/**
 * This script is used to manage the communication
 * between the background script and the assessor page
 * 
 */
function handleMessage(request, sender, sendResponse) {
    console.log("Message: " + JSON.stringify(request));

    if (request.command == 'assessor-close') {
        assessorIsOpen = false;
    }
}

browser.runtime.onMessage.addListener(handleMessage);

/**
 * Initialize the communication with the content script
 */
 let portFromCS;

 function connected(p) {
   portFromCS = p;
   portFromCS.onMessage.addListener(function (message) {
     console.log("Message: " + JSON.stringify(message));
     //this is used to understand if the recording is started or not
     if (message.command == 'open-modal' && message.answer) {
       openModalPO();
     }
 
   });
 }
 
 function _sendMessage(message) {
   console.log("Message: " + JSON.stringify(message));
   portFromCS.postMessage(message);
 }
 
 browser.runtime.onConnect.addListener(connected);