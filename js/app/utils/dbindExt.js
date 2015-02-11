"use strict";

define([], function () {

    function boolToString(val) {
        return val ? "true" : "false";
    }

    function join() {
        return Array.slice(arguments).join(', ');
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