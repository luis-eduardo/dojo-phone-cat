"use strict";

define([
   "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/query",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "../presenters/PhonePresenter",
    "dbind/bind",
    "../utils/dbindExt",
    "dojo/text!./_templates/PhoneDetailsView.html",
    "dojo/NodeList-dom"
], function(declare,
    dom,
    domConstruct,
    query,
    _WidgetBase,
    _TemplatedMixin,
    presenter,
    bind,
    dbindExt,
    template){

    var PhoneDetailsView = declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,

        phoneId: {},

        phone: null,

        //attach-points declarations
        phoneThumbs: null,
        phoneAvailability: null,
        phoneDimensions: null,

        show: function(e){
            var self = this;
            this.phone = presenter.getById(e.params.id);

            this.phone.then(function(phone) {
                query("img.phone").attr({ src: phone.images[0] });

                query(".phone-name").forEach(function(item){
                    bind(item).to(phone, "name");
                });

                query(".phone-description").forEach(function(item){
                    bind(item).to(phone, "description");
                });

                phone.images.forEach(function(image){
                    domConstruct.place("<li><img src=\"" + image + "\"></li>", self.phoneThumbs);
                });

                phone.availability.forEach(function(availability){
                    domConstruct.place("<dd>" + availability + "</dd>", self.phoneAvailability);
                });

                //battery
                bind(dom.byId("phone-battery-type")).to(phone.battery, "type");
                bind(dom.byId("phone-battery-talkTime")).to(phone.battery, "talkTime");
                bind(dom.byId("phone-battery-standbyTime")).to(phone.battery, "standbyTime");

                //storage
                bind(dom.byId("phone-storage-ram")).to(phone.storage, "ram");
                bind(dom.byId("phone-storage-flash")).to(phone.storage, "flash");

                //connectivity
                bind(dom.byId("phone-connectivity-cell")).to(phone.connectivity, "cell");
                bind(dom.byId("phone-connectivity-wifi")).to(phone.connectivity, "wifi");
                bind(dom.byId("phone-connectivity-bluetooth")).to(phone.connectivity, "bluetooth");
                bind(dom.byId("phone-connectivity-infrared")).to(
                    bind(dbindExt.checkmark).to(phone.connectivity, "infrared")
                );
                bind(dom.byId("phone-connectivity-gps")).to(
                    bind(dbindExt.checkmark).to(phone.connectivity, "gps")
                );

                //android
                bind(dom.byId("phone-android-os")).to(phone.android, "os");
                bind(dom.byId("phone-android-ui")).to(phone.android, "ui");

                //dimensions
                phone.sizeAndWeight.dimensions.forEach(function(dim){
                    domConstruct.place("<dd>" + dim + "</dd>", self.phoneDimensions, "after");
                });
                bind(dom.byId("phone-sizeAndWeight-weight")).to(phone.sizeAndWeight, "weight");

                //display
                bind(dom.byId("phone-display-screenSize")).to(phone.display, "screenSize");
                bind(dom.byId("phone-display-screenResolution")).to(phone.display, "screenResolution");
                bind(dom.byId("phone-display-touchScreen")).to(
                    bind(dbindExt.boolToString).to(phone.display, "touchScreen")
                );

                //hardware
                bind(dom.byId("phone-hardware-cpu")).to(phone.hardware, "cpu");
                bind(dom.byId("phone-hardware-usb")).to(phone.hardware, "usb");
                bind(dom.byId("phone-hardware-audioJack")).to(phone.hardware, "audioJack");
                bind(dom.byId("phone-hardware-fmRadio")).to(
                    bind(dbindExt.boolToString).to(phone.hardware, "fmRadio")
                );
                bind(dom.byId("phone-hardware-accelerometer")).to(
                    bind(dbindExt.boolToString).to(phone.hardware, "accelerometer")
                );

                //camera
                bind(dom.byId("phone-camera-primary")).to(phone.camera, "primary");
                bind(dom.byId("phone-camera-features")).to(
                    bind(dbindExt.join).to(phone.camera.features)
                );

                bind(dom.byId("phone-additionalFeatures")).to(phone, "additionalFeatures");
            });
        },

        hide: function() {
            query("img.phone").attr({ src: "" });

            domConstruct.empty(this.phoneThumbs);
            domConstruct.empty(this.phoneAvailability);
        }
    });

    return PhoneDetailsView;
});