/**
 * Initialize the communication with the content script
 * this is used to undertand if the recording is stated or not
*/
let portFromCS;

function connected(p) {
  portFromCS = p;
  portFromCS.onMessage.addListener(function(m) {
		console.log(m);
		if(m.greeting == 'The recording is active!'){
			portFromCS.postMessage({greeting: "success"});
			openModalPO();
		}
	
  });
}

browser.runtime.onConnect.addListener(connected);


function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " +request.greeting);
		if(request.greeting == 'Close Modal'){
			assessorIsOpen = false;
		}
}

browser.runtime.onMessage.addListener(handleMessage);



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
		//send message to check the status of the recording
		
		portFromCS.postMessage({greeting: "The recording is started?"});
	}
		
	if( command == 'close-modal'){
		console.log(command);
		if (!assessorIsOpen)
			portFromCS.postMessage({greeting: "The extension is closed"});
		
	}
	  
});

function openModalPO(){  
	console.log("openModalPO");
	assessorIsOpen = true;
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



