/**
 * This script is used to manage the communication
 * between the web page and the extension
 */

var myPort = browser.runtime.connect({ name: "port-from-cs" });

myPort.onMessage.addListener(function (message) {
	console.log("Message: " + JSON.stringify(message));

	if (message.command == "open-modal") {
		//check if the recording is started or not
		let checkRecording = document.getElementById('selenium-ide-indicator');
		if (checkRecording == null) {
			alert("The recording is not active!");
			myPort.postMessage({
				command: "open-modal",
				message: "The recording is started?",
				answer: false
			});
		} else {
			myPort.postMessage({
				command: "open-modal",
				message: "The recording is started?",
				answer: true
			});
		}
		return;
	}

	if (message.command == "close-action") {
		//notify that the assessor page is closed
		alert("The extention is closed, you cannot use this command");
		return;
	}

});

