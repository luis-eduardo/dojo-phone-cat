"use strict";

"use strict";

define(["dojo/_base/fx",
    "dojo/dom-style"
], function (fx, domStyle) {

    var whichAnimationEvent = function () {
        var a;
        var el = document.createElement('fakeelement');
        var animations = {
            'animation': 'animationend',
            'OAnimation': 'oAnimationEnd',
            'MozAnimation': 'animationend',
            'WebkitAnimation': 'webkitAnimationEnd'
        };

        for (a in animations) {
            if (el.style[a] !== undefined) {
                return animations[a];
            }
        }
    };

    var whichTransitionEvent = function () {
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    };

    var animateUp = function (element, className, done) {
        domStyle.set(element, {
            position: 'absolute',
            top: 500,
            left: 0,
            display: 'block'
        });

        fx.animateProperty({
            node: element,
            properties: {
                top: {start: 500, end: 0}
            },
            duration: 500,
            onEnd: done
        }).play();

        return function (cancel) {
            if (cancel) {
                element.stop();
            }
        };
    };

    var animateDown = function (element, className, done) {
        domStyle.set(element, {
            position: 'absolute',
            left: 0,
            top: 0
        });

        fx.animateProperty({
            node: element,
            properties: {
                top: -500
            },
            duration: 500,
            onEnd: done
        }).play();

        return function (cancel) {
            if (cancel) {
                element.stop();
            }
        };
    };

    return {
        addClass: animateUp,
        removeClass: animateDown,
        whichTransitionEvent: whichTransitionEvent,
        whichAnimationEvent: whichAnimationEvent
    };
});