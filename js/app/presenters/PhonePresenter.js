"use strict";

define([
    "dojo/_base/declare",
    "dojo/request"
], function (declare, request) {
    var PhonePresenter = declare([], {
        getById: function(id) {
            return request("phones/" + id + ".json", { handleAs: "json" });
        }
    });

    var phonePresenter = new PhonePresenter;

    return phonePresenter;
});