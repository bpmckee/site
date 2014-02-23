app.controller('FoodLogCtrl', ['$scope', 'trackService','foodLogService','$rootScope','activityService',
  function ($scope, trackService,foodLogService, $rootScope, activityService) {
    console.log('--- Food Log Controller: is initializing ---');

    var scope = this;

    //event bus subscriptions
    $scope.$onEventBus('activityChange', function(evt, activity){
      console.log('--- food log controller: activity changed ---');
      foodLogService.setActivity(activity);
    });


    //init
    var initModel = function(){
      var date = trackService.getDate();
      var activity = foodLogService.getActivity();
      var obj = foodLogService.getObj(date);
      foodLogService.cleanData(obj);
      scope.model = {
        date: date,
        obj: obj,
        activity: activity
      };
      scope.api = activity.api;
    };

    var initWatchers = function(){//TODO: check if dropdown has callback
      //watch for date changes
      $scope.$watch('food.model.date',function(newVal, oldVal){
        if(newVal.toDateString() == oldVal.toDateString()) { return; }

        trackService.setDate(newVal);
        scope.model.obj = foodLogService.getObj(newVal);
      },true);
    };

    var init = function(){
      var activity = activityService.get();
      foodLogService.setActivity(activity);
      initModel();
      initWatchers();
    };

    init();
  }
]);