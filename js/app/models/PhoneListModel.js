'use strict';

define([
    "dojo/_base/declare",
    "dstore/RequestMemory",
    "dstore/Store",
    "dstore/Trackable"
], function (declare, RequestMemory, Store, Trackable) {

    var TrackableRequestMemory = declare([RequestMemory, Store, Trackable]);

    var phoneList = new TrackableRequestMemory(
        { target: 'phones/phones.json' }
    );

    return {
        phoneList: phoneList
    }
});