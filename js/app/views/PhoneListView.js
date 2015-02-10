'use strict';

define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"../presenters/PhoneListPresenter",
	"./widgets/PhoneRow",
	"dojo/text!./_templates/PhoneListView.html"
], function(declare,
	_WidgetBase,
	_TemplatedMixin,
	presenter,
    PhoneRow,
	template){

	var PhoneListView = declare([_WidgetBase, _TemplatedMixin], {
		templateString: template,

		phoneRows: null,

        mainScope: {},

		postCreate: function() {
			var self = this;
			this.phoneRows = [];

			this.updateProductData();

			presenter.on("productsUpdate", function() {
				self.updateProductData();
			});

            this.mainScope.watch(function(name, oldValue, newValue){
                if(name == "query"){
                    presenter.setQuery(newValue);
                } else if (name == "sort") {
                    presenter.setSort(newValue);
                }
            });
		},

		updateProductData: function() {
			var self = this;
			this.phoneRows.forEach(function(p) {
				p.destroy();
			});

			this.phoneRows.length = 0;

			presenter.getAll().forEach(function(phone) {
				var newRow = new PhoneRow({ phone: phone });
				newRow.placeAt(self.itemsContainer);
				self.phoneRows.push(newRow);
			});
		}
	});

	return PhoneListView;
});