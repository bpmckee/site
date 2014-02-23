var app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'mgcrea.ngStrap',
    'templates.app',
    'templates.common'
]);

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/',{
        test: 'this is only a test',
        controller: "HomeCtrl",
        templateUrl: 'templates/buttons.tpl.html'
      })
      .when('/track/food/',{
        controller: "FoodLogCtrl",
        controllerAs: "food",
        templateUrl: 'templates/foodLog.tpl.html'
      })
      .when('/track/food/edit',{
        controller: "FoodLogCtrl",
        controllerAs: "food",
        templateUrl: 'templates/foodLog.tpl.html'
      })
      .when('/track/food/search',{
        controller: "FoodLogCtrl",
        controllerAs: "food",
        templateUrl: 'templates/foodLog.tpl.html',
        redirectOnSearch: false
      })
      .otherwise({
        redirectTo: '/'
      });
}]);


app.config(['$provide', function($provide){
  $provide.decorator('$rootScope', ['$delegate', function($delegate){

    Object.defineProperty($delegate.constructor.prototype, '$onEventBus', {
      value: function(name, listener){
        var unsubscribe = $delegate.$on(name, listener);
        this.$on('$destroy', unsubscribe);
      },
      enumerable: false
    });


    return $delegate;
  }]);
}]);

app.constant('FOOD_TYPE',{
  MEAL:0,
  FOOD:1,
  INGR:2
});



app.controller('AppCtrl', ['$scope', '$location', '$route',
  function ($scope, $location, $route) {
    $scope.location = $location;
    $scope.isAuthenticated = true;
    $scope.coolTest = {
      "title": "Ahh I guess this could be cool"
    };

    $scope.popoverTest = {
      title: "This is my title",
      content: "This is that content yo!"
    };

    $scope.billysBirthday = new Date(1991,1,28);
    /*console.log($route.current);
    console.log($route);
    console.log($route.current.$$route);*/
 /* $scope.home = function () {
    if ($scope.isAuthenticated) {
      $location.path('/authenticated');
    } else {
      $location.path('/');
    }
  };
  */
}]);
