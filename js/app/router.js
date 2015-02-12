'use strict';

define([
    "dojo/router",
    "dojo/_base/fx"
], function (router, fx) {
    var views = {};
    var currentView = {};

    function registerView(url, view) {
        views[url] = view;
        router.register(url, function (e) {
            navigateTo(view, e);
        });
    }

    function navigateTo(view, e) {
        currentView = {};
        for (var i in views) {
            var v = views[i];

            if (view == v) {
                currentView = view;
                fx.fadeIn({
                    node: v.domNode,
                    onEnd: function(){
                        console.log("end", this.node);
                        this.node.style.display = "";
                    }
                }).play();

                if (v.show) {
                    v.show(e);
                }
            } else {
                fx.fadeOut({
                    node: v.domNode,
                    onEnd: function(){
                        this.node.style.display = "none";
                    }
                }).play();

                if (v.clear) {
                    v.clear();
                }
            }
        }
    }

    function getCurrentView() {
        return currentView;
    }

    function startup() {
        router.startup("/phones");
        if (!location.hash) {
            router.go("/phones");
        }
    }

    return {
        registerView: registerView,
        getCurrentView: getCurrentView,
        startup: startup
    };
});