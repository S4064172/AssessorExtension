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