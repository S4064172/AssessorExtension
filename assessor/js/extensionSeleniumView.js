class ExtensionSeleniumView {
    constructor(controller) {
        this.controller = controller;
        this.uniqueId = "modal_" + this.generateGuid();
        this.__addListener();
    }

    generateGuid() {
        let result = this.generateFourUniqueValue(2);
        for (let i = 1; i < 4; i++)
            result += "-" + this.generateFourUniqueValue(2);
        return result;
    }

    generateFourUniqueValue(sequeneOf4) {
        let result = "";
        for (let i = 0; i < sequeneOf4; i++) {
            result += Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return result;
    }


    checkFields() {
        let pageObj = this.__val(this.__getIdPageObject());
        let pageMethod = this.__val(this.__getIdPageMethod());
        if (pageObj.trim().length == 0) {
            alert("Page Object empty!");
            return false;
        }
        if (pageMethod.trim().length == 0) {
            alert("Page Method empty!");
            return false;
        }
        return true;
    }

    openModal() {
        this.controller.setStartingCommands();   
    }

    clearModal() {
        this.__el(this.__getIdPageObject()).value = "";
        this.__el(this.__getIdPageMethod()).value = "";
    }

    saveCommands(saveCommands) {
        if (saveCommands) {
            this.controller.setStartingCommands();   
        }else{
            this.controller.clearCommandFromStartingPoint()
        }
        // window.close();
    }

    __getIdModal() {
        return "assessor_modal";
    }

    __getIdClose() {
        return "assessor_close";
    }

    __getIdPageObject() {
        return "assessor_pageobject";
    }

    __getIdPageMethod() {
        return "assessor_method";
    }

    __getIdBtnConfirm() {
        return "assessor_confirm";
    }

    __getIdBtnCancel() {
        return "assessor_cancel";
    }

    __el(id) {
        return document.getElementById(id);
    }

    __val(id) {
        return document.getElementById(id).value;
    }

    __addListener() {
        let that = this;
        console.log("Apply Listener");

        this.__el(this.__getIdBtnCancel()).addEventListener("click", function () {
            that.clearModal();
            that.saveCommands(false);
        });

        this.__el(this.__getIdBtnConfirm()).addEventListener("click", function () {
            if (!that.checkFields())
                return;
            that.controller.recordPO(
                that.__val(that.__getIdPageObject()).trim(),
                that.__val(that.__getIdPageMethod()).trim()
            );
            that.saveCommands(true);
        });

    }

}