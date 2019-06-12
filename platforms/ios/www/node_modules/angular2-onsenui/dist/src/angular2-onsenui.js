/// <reference path="../dist/onsenui.d.ts" />
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('@angular/core'));
__export(require('./directives/ons-navigator'));
__export(require('./directives/ons-tabbar'));
__export(require('./directives/ons-switch'));
__export(require('./directives/ons-range'));
__export(require('./directives/ons-input'));
__export(require('./directives/ons-pull-hook'));
__export(require('./directives/ons-lazy-repeat'));
__export(require('./directives/ons-splitter'));
__export(require('./ons/notification'));
__export(require('./ons/platform'));
__export(require('./ons/alert-dialog-factory'));
__export(require('./ons/popover-factory'));
__export(require('./ons/dialog-factory'));
__export(require('./ons/modal-factory'));
__export(require('./ons/params'));
var core_2 = require('@angular/core');
var common_1 = require('@angular/common');
var platform_browser_1 = require('@angular/platform-browser');
var ons_navigator_2 = require('./directives/ons-navigator');
var ons_tabbar_2 = require('./directives/ons-tabbar');
var ons_switch_2 = require('./directives/ons-switch');
var ons_range_2 = require('./directives/ons-range');
var ons_input_2 = require('./directives/ons-input');
var ons_pull_hook_2 = require('./directives/ons-pull-hook');
var ons_lazy_repeat_2 = require('./directives/ons-lazy-repeat');
var ons_splitter_2 = require('./directives/ons-splitter');
var alert_dialog_factory_2 = require('./ons/alert-dialog-factory');
var popover_factory_2 = require('./ons/popover-factory');
var dialog_factory_2 = require('./ons/dialog-factory');
var modal_factory_2 = require('./ons/modal-factory');
var component_loader_1 = require('./ons/component-loader');
var directives = [
    ons_navigator_2.OnsNavigator,
    ons_tabbar_2.OnsTab,
    ons_switch_2.OnsSwitch,
    ons_range_2.OnsRange,
    ons_input_2.OnsInput,
    ons_pull_hook_2.OnsPullHook,
    ons_lazy_repeat_2.OnsLazyRepeat,
    ons_splitter_2.OnsSplitterSide,
    ons_splitter_2.OnsSplitterContent
];
var OnsenModule = (function () {
    function OnsenModule() {
    }
    OnsenModule.decorators = [
        { type: core_2.NgModule, args: [{
                    imports: [platform_browser_1.BrowserModule, common_1.CommonModule],
                    declarations: [directives],
                    exports: [
                        directives,
                        platform_browser_1.BrowserModule
                    ],
                    providers: [
                        alert_dialog_factory_2.AlertDialogFactory,
                        popover_factory_2.PopoverFactory,
                        dialog_factory_2.DialogFactory,
                        modal_factory_2.ModalFactory,
                        component_loader_1.ComponentLoader
                    ]
                },] },
    ];
    /** @nocollapse */
    OnsenModule.ctorParameters = function () { return []; };
    return OnsenModule;
}());
exports.OnsenModule = OnsenModule;
//# sourceMappingURL=angular2-onsenui.js.map