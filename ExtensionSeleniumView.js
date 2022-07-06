class ExtensionSeleniumView{
    constructor(controller){
		console.log("init - Start");
        this.controller = controller;
        this.uniqueId = "modal_"+this.generateGuid();
        this.__addListener();
		console.log("init - END");
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
            console.log("Page Object empty!");
            return false;
        }
        if(pageMethod.trim().length==0){
            console.log("Page Method empty!");
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
        return "assessor_modal";
    }

    __getIdClose(){
        return "assessor_close";
    }

    __getIdPageObject(){
        return "assessor_pageobject";
    }

    __getIdPageMethod(){
        return "assessor_method";
    }

    __getIdBtnConfirm(){
        return "assessor_confirm";
    }

    __getIdBtnCancel(){
        return "assessor_cancel";
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
		
    }

}