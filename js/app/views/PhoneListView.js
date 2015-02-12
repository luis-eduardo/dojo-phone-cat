'use strict';

define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/on",
    "dojo/dom",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/query",
    "dojo/when",
    "dojo/Stateful",
    "dojo/ready",
    "dojo/parser",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/registry",
    "../presenters/PhoneListPresenter",
    "./widgets/PhoneRow",
    "dbind/bind",
    "../utils/Animations",
    "../utils/sets",
    "dojo/text!./_templates/PhoneListView.html"
], function (declare,
             array,
             on,
             dom,
             domClass,
             domConstruct,
             query,
             when,
             Stateful,
             ready,
             parser,
             _WidgetBase,
             _TemplatedMixin,
             _WidgetsInTemplateMixin,
             registry,
             presenter,
             PhoneRow,
             bind,
             Animations,
             sets,
             template) {

    var transitionEvent = Animations.whichTransitionEvent();

    function addPhoneRow(self, phone) {
        var newRow = new PhoneRow({phone: phone});
        domClass.add(newRow.domNode, "on-enter");
        newRow.placeAt(self.itemsContainer);
        self.phoneRows.push(newRow);
    }

    function existsPhone(self, phone) {
        return array.some(self.phoneList, function (item) {
            return phone.id == item.id;
        });
    }

    function getPhoneRow(self, phone) {
        var filteredArr = array.filter(self.phoneRows, function (item) {
            return item.phone == phone;
        });
        return filteredArr.length > 0 ? filteredArr[0] : undefined;
    }

    function removePhoneRow(self, row) {
        domClass.add(row.domNode, "on-leave");
        var index = array.indexOf(self.phoneRows, row);
        self.phoneRows.splice(index, 1);
    }

    var PhoneListView = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,

        phoneList: null,

        phoneRows: null,

        mainScope: null,

        //attach-points declarations
        itemsContainer: null,

        postCreate: function () {
            var self = this;
            this.phoneList = [];
            this.phoneRows = [];
            this.mainScope = new Stateful({});

            bind(registry.byId("query")).to(this.mainScope, "query");
            bind(dom.byId("sort")).to(this.mainScope, "sort");

            this.mainScope.set("sort", "age");

            this.updatePhoneList();

            presenter.on("productsUpdate", function () {
                self.updatePhoneList();
            });

            this.mainScope.watch(function (name, oldValue, newValue) {
                if (name == "query") {
                    presenter.setQuery(newValue);
                } else if (name == "sort") {
                    presenter.setSort(newValue);
                }
            });
        },

        updatePhoneList: function () {
            var self = this;

            var newArr = [];

            when(presenter.getAll(), function (result) {
                newArr = result;

                var minusArr = sets.minus(self.phoneList, newArr, "id");

                newArr.forEach(function (phone) {
                    var newIndex = array.indexOf(newArr, phone);
                    var oldIndex = array.indexOf(self.phoneList, phone);
                    if (newIndex != oldIndex) {
                        if (!existsPhone(self, phone)) {
                            addPhoneRow(self, phone);
                        } else {
                            var row = getPhoneRow(self, phone);
                            if (row) {
                                domClass.add(row.domNode, "on-enter");
                                domConstruct.place(row.domNode, self.itemsContainer, newIndex);
                            }
                        }
                    }
                });

                minusArr.forEach(function (phone) {
                    var row = getPhoneRow(self, phone);
                    if (row) {
                        removePhoneRow(self, row);
                    }
                });

                setTimeout(function () {
                    query(".phone-listing.on-enter", self.itemsContainer).forEach(function (row) {
                        domClass.add(row, "on-enter-active");

                        on.once(row, transitionEvent, function () {
                            domClass.remove(row, "on-enter");
                            domClass.remove(row, "on-enter-active");
                        });
                    });

                    query(".phone-listing.on-leave", self.itemsContainer).forEach(function (row) {
                        domClass.add(row, "on-leave-active");

                        on.once(row, transitionEvent, function () {
                            domClass.remove(row, "on-leave");
                            domClass.remove(row, "on-leave-active");
                            var widget = registry.byNode(row);
                            if (widget) {
                                widget.destroy();
                            }
                        });
                    });
                });

                self.phoneList = newArr;
            });
        }
    });

    return PhoneListView;
});