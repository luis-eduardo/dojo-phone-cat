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

                var url = "#/phones/" + this.phone.id;

				this.name.innerHTML = this.phone.name;
                this.name.href = url;
				this.snippet.innerHTML = this.phone.snippet;

                this.thumbLink.href = url;
                this.thumbImg.src = this.phone.imageUrl;

			}
		}
	});

	return PhoneRow;

});