'use strict';

define([
	"dojo/_base/declare",
    "dojo/dom",
    "dojo/Stateful",
    "dojo/ready",
    "dojo/parser",
    "dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
    "dijit/registry",
    "../presenters/PhoneListPresenter",
	"./widgets/PhoneRow",
    'dbind/bind',
    "dojo/text!./_templates/PhoneListView.html"
], function(declare,
	dom,
    Stateful,
    ready,
    parser,
    _WidgetBase,
	_TemplatedMixin,
    _WidgetsInTemplateMixin,
    registry,
    presenter,
    PhoneRow,
    bind,
    template){

	var PhoneListView = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin  ], {
		templateString: template,

		phoneRows: null,

        mainScope: null,

		postCreate: function() {
			var self = this;
			this.phoneRows = [];
            this.mainScope = new Stateful({});

            bind(registry.byId("query")).to(this.mainScope, "query");
            bind(dom.byId("sort")).to(this.mainScope, "sort");

            this.mainScope.set("sort", "age");

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