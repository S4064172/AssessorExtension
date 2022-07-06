var myPort = browser.runtime.connect({name:"port-from-cs"});

myPort.onMessage.addListener(function(m) {
 
	//check if the recording is started or not
	let checkRecording = document.getElementById('selenium-ide-indicator');
	if(checkRecording==null){
		alert("The recording is not active!");
		myPort.postMessage({greeting: "The recording is not active!"});
	}else{
		myPort.postMessage({greeting: "The recording is active!"});
	}
});

