'use strict';

define([
	"dojo/_base/declare",
	"dojo/Evented",
	"../models/PhoneListModel"
], function (declare, Evented, model) {
	var PhoneListPresenter = declare([Evented ], {
        self: this,

        queryObj: new RegExp(""),

        sortObj: {},

		getAll: function() {

            var filterName = model.phoneList.Filter()
                .match("name", this.queryObj);

            var filterSnippet = model.phoneList.Filter()
                .match("snippet", this.queryObj);

            var result = model.phoneList
                .filter(filterName.or(filterSnippet))
                .sort(this.sortObj);

            return result.fetch();
		},

        setQuery: function(query) {
            this.queryObj = new RegExp(query, "i");
            //this.queryObj = { name : regexp, snippet: regexp };
            this.emit("productsUpdate");
        },

        setSort: function(sort) {
            this.sortObj = sort;
            this.emit("productsUpdate");
        }
	});

	var phoneListPresenter = new PhoneListPresenter;

	model.phoneList.track().on('add, update, delete', function () {
		phoneListPresenter.emit("productsUpdate");
	});

	return phoneListPresenter;
});