/**
 * This script is used to send messages to the background script.
*/

function handleResponse(message) {
	console.log('response:' + message);
}

function handleError(error) {
	console.log('Error:' + error);
}

window.onbeforeunload = function () {

	//Through this message, we notify
	//that the assessor page is closed
	let sending = browser.runtime.sendMessage({
		command: "assessor-close",
		messagge: "Assessor page is closed"
	});

	sending.then(handleResponse, handleError);
	return;
};