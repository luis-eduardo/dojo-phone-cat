'use strict';

define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dojo/text!./_templates/PhoneRow.html"
], function (declare, _WidgetBase, _TemplatedMixin, template) {
	
	var PhoneRow = declare([_WidgetBase, _TemplatedMixin], {
		templateString: template,

		phone: null,

		postCreate: function() {
			if(this.phone) {
				this.name.innerHTML = this.phone.name;
				this.snippet.innerHTML = this.phone.snippet;
			}
		}
	});

	return PhoneRow;

});