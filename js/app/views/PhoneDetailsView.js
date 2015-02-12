"use strict";

define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/query",
    "dojo/on",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "../presenters/PhonePresenter",
    "dbind/bind",
    "../utils/dbindExt",
    "../utils/Animations",
    "dojo/text!./_templates/PhoneDetailsView.html",
    "dojo/NodeList-dom"
], function (declare,
             lang,
             dom,
             domConstruct,
             domClass,
             query,
             on,
             _WidgetBase,
             _TemplatedMixin,
             presenter,
             bind,
             dbindExt,
             Animations,
             template) {

    function bindBasic(phone) {
        query(".phone-name").forEach(function (item) {
            bind(item).to(phone, "name");
        });

        query(".phone-description").forEach(function (item) {
            bind(item).to(phone, "description");
        });
    }

    function bindImages(self, phone) {

        phone.images.forEach(function (image) {
            domConstruct.place("<img class='phone' src='" + image + "'>", self.phoneMainImg);
            domConstruct.place("<li><img src='" + image + "'></li>", self.phoneThumbs);
        });

        query(".phone-thumbs img").on("click", function () {
            self.setImage(this);
        });

        self.set("mainImageUrl", phone.images[0]);
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
            bind(dbindExt.checkmark).to(phone.display, "touchScreen")
        );
    }

    function bindHardware(phone) {
        bind(dom.byId("phone-hardware-cpu")).to(phone.hardware, "cpu");
        bind(dom.byId("phone-hardware-usb")).to(phone.hardware, "usb");
        bind(dom.byId("phone-hardware-audioJack")).to(phone.hardware, "audioJack");
        bind(dom.byId("phone-hardware-fmRadio")).to(
            bind(dbindExt.checkmark).to(phone.hardware, "fmRadio")
        );
        bind(dom.byId("phone-hardware-accelerometer")).to(
            bind(dbindExt.checkmark).to(phone.hardware, "accelerometer")
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
        phoneMainImg: null,
        phoneThumbs: null,
        phoneAvailability: null,
        phoneDimensions: null,

        show: function (e) {
            this.clear();

            var self = this;
            this.phone = presenter.getById(e.params.id);

            this.phone.then(function (phone) {
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

        clear: function () {
            query("img.phone").attr({src: ""});

            domConstruct.empty(this.phoneMainImg);
            domConstruct.empty(this.phoneThumbs);
            domConstruct.empty(this.phoneAvailability);
            domConstruct.empty(this.phoneDimensions);
        },

        setImage: function (img) {
            this.set("mainImageUrl", img.src);
        },

        /* Getters and Setters */

        _setMainImageUrlAttr: function (val) {
            //ignore first time
            if (this.mainImageUrl != "") {
                query("img.phone").forEach(function (img) {
                    if (img.src.lastIndexOf(val) >= 0 && !domClass.contains(img, "active")) {
                        Animations.addClass(img, "active");
                        domClass.add(img, "active");
                    } else if (img.src.lastIndexOf(val) < 0 && domClass.contains(img, "active")) {
                        Animations.removeClass(img, "active");
                        domClass.remove(img, "active");
                    }
                });
            } else {
                domClass.add(query("img.phone")[0], "active");
            }
            this.mainImageUrl = val;
        }
    });

    return PhoneDetailsView;
});