"use strict";

define([
    "dojo/_base/declare",
   "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/query",
    "dojo/on",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "../presenters/PhonePresenter",
    "dbind/bind",
    "../utils/dbindExt",
    "dojo/text!./_templates/PhoneDetailsView.html",
    "dojo/NodeList-dom"
], function(declare,
    lang,
    dom,
    domConstruct,
    query,
    on,
    _WidgetBase,
    _TemplatedMixin,
    presenter,
    bind,
    dbindExt,
    template){

    function bindBasic(phone) {
        query(".phone-name").forEach(function (item) {
            bind(item).to(phone, "name");
        });

        query(".phone-description").forEach(function (item) {
            bind(item).to(phone, "description");
        });
    }

    function bindImages(self, phone) {
        phone.images.forEach(function(image){
            domConstruct.place("<li><img src='" + image + "'></li>", self.phoneThumbs);
        });

        query(".phone-thumbs img").on("click", function(){
            self.setImage(this);
        });
    }

    function bindAvailability(self, phone) {
        phone.availability.forEach(function (availability) {
            domConstruct.place("<dd>" + availability + "</dd>", self.phoneAvailability);
        });
    }

    function bindBattery(phone) {
        bind(dom.byId("phone-battery-type")).to(phone.battery, "type");
        bind(dom.byId("phone-battery-talkTime")).to(phone.battery, "talkTime");
        bind(dom.byId("phone-battery-standbyTime")).to(phone.battery, "standbyTime");
    }

    function bindStorage(phone) {
        bind(dom.byId("phone-storage-ram")).to(phone.storage, "ram");
        bind(dom.byId("phone-storage-flash")).to(phone.storage, "flash");
    }

    function bindConnectivity(phone) {
        bind(dom.byId("phone-connectivity-cell")).to(phone.connectivity, "cell");
        bind(dom.byId("phone-connectivity-wifi")).to(phone.connectivity, "wifi");
        bind(dom.byId("phone-connectivity-bluetooth")).to(phone.connectivity, "bluetooth");
        bind(dom.byId("phone-connectivity-infrared")).to(
            bind(dbindExt.checkmark).to(phone.connectivity, "infrared")
        );
        bind(dom.byId("phone-connectivity-gps")).to(
            bind(dbindExt.checkmark).to(phone.connectivity, "gps")
        );
    }

    function bindAndroid(phone) {
        bind(dom.byId("phone-android-os")).to(phone.android, "os");
        bind(dom.byId("phone-android-ui")).to(phone.android, "ui");
    }

    function bindDimensions(self, phone) {
        phone.sizeAndWeight.dimensions.forEach(function (dim) {
            domConstruct.place("<dd>" + dim + "</dd>", self.phoneDimensions, "after");
        });
        bind(dom.byId("phone-sizeAndWeight-weight")).to(phone.sizeAndWeight, "weight");
    }

    function bindDisplay(phone) {
        bind(dom.byId("phone-display-screenSize")).to(phone.display, "screenSize");
        bind(dom.byId("phone-display-screenResolution")).to(phone.display, "screenResolution");
        bind(dom.byId("phone-display-touchScreen")).to(
            bind(dbindExt.boolToString).to(phone.display, "touchScreen")
        );
    }

    function bindHardware(phone) {
        bind(dom.byId("phone-hardware-cpu")).to(phone.hardware, "cpu");
        bind(dom.byId("phone-hardware-usb")).to(phone.hardware, "usb");
        bind(dom.byId("phone-hardware-audioJack")).to(phone.hardware, "audioJack");
        bind(dom.byId("phone-hardware-fmRadio")).to(
            bind(dbindExt.boolToString).to(phone.hardware, "fmRadio")
        );
        bind(dom.byId("phone-hardware-accelerometer")).to(
            bind(dbindExt.boolToString).to(phone.hardware, "accelerometer")
        );
    }

    function bindCamera(phone) {
        bind(dom.byId("phone-camera-primary")).to(phone.camera, "primary");
        bind(dom.byId("phone-camera-features")).to(
            bind(dbindExt.join).to(phone.camera.features)
        );
    }

    function bindAdditionalFeatures(phone) {
        bind(dom.byId("phone-additionalFeatures")).to(phone, "additionalFeatures");
    }

    var PhoneDetailsView = declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,

        phoneId: {},

        phone: null,

        mainImageUrl: "",

        //attach-points declarations
        phoneThumbs: null,
        phoneAvailability: null,
        phoneDimensions: null,

        show: function(e){
            var self = this;
            this.phone = presenter.getById(e.params.id);

            this.phone.then(function(phone) {
                self.set("mainImageUrl", phone.images[0]);

                bindBasic(phone);
                bindImages(self, phone);
                bindAvailability(self, phone);
                bindBattery(phone);
                bindStorage(phone);
                bindConnectivity(phone);
                bindAndroid(phone);
                bindDimensions(self, phone);
                bindDisplay(phone);
                bindHardware(phone);
                bindCamera(phone);
                bindAdditionalFeatures(phone);
            });
        },

        hide: function() {
            query("img.phone").attr({ src: "" });

            domConstruct.empty(this.phoneThumbs);
            domConstruct.empty(this.phoneAvailability);
            domConstruct.empty(this.phoneDimensions);
        },

        setImage: function(img){
            this.set("mainImageUrl", img.src);
        },

        /* Getters and Setters */

        _setMainImageUrlAttr: function(val) {
            this.mainImageUrl = val;
            query("img.phone").attr({ src: this.mainImageUrl });
        }
    });

    return PhoneDetailsView;
});