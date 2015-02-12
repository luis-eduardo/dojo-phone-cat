'use strict';

define([
    "dojo/_base/declare",
    "dstore/Rest",
    "dstore/Store",
    "dstore/Trackable"
], function (declare, Rest, Store, Trackable) {

    var TrackableRestStore = declare([Rest, Store, Trackable]);

    var phoneStore = new TrackableRestStore(
        {target: 'phones/'}
    );

    return {
        phoneStore: phoneStore
    }
});