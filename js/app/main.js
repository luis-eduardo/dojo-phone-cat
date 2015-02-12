'use strict';

define([
    "dojo/dom",
    "./views/PhoneListView",
    "./views/PhoneDetailsView",
    "./router",
    "dijit/form/TextBox",
    "dojo/domReady!"
], function (dom, PhoneListView, PhoneDetailsView, router) {
    var parentNode = dom.byId("viewContainer");

    var startup = function () {
        registerRoutes();
        router.startup();
    };

    var registerRoutes = function () {
        var phoneListView = new PhoneListView(null,
            createAndAppendDiv(parentNode));
        router.registerView("/phones", phoneListView);

        var phoneDetailsView = new PhoneDetailsView(null,
            createAndAppendDiv(parentNode));
        router.registerView("/phones/:id", phoneDetailsView);

    };

    function createAndAppendDiv(parent) {
        var div = document.createElement("div");
        parent.appendChild(div);
        return div;
    }

    return {
        init: function () {
            startup();
        }
    };
});