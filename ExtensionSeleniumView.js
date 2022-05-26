class ExtensionSeleniumView{

    

    constructor(controller){
        this.controller = controller;
        this.uniqueId = "modal_"+this.generateGuid();        
        this.__injectView();
        this.__addListener();
    }

    generateGuid(){
        let result = this.generateFourUniqueValue(2);
        for(let i=1;i<4;i++) 
            result+="-"+this.generateFourUniqueValue(2);        
        return result;
    }

    generateFourUniqueValue(sequeneOf4){
        let result = "";
        for(let i=0;i<sequeneOf4;i++){
            result += Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return result;
    }

    
    checkFields(){
        let pageObj =  this.__val(this.__getIdPageObject());
        let pageMethod = this.__val(this.__getIdPageMethod());
        if(pageObj.trim().length==0){
            alert("Page Object empty!");
            return false;
        }
        if(pageMethod.trim().length==0){
            alert("Page Method empty!");
            return false;
        }
        return true;
    }

    openModal(){
        let that = this;
        this.controller.getCommands().then( res=>{
            that.controller.setStartingCommands(res);
            that.__el(that.__getIdModal()).style.display = 'block';
        });   
    }

    clearModal(){
        this.__el(this.__getIdPageObject()).value = "";
        this.__el(this.__getIdPageMethod()).value = "";
    }

    closeModal(clearCommands){
        if(clearCommands){
            this.controller.clearCommandFromStartingPoint();
        }
        this.__el(this.__getIdModal()).style.display = 'none';
    }

    __getIdModal(){
        return this.uniqueId+"_modal";
    }

    __getIdClose(){
        return this.uniqueId+"_close";
    }

    __getIdPageObject(){
        return this.uniqueId+"_pageObject";
    }

    __getIdPageMethod(){
        return this.uniqueId+"_method";
    }

    __getIdBtnConfirm(){
        return this.uniqueId+"_confirm";
    }

    __getIdBtnCancel(){
        return this.uniqueId+"_cancel";
    }

	/*****READ FILE******/
	__getIdBtnReadFile(){
        return this.uniqueId+"_readfile";
    }
	
	__getIdContReadFile(){
        return this.uniqueId+"_readfilename";
    }
	
	dispFile(id,contents) {
		//console.log(id);
		//console.log(contents);
		document.getElementById(id).innerHTML=contents;
	}

	clickElem(elem) {
		var eventMouse = document.createEvent("MouseEvents")
		eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
		elem.dispatchEvent(eventMouse)
	}

	openFile(func) {
		var readFile = function(e) {
			var file = e.target.files[0];
            if (!file) {
                alert("Selected item is not a file");
				return;
			}

            var filename = file.name.split('.').pop();
            //console.log(e);
            //console.log(e.target);
			//console.log(file);
            //console.log(filename);

           if (filename !== 'side'){
                alert("Selected file is not .side");
                return;
            }
            
			fileInput.func=func(fileInput.idContent,file.name);
			

			var reader = new FileReader();
			reader.onload = function(e) {
                var map = new Map();
                //console.log(map);
                //console.log(e.target.result);
				var contents = JSON.parse(e.target.result);
				//console.log(contents);
                var tests_to_parse = contents.tests;
                //console.log(tests_to_parse);

                tests_to_parse.forEach(test => {
                    //console.log(test);
                    test.commands.forEach(command => {
                        //console.log(command);
                        // Assessor key words: {ASSESSOR} and backToMain
                        if(command.target.includes('{ASSESSOR}') && !command.target.includes('backToMain') ){
                            //console.log(command.target);

                            var assessor_command = command.target.split(':');
                            //console.log(assessor_command);
                            //console.log('PO: ' + assessor_command[1]);
                            //console.log('Method: ' + assessor_command[2]);
                            if(map.has(assessor_command[1])){
                                //console.log(map.get(assessor_command[1]));
                                if(!map.get(assessor_command[1]).includes(assessor_command[2]))
                                    map.set(assessor_command[1], map.get(assessor_command[1])+','+assessor_command[2]);
                            }else
                                map.set(assessor_command[1],assessor_command[2]);
                        }
                           
                    })
                    
                });
                console.log(map);
				document.body.removeChild(fileInput)
			}
            
			reader.readAsText(file)
        }

		var fileInput = document.createElement("input")
		fileInput.type='file'
		fileInput.style.display='none'
		fileInput.func=func
		fileInput.idContent=this.__getIdContReadFile();
		fileInput.onchange=readFile
		document.body.appendChild(fileInput)
		this.clickElem(fileInput)
	}

    __injectView(){        
        document.body.innerHTML +=  `
        <div id="${this.__getIdModal()}" class="seleniumExtension-modal" style='display:none'>        
            <div class="seleniumExtension-modal-content">
                <span class="seleniumExtension-close" id="${this.__getIdClose()}">&times;</span>
                <h5>Extension PO</h5>
				
				<h5>
                    <label for='${this.__getIdContReadFile()}'>Selected file:</label>
					<label style='display: inline;' id='${this.__getIdContReadFile()}'></label>
                </h5>
            
                <div class='seleniumExtension-col-12'>
                    <label for='${this.__getIdPageObject()}'>Page Object</label>
                    <input type='text' class='seleniumExtension-form-control' id='${this.__getIdPageObject()}'>
                </div>
                <div class='seleniumExtension-col-12'>
                    <label for='${this.__getIdPageMethod()}'>Method Name</label>
                    <input type='text' id='${this.__getIdPageMethod()}' class='seleniumExtension-form-control'>
                </div>    
                <br>
                <div class='text-center'>
                    <input type='button' class='seleniumExtension-btn seleniumExtension-btn-success' id='${this.__getIdBtnConfirm()}' value='Confirm'>
                    &nbsp;&nbsp;
                    <input type='button' class='seleniumExtension-btn seleniumExtension-btn-danger' id='${this.__getIdBtnCancel()}' value='Cancel'>
					&nbsp;&nbsp;
					<input type='button' class='seleniumExtension-btn seleniumExtension-btn-file'  id='${this.__getIdBtnReadFile()}' value='Choose a .side file'>
                </div>
            </div>
        </div>`;
    }

    __el(id){
        return document.getElementById(id);
    }

    __val(id){
        return document.getElementById(id).value;
    }

    __addListener(){
        let that = this;
        console.log("Apply Listener");

        this.__el(this.__getIdClose()).addEventListener("click",function(){
            that.clearModal();
            that.closeModal(true);
        });

        this.__el(this.__getIdBtnCancel()).addEventListener("click",function(){
            that.clearModal();
            that.closeModal(true);
        });

        this.__el(this.__getIdBtnConfirm()).addEventListener("click",function(){
            if(!that.checkFields()) 
                return;            
            that.controller.recordPO(
                that.__val(that.__getIdPageObject()).trim(),
                that.__val(that.__getIdPageMethod()).trim()
            );
            that.closeModal(false);
        });
		
		this.__el(this.__getIdBtnReadFile()).addEventListener("click",function(){
			that.openFile(that.dispFile)
        });
    }

	
}