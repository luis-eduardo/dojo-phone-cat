'use strict';

define([
	"dojo/dom",
    "dojo/Stateful",
    'dbind/bind',
	"./views/PhoneListView",
	"./router",
    "dojo/parser",
    "dijit/registry",
    "dijit/form/TextBox",
    "dijit/form/Select",
    "dojo/domReady!"
], function (dom, Stateful, bind, PhoneListView, router, parser, registry) {
	var parentNode = dom.byId("viewContainer");

    var mainScope = new Stateful({});

    var startup = function(){
        registerRoutes();
        initUI();
        router.startup();
    };

    var registerRoutes = function() {
        var phoneListView = new PhoneListView({ mainScope: mainScope },
            createAndAppendDiv(parentNode));
        router.registerView("/", phoneListView);
    };

    var initUI = function(){
        parser.parse();

        bind(registry.byId("query")).to(mainScope, "query");
        bind(registry.byId("sort")).to(mainScope, "sort");

        mainScope.set("sort", "age");
    };

    function createAndAppendDiv(parent){
		var div = document.createElement("div");
		parent.appendChild(div);
		return div;
	}

    return {
        init: function() {
            startup();
        }
    };
});