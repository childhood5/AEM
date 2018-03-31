CQ.Ext.form.Contact = CQ.Ext.extend(CQ.Ext.form.TriggerField, {

	linkDialog : null,

	"triggerClass" : "x-form-search-trigger",

	"separator" : "#@",

	"readOnly" : false,
	
	constructor : function(config) {

		this.editorKernel = new CQ.form.rte.IFrameKernel(config);
		CQ.Ext.form.Contact.superclass.constructor.call(this, config);
	},
	
	initComponent : function() {
		CQ.Ext.form.Contact.superclass.initComponent.call(this);
	},

	// private
	onDestroy : function() {
		// CQ.Ext.destroy(this.menu, this.keyNav);
		if (this.linkDialog) {
			this.linkDialog.destroy();
		}
		CQ.Ext.form.Contact.superclass.onDestroy.call(this);
	},

	/**
	 * @method onTriggerClick
	 * @hide
	 */
	// private
	// Implements the default empty TriggerField.onTriggerClick
	// function to display the Meta Link Dialog
	onTriggerClick : function() {
		
		fieldName = this.getName();
		
		var deptname = fieldName + "_deptname";
		var deptContact = fieldName + "_deptContact";
		var deptEmail = fieldName + "_deptEmail";
		

		var deptnameValue;
		var deptContactValue;
		var deptEmailValue;
		

		var fieldValues = this.getValue();
		var elem = fieldValues.split(this.separator);

		deptnameValue = elem[0];
		deptContactValue = elem[1];
		deptEmailValue = elem[2];
		

		// lazy creation of browse dialog
		if (this.linkDialog == null) {
			function okHandler() {
				prefix = this.linkfield.getName();
				
				var deptname = prefix + "_deptname";
				var deptContact = prefix + "_deptContact";
				var deptEmail = prefix + "_deptEmail";
				
				deptnameValue = this.getField(deptname).getValue();
				deptContactValue = this.getField(deptContact).getValue();
				deptEmailValue = this.getField(deptEmail).getValue();
				
								
				this.linkfield.setValue(deptnameValue + this.linkfield.separator
						+ deptContactValue + this.linkfield.separator
						+ deptEmailValue);
				
				this.hide();
			}

			var linkDialogCfg = {

				"ok" : okHandler,
				"id" : CQ.Util.createId("cq-linkdialog"),
				"title" : "Share Item",
				"height" : 400,
				"width" : 435,
				"xtype" : "dialog",
				"linkfield" : this,

				"items" : {
					"xtype" : "panel",
					"items" : [
							{
								"xtype" : "textfield",
								"fieldLabel" : "Dept Name:",
								"fieldDescription" : "Risk Management Compliance",
								"name" : deptname,
								"value" : deptnameValue
							},
							{
								"xtype" : "textfield",
								"fieldLabel" : "Dept Contact:",
								"fieldDescription" : "(65) 248 2888",
								"name" : deptContact,
								"value" : deptContactValue
							},
							{
								"xtype" : "textfield",
								"fieldLabel" : "Dept Email:",
								"fieldDescription" : "Wecare-SG@greateasternlife.com",
								"name" : deptEmail,
								"value" : deptEmailValue
							}
					]
				}
			};

			linkDialogCfg.buttons = CQ.Dialog.OKCANCEL;
			this.linkDialog = new CQ.Dialog(linkDialogCfg);

		} else {
			// TODO put value
		}

		this.linkDialog.show();
	}

});
CQ.Ext.reg('contactfield', CQ.Ext.form.Contact);