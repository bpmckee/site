/**
 * angular-strap
 * @version v2.0.0-rc.2 - 2014-02-01
 * @link http://mgcrea.github.io/angular-strap
 * @author [object Object]
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('mgcrea.ngStrap.popover').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('popover/popover.tpl.html',
    "<div class=\"popover\" ng-show=\"content\"><div class=\"arrow\"></div><div class=\"popover-content\" ng-bind=\"content\"></div></div>"
  );

}]);
