"use strict";

define([
    "dojo/_base/declare",
    "../models/PhoneModel"
], function (declare, model) {
    var PhonePresenter = declare([], {
        getById: function(id) {
            return model.phoneStore.get(id + ".json");
        }
    });

    var phonePresenter = new PhonePresenter;

    return phonePresenter;
});