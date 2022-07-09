var myPort = browser.runtime.connect({name:"port-from-cs"});

myPort.onMessage.addListener(function(m) {
	console.log(m.greeting);
	if(m.greeting == "The recording is started?"){
			//check if the recording is started or not
		let checkRecording = document.getElementById('selenium-ide-indicator');
		if(checkRecording==null){
			alert("The recording is not active!");
			myPort.postMessage({greeting: "The recording is not active!"});
		}else{
			myPort.postMessage({greeting: "The recording is active!"});
		}
		return;
	}
	
	if(m.greeting == "The extension is closed"){
		alert("Active the extantion");
		return;
	}
	
});

