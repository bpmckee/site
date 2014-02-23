/*
* Activity controller is responsible for:
*
* Pick up changes in route data / search strings.
*
 */
app.controller('activityCtrl',['$scope','activityService', '$window', '$route', '$location','$rootScope',
  function($scope, activityService, $window, $route, $location, $rootScope){
    console.log('---- in the activity controller ==== ');

    var scope = this;
    /*
    var scope = this;
    var activityItems = [];
    var numItemsThatCanFit = 1;

    var setItems = function(){
      scope.items = [];
      scope.overflowItems = [];
      var num = numItemsThatCanFit;
      if(activityItems.length-1 == num){ num++; }

      for(var i=0; i<activityItems.length; i++){
        if(i<num){
          scope.items.push(activityItems[i]);
        }else{
          scope.overflowItems.push(activityItems[i]);
        }
      }
    };

    var getNumItemsThatCanFit = function(){
      var num = 2;
      var width = $window.innerWidth;
      if(width < 355){
        num = 1;
      }else if(width < 400){
        num = 2;
      }else if(width < 445){
        num = 3;
      }else {
        num = 10;
      }
      return num;
    };

    var loadActivity = function(name){
      var activity = activityService.get(name);
      scope.name = activity.name;
      activityItems = activity.items || [];
      numItemsThatCanFit = getNumItemsThatCanFit();
      setItems();
      console.log('activity items set');
      console.log(scope.items);
      console.log(scope.overflowItems);
    };

    angular.element($window).bind('resize', function(){
      var oldNum = numItemsThatCanFit;
      numItemsThatCanFit = getNumItemsThatCanFit();
      if(oldNum != numItemsThatCanFit){
        setItems();
        $scope.$apply();
      }
    });
    */

    var buildActivityString = function(){
      var str = $location.path();
      var searchObj = $location.search();
      if(searchObj.view){
        str += searchObj.view.toLowerCase();
      }
      return str;
    };


    //watch for changes
    $scope.$on('$routeUpdate', function(){
      console.log('--- Activity Controller: found a route update! ---');
      var activity = buildActivityString();
      activityService.set(activity);
      $rootScope.$emit('activityChange',buildActivityString());
    });
    $scope.$on('$routeChangeStart', function(e, next, curr){
      console.log('--- Activity Controller: Route change started! ---');
      var activity = buildActivityString();
      activityService.set(activity);
      $rootScope.$emit('activityChange',buildActivityString());
    });

    //Subscribe to event bus
    $scope.$onEventBus('setActions', function(evt, actions, backBtn){
      console.log('You are trying to set the actions');
      console.log(evt);
      console.log(actions);
      scope.items = actions;
      scope.backBtn = backBtn;
    });
  }
]);