/**
 * This script is used to interact with the 
 * extension with the background-command
 * 
 * Note that this logs to the Add-on Debugger's console
 */

//Flag use to undestand if the assessor-page is opened
let assessorIsOpen = false;

/**
 * Returns all of the registered extension commands for this extension
 * and their shortcut (if active).
 */
let gettingAllCommands = browser.commands.getAll();
gettingAllCommands.then((commands) => {
	for (let command of commands) {
		console.log(command);
	}
});

/**
 * Fired when a registered command is activated using a keyboard shortcut.
 *
 * In this sample extension, there is only one registered command: "Ctrl+Shift+U".
 * On Mac, this command will automatically be converted to "Command+Shift+U".
 */
browser.commands.onCommand.addListener((command) => {

	if (!assessorIsOpen && command == 'open-modal') {
		console.log(command);
		//send message to check the status of the recording
		_sendMessage({
			command: "open-modal",
			message: "The recording is started?"
		});
	}

	if (command == 'close-action') {
		console.log(command);
		if (!assessorIsOpen)
			_sendMessage({
				command: "close-action",
				message: "The extension is closed"
			});
	}
});

/**
 * This function is used to create
 * the assessor page
 */
function openModalPO() {
	assessorIsOpen = true;
	let createData = {
		type: "detached_panel",
		url: "assessor/page/assessor.html",
		width: 550,
		height: 500
	};

	let creating = browser.windows.create(createData);
	creating.then(() => {
		console.log("The popup has been created");
	});

}



