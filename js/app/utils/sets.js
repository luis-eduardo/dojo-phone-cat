"use strict";

define([], function () {

    function minus(A, B, compProp) {
        var map = {};
        var C = [];

        for(var i = B.length - 1; i >= 0; i--) {
            map[B[i][compProp]] = null;
        }

        for(var i = A.length - 1; i >= 0; i--) {
            if(!map.hasOwnProperty(A[i][[compProp]])) {
                C.push(A[i]);
            }
        }

        return C;
    }

    function union(A, B, compProp) {
        var map = {};
        var C = [];

        for(var i = B.length - 1; i >= 0; i--) {
            map[B[i][compProp]] = null;
            C.push(B[i]);
        }

        for(var i = A.length - 1; i >= 0; i--) {
            if(!map.hasOwnProperty(A[i][[compProp]])) {
                C.push(A[i]);
            }
        }

        return C;
    }

    return {
        minus: minus,
        union: union
    };
});