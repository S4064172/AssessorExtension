let __SeleniumIDEExtController = null;
let __SeleniumIDEView = null;

console.log("Selenium IDE Script loaded");

document.addEventListener('keydown',(event)=>{
  let name = event.key;
  switch(name){
    //case "F8":
      //openModalPO();
    //break;
    case "F4":
      stopRecordingPO();
    break;   
  }  
},true);


function openModalPO(){   
  checkInitialization();
  __SeleniumIDEView.openModal();
}

function stopRecordingPO(){
console.log("Selenium IDE Script loaded");
  checkInitialization();
  __SeleniumIDEExtController.stopRecordPO();
}

function checkInitialization(){
  if(__SeleniumIDEExtController==null){
    __SeleniumIDEExtController = new ExtensionSeleniumController('{a6fd85ed-e919-4a43-a5af-8da18bda539f}'); //Firefox KEY
    __SeleniumIDEExtController.activateListenerHealth();
  }
  if(__SeleniumIDEView==null){
    __SeleniumIDEView = new ExtensionSeleniumView(__SeleniumIDEExtController);
  }
}

openModalPO();

function handleResponse(message) {
  console.log('Message from the background script:');
}

function handleError(error) {
  console.log('Error: ${error}');
}

window.onbeforeunload = function () {
let sending = browser.runtime.sendMessage({
    greeting: "Close Modal"
  });
  sending.then(handleResponse, handleError); 
    return;
};
