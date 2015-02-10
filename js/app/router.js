'use strict';

define([
	"dojo/router"
], function (router) {
	var views = {};
    var currentView = {};

	function registerView(url, view) {
		views[url] = view;
		router.register(url, function(e){
			navigateTo(view, e);
		});
	}

	function navigateTo (view, e) {
        currentView = {};
		for (var i in views) {
			var v = views[i];

			if(view == v) {
                currentView = view;
				v.domNode.style.display = "";
				if(v.show) {
					v.show(e);
				}
			} else {
				v.domNode.style.display = "none";
			}
		}
	}

    function getCurrentView () {
        return currentView;
    }

	function startup () {
		router.startup("/");
	}

	return {
		registerView: registerView,
        getCurrentView: getCurrentView,
		startup: startup
	};
});