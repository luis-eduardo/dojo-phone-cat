'use strict';

define([
    "dojo/_base/declare",
    "dstore/RequestMemory",
    "dstore/Trackable"
], function (declare, RequestMemory, Trackable) {

    var TrackableRequestMemory = declare([RequestMemory, Trackable]);

    var phoneList = new TrackableRequestMemory(
        { target: 'phones/phones.json' }
    );

    return {
        phoneList: phoneList
    }
});