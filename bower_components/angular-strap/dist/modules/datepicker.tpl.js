/**
 * angular-strap
 * @version v2.0.0-rc.2 - 2014-02-01
 * @link http://mgcrea.github.io/angular-strap
 * @author [object Object]
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('mgcrea.ngStrap.datepicker').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('datepicker/datepicker.tpl.html',
    "<div class=\"popover datepicker\" ng-class=\"'datepicker-mode-' + $mode\"><div class=\"arrow\"></div><div class=\"controls\"><button type=\"button\" tabindex=\"-1\" ng-click=\"$selectPane(-1)\"><i class=\"fa fa-chevron-left\"></i></button> <button type=\"button\" tabindex=\"-1\" ng-click=\"$toggleMode()\"><span ng-bind=\"title\"></span></button> <button type=\"button\" tabindex=\"-1\" ng-click=\"$selectPane(+1)\"><i class=\"fa fa-chevron-right\"></i></button></div><div class=\"table\" ng-class=\"{showLabels: labels}\"><div class=\"labels table-row\" ng-show=\"labels\"><span ng-repeat=\"label in labels\">{{ label }}</span></div><div class=\"table-row\" ng-repeat=\"(i,row) in rows\" height=\"{{ 100/rows.length }}%\"><div ng-repeat=\"(j,el) in row\"><button type=\"button\" tabindex=\"-1\" ng-class=\"{'selected': el.selected, 'muted':el.muted}\" ng-click=\"$select(el.date)\" ng-disabled=\"el.disabled\">{{ el.label }}</button></div></div></div></div>"
  );

}]);
