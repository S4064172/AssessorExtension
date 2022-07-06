/**
 * Returns all of the registered extension commands for this extension
 * and their shortcut (if active).
 */
let assessorIsOpen = false;
let gettingAllCommands = browser.commands.getAll();
gettingAllCommands.then((commands) => {
  for (let command of commands) {
    // Note that this logs to the Add-on Debugger's console: 
    // not the regular Web console.
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
	if( !assessorIsOpen && command == 'open-modal'){
		console.log(command);
		openModalPO();
		assessorIsOpen = true;
	}
		
	if( assessorIsOpen && command == 'close-modal'){
		console.log(command);
		assessorIsOpen = false;
	}
	  
});

function openModalPO(){  
	console.log("openModalPO");
	let createData = {
		type: "detached_panel",
		url: "assessor.html",
		width: 550,
		height: 500
	};
	
	let creating = browser.windows.create(createData);
	creating.then(() => {
		console.log("The popup has been created");
	});
}
