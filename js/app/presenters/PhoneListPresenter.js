'use strict';

define([
	"dojo/_base/declare",
	"dojo/Evented",
	"../models/PhoneListModel"
], function (declare, Evented, model) {
	var PhoneListPresenter = declare([Evented ], {
        self: this,

        queryObj: {},

        sortObj: {},

		getAll: function() {
            var result = model.phoneList.filter(this.queryObj).sort(this.sortObj);
            return result.fetch();
		},

        setQuery: function(query) {
            this.queryObj = { name : new RegExp(query, "i") };
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