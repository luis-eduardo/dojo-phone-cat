"use strict";

define([], function () {

    function boolToString(val) {
        return val ? "true" : "false";
    }

    function join() {
        var args = Array.prototype.slice.call(arguments);
        return args.join(', ');
    }

    function checkmark(val){
        return val ? '\u2713' : '\u2718';
    }

    return {
        boolToString: boolToString,
        join: join,
        checkmark: checkmark
    };
});