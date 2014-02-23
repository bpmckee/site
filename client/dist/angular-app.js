/*! angular - v0.0.1 - 2014-02-23
* https://github.com/bpmckee
* Copyright (c) 2014 angular McKee;*/
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
app.controller('HomeCtrl', ['$scope',
  function ($scope) {
    var scope = this;
  }
]);
app.controller('NavCtrl', ['$scope','navService',function ($scope,navService){
  var scope = this;

  //api functions
  var openMenu = function(){
    scope.menuOpen = true;
    return false;
  };
  var closeMenu = function(){
    scope.menuOpen = false;
    return false;
  };

  //private functions
  var parseActiveRoutes = function(path){
    var routes = path.substr(1).split('/'); //strip first character then split
    scope.active = (routes[0] || '').toLowerCase();
    scope.activeSubNav = (routes[1] || '').toLowerCase();
  };
  var getTabs = function(){
    scope.subNav = navService.getTabs(scope.active);
  };
  var setNavLabel = function(){
    var navArr = scope.siteMap;
    for(var i=0; i<navArr.length; i++){
      if(navArr[i].activeWhen==scope.active){
        scope.title=navArr[i].label;
        break;
      }
    }
  };

  $scope.$on("$routeChangeStart", function(e, next, curr){
    parseActiveRoutes(next.$$route.originalPath);
    getTabs();
    setNavLabel();
  });

  //view model
  scope.menuOpen = false;
  scope.siteMap = navService.siteMap;
  scope.subNav = [];
  scope.title="Home";

  //api
  scope.open = openMenu;
  scope.close = closeMenu;
}]);
app.directive('actionBar',function(){
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'templates/actionBar.tpl.html'
  };
});

app.directive('actionItem',['$compile',function($compile){
  return {
    scope: true,
    link: function(scope, element, attrs){
      attrs.$observe('template',function(tpl){
        if(angular.isDefined(tpl)){
          var el = $compile(tpl)(scope);
          element.replaceWith(el);
        }
      });
    }
  };
}]);
app.directive("nav", ['$dropdown',function ($dropdown) {
  return {
    restrict: 'EA',
    link: function(scope, element){
      scope.userDropdown = [
        {
          "text":"Logout",
          "href":"#"
        },
        {
          "text":"Settings",
          "href":"test"
        }
      ];
    },
    templateUrl: 'templates/nav.tpl.html',
    transclude: 'element',
    replace: true
  };
}]);
app.directive('subNav',function(){
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'templates/subNav.tpl.html'
  };
});
app.service('activityService', ['$document',
  function($document){

    var activityName = '/';


    this.set = function(name){
      activityName = name.toLowerCase();
    };

    this.get = function(){
      return activityName;
    };
  }
]);
app.service('foodLogService', ['$document', '$rootScope','FOOD_TYPE', function($document, $rootScope,FOOD_TYPE){
  var data = [
    {
      id:'486dbda955704d2d8105b6da1b1ea7a7',
      name:'Meal',
      type:FOOD_TYPE.MEAL,
      nutrition:[1,2,3,4,5,6],
      children:[]
    },
    {
      id: 'da132d5834694973ae6d5774247726bd',
      name:'Meal Ingr',
      type:FOOD_TYPE.MEAL,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id: '6e2b5e17ab4c4ab08d9361d6e624ee06',
          name: 'Meal Ingr',
          type:FOOD_TYPE.INGR,
          brand: 'Roundy\'s',
          servings: '12" sub',
          nutrition:[1,2,3,4,5,6]
        }
      ]
    },
    {
      id: '3fd9e7e67011462794ae9803b374c778',
      name:'Meal Ingr Ingr',
      type:FOOD_TYPE.MEAL,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id: 'f0ca9ac49b8141d28f542cc5cc0cbb23',
          name: 'Meal Ingr Ingr',
          type:FOOD_TYPE.INGR,
          brand: 'Roundy\'s',
          servings: '12" sub',
          nutrition:[1,2,3,4,5,6]
        },
        {
          id: '83ce4d0561694382859f49297ff41413',
          name: 'Meal Ingr Ingr',
          type:FOOD_TYPE.INGR,
          brand: 'Roundy\'s',
          servings: '12" sub',
          nutrition:[1,2,3,4,5,6]
        }
      ]
    },
    {
      id: 'ace0660cf6af460ba978fbba0aadb4ca',
      name:'Meal Ingr Ingr Ingr',
      type:FOOD_TYPE.MEAL,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id:'c76f8fc5b51440e397d93d230c27c5b2',
          name: 'Meal Ingr Ingr Ingr',
          type:FOOD_TYPE.INGR,
          brand: 'Roundy\'s',
          servings: '12" sub',
          nutrition:[1,2,3,4,5,6]
        },
        {
          id: '6b11c6e2c1524120afea328d1d1b499e',
          name: 'Meal Ingr Ingr Ingr',
          type:FOOD_TYPE.INGR,
          brand: 'Roundy\'s',
          servings: '12" sub',
          nutrition:[1,2,3,4,5,6]
        }
      ]
    },
    {
      id: 'de9fa42cc77843f18a40bc00765eefa1',
      name:'Meal Food',
      type:FOOD_TYPE.FOOD,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id:'da8071b90de1439889c52cb3f49bf3d1',
          name: 'Meal Food',
          type:FOOD_TYPE.FOOD,
          children: [],
          nutrition:[1,2,3,4,5,6]
        }
      ]
    },
    {
      id:'c6ef80bda9514f77b5bfdf0e54d58613',
      name:'Meal Food Food',
      type:FOOD_TYPE.FOOD,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id: '4118ba64b7cc40a1b9521d79c9e03bbb',
          name: 'Meal Food Food',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children: []
        },
        {
          id:'e051877b03374e3e869a6f22ebd58fb2',
          name: 'Meal Food Food',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children: []
        }
      ]
    },
    {
      id:'ee15d36c61534465a4976591e72e7d95',
      name:'Meal Food Food Food',
      type:FOOD_TYPE.FOOD,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id:'4ed8bc012cb4421c89fe81d65aafd75f',
          name: 'Meal Food Food Food',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children: []
        },
        {
          id:'759ca5865ff24b7f85e1ff938ff797c6',
          name: 'Meal Food Food Food',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children: []
        },
        {
          id:'b836ac5b078c4c598b5afe6f94dcd385',
          name: 'Meal Food Food Food',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children: []
        }
      ]
    },
    {
      id:'2b5c2cd53cdc4121a7690b63444e99b8',
      name: 'Meal Ingr Food',
      type:FOOD_TYPE.MEAL,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id:'9792716fd43b49bda03b9ee3b3a1f4a9',
          name: 'Meal Ingr Food',
          type:FOOD_TYPE.INGR,
          brand: 'test brand',
          servings: 'test servings',
          nutrition:[1,2,3,4,5,6]
        },
        {
          id:'ac031af3a0ef4a3293bcb02f1673ed9d',
          name: 'Meal Ingr Food',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children:[]
        }
      ]
    },
    {
      id:'eb8b086a529443cda61a7618c4e7592d',
      name: 'Meal Food Ingr',
      type:FOOD_TYPE.MEAL,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id:'b502b17409f74c5ca86f375b83e46718',
          name: 'Meal Food Ingr',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children:[]
        },
        {
          id:'11f16312750a4e9181541da63e33dd88',
          name: 'Meal Food Ingr',
          type:FOOD_TYPE.INGR,
          brand: 'test brand',
          servings: 'test servings',
          nutrition:[1,2,3,4,5,6]
        }
      ]
    },
    {
      id:'cc9665c2811e4964ac749640776b923d',
      name: 'Meal Ingr Food Ingr',
      type:FOOD_TYPE.MEAL,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id:'c003ed18902f4563864ea759c7f3bcb3',
          name: 'Meal Ingr Food Ingr',
          type:FOOD_TYPE.INGR,
          brand: 'test brand',
          servings: 'test servings',
          nutrition:[1,2,3,4,5,6]
        },
        {
          id:'5625295eb3f74afa9ff0a9e3d41f139d',
          name: 'Meal Ingr Food Ingr',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children:[]
        },
        {
          id:'26eebb64d4a34469bea004c95edb9ff7',
          name: 'Meal Ingr Food Ingr',
          type:FOOD_TYPE.INGR,
          brand: 'test brand',
          servings: 'test servings',
          nutrition:[1,2,3,4,5,6]
        }
      ]
    },
    {
      id:'4d13686dbacf4d6eab3e9f4d108688bf',
      name: 'Meal Food Ingr Food',
      type:FOOD_TYPE.MEAL,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id:'65c8560ed39d4061a9e8f9e68829828d',
          name: 'Meal Food Ingr Food',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children:[]
        },
        {
          id:'0d1fb0ffbba34d428a948bf505452ae0',
          name: 'Meal Food Ingr Food',
          type:FOOD_TYPE.INGR,
          brand: 'test brand',
          servings: 'test servings',
          nutrition:[1,2,3,4,5,6]
        },
        {
          id:'d48040d346834dbfa0e7b3b2cc7641f2',
          name: 'Meal Food Ingr Food',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children:[]
        }
      ]
    },
    {
      id:'132a70076bac4e05be83af69761cee54',
      name: 'Meal Food - Ingr',
      type:FOOD_TYPE.MEAL,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id:'4454cf42ab6945b1bce6a7814ccc442d',
          name: 'Meal Food - Ingr',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children:[
            {
              id:'c89270e03ed2428d903403617513c9c5',
              name: 'Meal Food - Ingr',
              type:FOOD_TYPE.INGR,
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            }
          ]
        }
      ]
    },
    {
      id:'6b81bd0c8549470dadad9bb6f2e426ba',
      name: 'Meal Food - Ingr Ingr',
      type:FOOD_TYPE.MEAL,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id:'0bdb84fae1bd49ce9d2dbc959a886f94',
          name: 'Meal Food - Ingr Ingr',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children:[
            {
              id:'be3d626477d14ceca9cd652a52019694',
              name: 'Meal Food - Ingr Ingr',
              type:FOOD_TYPE.INGR,
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            },
            {
              id:'8682fbc1284a4900a3a3a8753f083e97',
              name: 'Meal Food - Ingr Ingr',
              type:FOOD_TYPE.INGR,
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            }
          ]
        }
      ]
    },
    {
      id:'fff13912ee3a4639a1399188a38b9431',
      name: 'Meal Food - Ingr Ingr Ingr',
      type:FOOD_TYPE.MEAL,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id:'7cb56ec883e24919a929940e0ae0ce62',
          name: 'Meal Food - Ingr Ingr Ingr',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children:[
            {
              id:'e48e1f1644604291917f64f536577b1a',
              name: 'Meal Food - Ingr Ingr Ingr',
              type:FOOD_TYPE.INGR,
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            },
            {
              id:'db68ff91ac09464a914d0cb6d994ae13',
              name: 'Meal Food - Ingr Ingr Ingr',
              type:FOOD_TYPE.INGR,
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            },
            {
              id:'4cf7603cb41e41d89548844d4faf55ff',
              name: 'Meal Food - Ingr Ingr Ingr',
              type:FOOD_TYPE.INGR,
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            }
          ]
        }
      ]
    },
    {
      id:'e7538993373949c1967b0859bbfd4594',
      name: 'Meal Food - Ingr, Ingr',
      type:FOOD_TYPE.MEAL,
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          id:'29af986980ca4393805b84b244ccc71e',
          name: 'Meal Food - Ingr, Ingr',
          type:FOOD_TYPE.FOOD,
          nutrition:[1,2,3,4,5,6],
          children:[
            {
              id:'2495c0d7e7a3401285afb6a56c6261f1',
              name: 'Meal Food - Ingr, Ingr',
              type:FOOD_TYPE.INGR,
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            }
          ]
        },
        {
          id:'817bd6351a304369a74226f5c1e04d33',
          name: 'Meal Food - Ingr, Ingr',
          type:FOOD_TYPE.INGR,
          brand: 'test brand',
          servings: 'test servings',
          nutrition:[1,2,3,4,5,6]
        }
      ]
    }
  ];

  var data2 = [
    {
      id:'b3829e525ffd42e399a3b185457e1c1e',
      name:'Meallllllll',
      type:FOOD_TYPE.MEAL,
      nutrition:[1,2,3,4,5,6,7,8,9,10],
      children: [
        {
          id:'d8696f80c24d463c9e661b11a1334f36',
          name: 'Meal thinger!',
          type:FOOD_TYPE.INGR,
          brand: 'Roundy\'s',
          servings: '12" sub',
          nutrition:[1,2,3,4,5,6]
        }
      ]
    },
    {
      id:'4a0893574895422a87091870a45fd04f',
      name: "Lunch",
      type:FOOD_TYPE.MEAL,
      nutrition: [],
      children:[]
    },
    {
      id:'7c086326add34d8bb7b1430aa6c3b0f8',
      name: 'Dinner',
      type:FOOD_TYPE.MEAL,
      nutrition: [],
      children:[]
    }];

  //private variables
  var currSelected = {};

  var currActivity;

  //private methods
  var getActivity = function(name){
    var activity = activityData.filter(function(obj){
      return obj.name == name;
    })[0];
    //TODO: redirect or something if !activity
    return activity;
  };

  var recalcActions = function(){
    //this method should only be called when the activity is track.food.edit
    //get num meal, num food, num ingr.
    var numMeal = currSelected.nums[FOOD_TYPE.MEAL],
        numFood = currSelected.nums[FOOD_TYPE.FOOD],
        numIngr = currSelected.nums[FOOD_TYPE.INGR];

    currActivity.settings = {
      delete: numMeal===0,
      edit: (numMeal + numFood + numIngr) <= 1,
      favorite: numMeal===0,
      shopping: true
    };
    console.log(currActivity.settings);
    console.log(currSelected.nums);
  };

  var calcKey = function(obj){
    var str = obj.id.toString();
    if(obj.parent != null){
      str += '_' + calcKey(obj.parent);
    }
    return str;
  };

  var toggleSelected = function(obj){
    obj.selected = !obj.selected;
    var key = calcKey(obj);
    var index = -1;
    for(var i=0; i<currSelected.arr.length; i++){
      if(currSelected.arr[i].key === key){
        index = i;
        break;
      }
    }
    if(index == -1){
      currSelected.arr.push({
        key:key,
        val:obj
      });
      currSelected.nums[obj.type]++;
    }else{
      currSelected.arr.splice(index,1);
      currSelected.nums[obj.type]--;
    }

    recalcActions();
  };

  var deleteSelected = function(){
    for(var i=0; i<currSelected.arr.length; i++){
      var sel = currSelected.arr[i].val;
      if(sel.type==FOOD_TYPE.MEAL) { continue; }

      var parChildren = sel.parent.children;
      //get index of key.
      var key = sel.id;
      var index=-1;
      for(var j=0; j<parChildren.length;j++){
        if(parChildren[j].id==key){
          index = j;
          break;
        }
      }
      parChildren.splice(index,1);
    }
  };

  //public methods
  this.getObj = function(date){

    //normally would be http-get to retrieve data.
    console.log(date.toDateString());
    if(date.toDateString() == (new Date()).toDateString()){
      return data;
    }else{
      return data2;
    }
  };

  //------ activity stuff
  var activityData = [
    {
      name: '/track/food/',
      mode: 'log',
      actions: [
        '<a href="#" class="btn" data-placement="bottom" data-content="test" bs-popover><i class="fa fa-plus"></i></a>',
        '<button type="button" class="btn" data-placement="bottom-right" bs-datepicker ng-model="food.model.date"><i class="fa fa-calendar"></i></button>',
        '<a href="/track/food/edit" class="btn"><i class="fa fa-pencil"></i></a>'
      ],
      api: {
        toggleSelect: function(){return false;}
      }
    },
    {
      name: '/track/food/edit',
      mode: 'edit',
      actions: [ //TODO: add "create meal"
        '<button type="button" class="btn" ng-click="food.api.delete()" ng-class="{\'disabled\':!food.model.activity.settings.delete}"><i class="fa fa-trash-o"></i></button>',
        '<button type="button" class="btn" ng-click="food.api.thing()" ng-class="{\'disabled\':!food.model.activity.settings.edit}"><i class="fa fa-pencil"></i></button>',
        '<button type="button" class="btn" ng-click="food.api.thing()" ng-class="{\'disabled\':!food.model.activity.settings.favorite}"><i class="fa fa-heart"></i></button>',
        '<button type="button" class="btn" ng-click="food.api.thing()" ng-class="{\'disabled\':!food.model.activity.settings.shopping}"><i class="fa fa-shopping-cart"></i></button>'
      ],
      backBtn: '<a href="/track/food/" class="btn"><i class="fa fa-check"></i><span>Done</span></a>',
      settings: {
        delete: false,
        edit: false,
        favorite: false,
        shopping: false
      },
      api: {
        toggleSelect: function(obj){toggleSelected(obj);},
        delete:function(){deleteSelected();}
      }
    }
  ];

  var cleanActivityData = function(arr, parent){
    angular.forEach(arr, function(val, key){
      val.parent = parent;
      val.selected = false;
      if(val.hasOwnProperty('children')){
        cleanActivityData(val.children, val);
      }
    });
  };

  this.cleanData = function(arr){
    console.log('--- cleaning data');
    cleanActivityData(arr, null);
    console.log(arr);
  };

  this.getActivity = function(){
    return currActivity ;
  };
  this.setActivity = function(name){
    currActivity = getActivity(name);
    $rootScope.$emit('setActions',currActivity.actions, currActivity.backBtn);
    currSelected = {
      arr:[],
      nums:[0,0,0]
    };
  };
}]);
app.service('navService', ['$document',function($document){
  this.siteMap = [
    {
      label: "Home",
      icon: "home",
      href: "/",
      activeWhen: "home"
    },
    {
      label: "Track",
      icon: "plus",
      href: "/track/food/",
      activeWhen: "track",
      tabs: [
        { label: "Food", href: "/track/food/", activeWhen: "food" },
        { label: "Exercise", href: "/track/exercise/", activeWhen: "exercise" },
        { label: "Body", href:"/track/body/", activeWhen: "body" }]
    },
    {
      label: "Nutrition",
      icon: "cutlery",
      href: "#",
      activeWhen: "nutrition",
      tabs: ["Tab 1"]
    },
    {
      label: "Exercise",
      icon: "dribbble",
      href: "#",
      activeWhen: "exercise"
    },
    {
      label: "Knowledge",
      icon: "lightbulb-o",
      href: "#",
      activeWhen: "knowledge"
    },
    {
      label: "Stats",
      icon: "bar-chart-o",
      href: "#",
      activeWhen: "stats"
    },
    {
      label: "Forums",
      icon: "comments-o",
      href: "#",
      activeWhen: "forums"
    },
    {
      label: "Challenges",
      icon: "trophy",
      href: "#",
      activeWhen: "challenges"
    },
    {
      label: "Profile",
      icon: "user",
      href: "#",
      activeWhen: "profile"
    }
  ];

  this.getTabs = function(activeNav){
    activeNav = activeNav || "";
    var index = this.siteMap.map(function(m){
      return m.activeWhen;
    }).indexOf(activeNav.toLowerCase());

    if(index == -1){ return []; }

    return this.siteMap[index].tabs;
  };

}]);
app.service('trackService',
  function(){
    var date = new Date();
    this.setDate = function(newDate){
      date = newDate;
    };
    this.getDate = function(){
      return date;
    };
  }
);
app.controller('FoodTableCtrl',['$scope',function($scope){
  $scope.data = [
    {
      name:'Meal',
      type:'meal',
      nutrition:[1,2,3,4,5,6],
      children:[]
    },
    {
      name:'Meal Ingr',
      type:'meal',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Ingr',
          type: 'ingr',
          brand: 'Roundy\'s',
          servings: '12" sub',
          nutrition:[1,2,3,4,5,6]
        }
      ]
    },
    {
      name:'Meal Ingr Ingr',
      type:'meal',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Ingr Ingr',
          type: 'ingr',
          brand: 'Roundy\'s',
          servings: '12" sub',
          nutrition:[1,2,3,4,5,6]
        },
        {
          name: 'Meal Ingr Ingr',
          type: 'ingr',
          brand: 'Roundy\'s',
          servings: '12" sub',
          nutrition:[1,2,3,4,5,6]
        }
      ]
    },
    {
      name:'Meal Ingr Ingr Ingr',
      type:'meal',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Ingr Ingr Ingr',
          type: 'ingr',
          brand: 'Roundy\'s',
          servings: '12" sub',
          nutrition:[1,2,3,4,5,6]
        },
        {
          name: 'Meal Ingr Ingr Ingr',
          type: 'ingr',
          brand: 'Roundy\'s',
          servings: '12" sub',
          nutrition:[1,2,3,4,5,6]
        }
      ]
    },
    {
      name:'Meal Food',
      type:'food',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Food',
          type: 'food',
          children: [],
          nutrition:[1,2,3,4,5,6]
        }
      ]
    },
    {
      name:'Meal Food Food',
      type:'food',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Food Food',
          type: 'food',
          nutrition:[1,2,3,4,5,6],
          children: []
        },
        {
          name: 'Meal Food Food',
          type: 'food',
          nutrition:[1,2,3,4,5,6],
          children: []
        }
      ]
    },
    {
      name:'Meal Food Food Food',
      type:'food',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Food Food Food',
          type: 'food',
          nutrition:[1,2,3,4,5,6],
          children: []
        },
        {
          name: 'Meal Food Food Food',
          type: 'food',
          nutrition:[1,2,3,4,5,6],
          children: []
        },
        {
          name: 'Meal Food Food Food',
          type: 'food',
          nutrition:[1,2,3,4,5,6],
          children: []
        }
      ]
    },
    {
      name: 'Meal Ingr Food',
      type: 'meal',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Ingr Food',
          type: 'ingr',
          brand: 'test brand',
          servings: 'test servings',
          nutrition:[1,2,3,4,5,6],
        },
        {
          name: 'Meal Ingr Food',
          type:'food',
          nutrition:[1,2,3,4,5,6],
          children:[]
        }
      ]
    },
    {
      name: 'Meal Food Ingr',
      type: 'meal',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Food Ingr',
          type:'food',
          nutrition:[1,2,3,4,5,6],
          children:[]
        },
        {
          name: 'Meal Food Ingr',
          type: 'ingr',
          brand: 'test brand',
          servings: 'test servings',
          nutrition:[1,2,3,4,5,6],
        }
      ]
    },
    {
      name: 'Meal Ingr Food Ingr',
      type: 'meal',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Ingr Food Ingr',
          type: 'ingr',
          brand: 'test brand',
          servings: 'test servings',
          nutrition:[1,2,3,4,5,6],
        },
        {
          name: 'Meal Ingr Food Ingr',
          type:'food',
          nutrition:[1,2,3,4,5,6],
          children:[]
        },
        {
          name: 'Meal Ingr Food Ingr',
          type: 'ingr',
          brand: 'test brand',
          servings: 'test servings',
          nutrition:[1,2,3,4,5,6]
        }
      ]
    },
    {
      name: 'Meal Food Ingr Food',
      type: 'meal',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Food Ingr Food',
          type:'food',
          nutrition:[1,2,3,4,5,6],
          children:[]
        },
        {
          name: 'Meal Food Ingr Food',
          type: 'ingr',
          brand: 'test brand',
          servings: 'test servings',
          nutrition:[1,2,3,4,5,6]
        },
        {
          name: 'Meal Food Ingr Food',
          type:'food',
          nutrition:[1,2,3,4,5,6],
          children:[]
        }
      ]
    },
    {
      name: 'Meal Food - Ingr',
      type: 'meal',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Food - Ingr',
          type:'food',
          nutrition:[1,2,3,4,5,6],
          children:[
            {
              name: 'Meal Food - Ingr',
              type: 'ingr',
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            }
          ]
        }
      ]
    },
    {
      name: 'Meal Food - Ingr Ingr',
      type: 'meal',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Food - Ingr Ingr',
          type:'food',
          nutrition:[1,2,3,4,5,6],
          children:[
            {
              name: 'Meal Food - Ingr Ingr',
              type: 'ingr',
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            },
            {
              name: 'Meal Food - Ingr Ingr',
              type: 'ingr',
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            }
          ]
        }
      ]
    },
    {
      name: 'Meal Food - Ingr Ingr Ingr',
      type: 'meal',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Food - Ingr Ingr Ingr',
          type:'food',
          nutrition:[1,2,3,4,5,6],
          children:[
            {
              name: 'Meal Food - Ingr Ingr Ingr',
              type: 'ingr',
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            },
            {
              name: 'Meal Food - Ingr Ingr Ingr',
              type: 'ingr',
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            },
            {
              name: 'Meal Food - Ingr Ingr Ingr',
              type: 'ingr',
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            }
          ]
        }
      ]
    },
    {
      name: 'Meal Food - Ingr, Ingr',
      type: 'meal',
      nutrition:[1,2,3,4,5,6],
      children: [
        {
          name: 'Meal Food - Ingr, Ingr',
          type:'food',
          nutrition:[1,2,3,4,5,6],
          children:[
            {
              name: 'Meal Food - Ingr, Ingr',
              type: 'ingr',
              brand: 'test brand',
              servings: 'test servings',
              nutrition:[1,2,3,4,5,6]
            }
          ]
        },
        {
          name: 'Meal Food - Ingr, Ingr',
          type: 'ingr',
          brand: 'test brand',
          servings: 'test servings',
          nutrition:[1,2,3,4,5,6]
        }
      ]
    }
  ];
}]);

app.directive('foodTable',function() {
  var link = function(scope, element, attrs, ctrls){
  };
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'foodTable/foodTable2.tpl.html',
    link: link
  };
});
//############ Utilities ###############

Date.prototype.addMonths = function(offset){
  var dt = new Date(this);
  dt.setMonth(dt.getMonth()+ offset) ;
  if (dt.getDate() < this.getDate()) { dt.setDate(0); } //setDate 0 will set last day of previous month
  return dt;
};
Date.prototype.addDays = function(offset) {
  var dt = new Date(this.valueOf());
  dt.setDate(dt.getDate() + offset);
  return dt;
};
Date.prototype.compare = function(date, comparison) {
  //set variables
  var dt1 = new Date(this.valueOf());
  var dt2 = new Date(date.valueOf());
  comparison = comparison.toLowerCase();

  //set functions
  function compare(d1, d2){
    var date1 = d1.valueOf();
    var date2 = d2.valueOf();
    if(date1 < date2){
      return -1;
    } else if (date1 > date2) {
      return 1;
    }
    return 0;
  }

  //run logic
  dt1.setMinutes(0,0,0);
  dt2.setMinutes(0,0,0);
  if(comparison === 'hour'){
    return compare(dt1, dt2);
  }

  dt1.setHours(0);
  dt2.setHours(0);
  if(comparison === 'day'){
    return compare(dt1, dt2);
  }

  dt1.setDate(1);
  dt2.setDate(1);
  if(comparison === 'month'){
    return compare(dt1, dt2);
  }

  dt1.setMonth(0);
  dt2.setMonth(0);
  if(comparison === 'year'){
    return compare(dt1, dt2);
  }
  throw "Invalid comparison type";


};
//############ END Utilities ###############
angular.module('templates.app', ['foodTable/foodTable.tpl.html', 'foodTable/foodTable2.tpl.html', 'templates/actionBar.tpl.html', 'templates/buttons.tpl.html', 'templates/foodLog.tpl.html', 'templates/foodLogAddTo.tpl.html', 'templates/nav.tpl.html', 'templates/subNav.tpl.html', 'templates/test.tpl.html']);

angular.module("foodTable/foodTable.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("foodTable/foodTable.tpl.html",
    "<div id=\"food-table\"><div id=\"food-table-left\"><div class=\"stretcher\"><div class=\"meal-wrapper empty\" data-scenario=\"1\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-right\"></i></button> <span>Meal</span></div><div class=\"contents\"></div></div><div class=\"meal-wrapper\" data-scenario=\"2\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Ingr</span></div><div class=\"contents\"><div class=\"ingr\"><span class=\"name\">Meal Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"3\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Ingr Ingr</span></div><div class=\"contents\"><div class=\"ingr\"><span class=\"name\">Meal Ingr Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div><div class=\"ingr\"><span class=\"name\">Meal Ingr Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"4\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Ingr Ingr Ingr</span></div><div class=\"contents\"><div class=\"ingr\"><span class=\"name\">Meal Ingr Ingr Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div><div class=\"ingr\"><span class=\"name\">Meal Ingr Ingr Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div><div class=\"ingr\"><span class=\"name\">Meal Ingr Ingr Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"5\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food</span></div><div class=\"contents\"><div class=\"food-wrapper empty\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-right\"></i></button> <span>Meal Food</span></div><div class=\"contents\"></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"6\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food Food</span></div><div class=\"contents\"><div class=\"food-wrapper empty\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food Food</span></div><div class=\"contents\"></div></div><div class=\"food-wrapper empty\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food Food</span></div><div class=\"contents\"></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"7\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food Food FOod</span></div><div class=\"contents\"><div class=\"food-wrapper empty\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food Food FOod</span></div><div class=\"contents\"></div></div><div class=\"food-wrapper empty\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food Food FOod</span></div><div class=\"contents\"></div></div><div class=\"food-wrapper empty\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food Food FOod</span></div><div class=\"contents\"></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"8\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Ingr Food</span></div><div class=\"contents\"><div class=\"ingr\"><span class=\"name\">Meal Ingr Food</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div><div class=\"food-wrapper empty\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Ingr Food</span></div><div class=\"contents\"></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"9\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food Ingr</span></div><div class=\"contents\"><div class=\"food-wrapper empty\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food Ingr</span></div><div class=\"contents\"></div></div><div class=\"ingr\"><span class=\"name\">Meal Food Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"10\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Ingr Food Ingr</span></div><div class=\"contents\"><div class=\"ingr\"><span class=\"name\">Meal Ingr Food Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div><div class=\"food-wrapper empty\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Ingr Food Ingr</span></div><div class=\"contents\"></div></div><div class=\"ingr\"><span class=\"name\">Meal Ingr Food Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"11\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food Ingr Food</span></div><div class=\"contents\"><div class=\"food-wrapper empty\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food Ingr Food</span></div><div class=\"contents\"></div></div><div class=\"ingr\"><span class=\"name\">Meal Food Ingr Food</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div><div class=\"food-wrapper empty\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food Ingr Food</span></div><div class=\"contents\"></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"12\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food - Ingr</span></div><div class=\"contents\"><div class=\"food-wrapper\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food - Ingr</span></div><div class=\"contents\"><div class=\"ingr\"><span class=\"name\">Meal Food - Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"13\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food - Ingr Ingr</span></div><div class=\"contents\"><div class=\"food-wrapper\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food - Ingr Ingr</span></div><div class=\"contents\"><div class=\"ingr\"><span class=\"name\">Meal Food - Ingr Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div><div class=\"ingr\"><span class=\"name\">Meal Food - Ingr Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"14\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food - Ingr, Ingr</span></div><div class=\"contents\"><div class=\"food-wrapper\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-down\"></i></button> <span>Meal Food - Ingr, Ingr</span></div><div class=\"contents\"><div class=\"ingr\"><span class=\"name\">Meal Food - Ingr, Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div></div></div><div class=\"ingr\"><span class=\"name\">Meal Food - Ingr, Ingr</span><div><span class=\"brand\">Roundy's</span> <span class=\"servings\">3 cups</span></div></div></div></div></div></div><div id=\"food-table-right\"><div class=\"stretcher\"><div class=\"meal-wrapper empty\" data-scenario=\"1\"><div class=\"meal\"><div>19</div><div>100</div><div>10</div></div><div class=\"contents\"></div></div><div class=\"meal-wrapper\" data-scenario=\"2\"><div class=\"meal\"><div>19</div><div>100</div><div>10</div></div><div class=\"contents\"><div class=\"ingr\"><div>19</div><div>100</div><div>10</div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"3\"><div class=\"meal\">10</div><div class=\"contents\"><div class=\"ingr\">10</div><div class=\"ingr\">10</div></div></div><div class=\"meal-wrapper\" data-scenario=\"4\"><div class=\"meal\">10</div><div class=\"contents\"><div class=\"ingr\">10</div><div class=\"ingr\">10</div><div class=\"ingr\">10</div></div></div><div class=\"meal-wrapper\" data-scenario=\"5\"><div class=\"meal\">10</div><div class=\"contents\"><div class=\"food-wrapper empty\"><div class=\"food\">10</div><div class=\"contents\"></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"6\"><div class=\"meal\">10</div><div class=\"contents\"><div class=\"food-wrapper empty\"><div class=\"food\">10</div><div class=\"contents\"></div></div><div class=\"food-wrapper empty\"><div class=\"food\">10</div><div class=\"contents\"></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"7\"><div class=\"meal\">10</div><div class=\"contents\"><div class=\"food-wrapper empty\"><div class=\"food\">10</div><div class=\"contents\"></div></div><div class=\"food-wrapper empty\"><div class=\"food\">10</div><div class=\"contents\"></div></div><div class=\"food-wrapper empty\"><div class=\"food\">10</div><div class=\"contents\"></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"8\"><div class=\"meal\">10</div><div class=\"contents\"><div class=\"ingr\">10</div><div class=\"food-wrapper empty\"><div class=\"food\">10</div><div class=\"contents\"></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"9\"><div class=\"meal\">10</div><div class=\"contents\"><div class=\"food-wrapper empty\"><div class=\"food\">10</div><div class=\"contents\"></div></div><div class=\"ingr\">10</div></div></div><div class=\"meal-wrapper\" data-scenario=\"10\"><div class=\"meal\">10</div><div class=\"contents\"><div class=\"ingr\">10</div><div class=\"food-wrapper empty\"><div class=\"food\">10</div><div class=\"contents\"></div></div><div class=\"ingr\">10</div></div></div><div class=\"meal-wrapper\" data-scenario=\"11\"><div class=\"meal\">10</div><div class=\"contents\"><div class=\"food-wrapper empty\"><div class=\"food\">10</div><div class=\"contents\"></div></div><div class=\"ingr\">10</div><div class=\"food-wrapper empty\"><div class=\"food\">10</div><div class=\"contents\"></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"12\"><div class=\"meal\">10</div><div class=\"contents\"><div class=\"food-wrapper\"><div class=\"food\">10</div><div class=\"contents\"><div class=\"ingr\">10</div></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"13\"><div class=\"meal\">20</div><div class=\"contents\"><div class=\"food-wrapper\"><div class=\"food\">20</div><div class=\"contents\"><div class=\"ingr\">10</div><div class=\"ingr\">10</div></div></div></div></div><div class=\"meal-wrapper\" data-scenario=\"14\"><div class=\"meal\">10</div><div class=\"contents\"><div class=\"food-wrapper\"><div class=\"food\">10</div><div class=\"contents\"><div class=\"ingr\">10</div></div></div><div class=\"ingr\">10</div></div></div></div></div></div>");
}]);

angular.module("foodTable/foodTable2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("foodTable/foodTable2.tpl.html",
    "<div id=\"food-table\"><div id=\"food-table-left\"><div class=\"stretcher\"><div class=\"meal-wrapper\" ng-repeat=\"meal in data\" ng-class=\"{empty: meal.children.length == 0}\"><div class=\"meal\"><button type=\"button\"><i class=\"fa fa-chevron-right\"></i></button> <span>{{ meal.name }}</span></div><div class=\"contents\"><div ng-repeat=\"child in meal.children\"><div ng-if=\"child.type == 'food'\" class=\"food-wrapper\" ng-class=\"{empty: child.children.length == 0}\"><div class=\"food\"><button type=\"button\"><i class=\"fa fa-chevron-right\"></i></button> <span>{{ child.name }}</span></div><div class=\"contents\"><div ng-repeat=\"ingrChild in child.children\" class=\"ingr\"><span class=\"name\">{{ ingrChild.name }}</span><div><span class=\"brand\">{{ ingrChild.brand }}</span> <span class=\"servings\">{{ ingrChild.servings }}</span></div></div></div></div><div ng-if=\"child.type == 'ingr'\" class=\"ingr\"><span class=\"name\">{{ child.name }}</span><div><span class=\"brand\">{{ child.brand }}</span> <span class=\"servings\">{{ child.servings }}</span></div></div></div></div></div></div></div><div id=\"food-table-right\"><div class=\"stretcher\"><div class=\"meal-wrapper\" ng-repeat=\"meal in data\" ng-class=\"{empty: meal.children.length == 0}\"><div class=\"meal\"><div ng-repeat=\"val in meal.nutrition\">{{ val }}</div></div><div class=\"contents\"><div ng-repeat=\"child in meal.children\"><div ng-if=\"child.type == 'food'\" class=\"food-wrapper\" ng-class=\"{empty: child.children.length == 0}\"><div class=\"food\"><div ng-repeat=\"val in child.nutrition\">{{ val }}</div></div><div class=\"contents\"><div ng-repeat=\"ingrObj in child.children\" class=\"ingr\"><div ng-repeat=\"val in ingrObj.nutrition\">{{ val }}</div></div></div></div><div ng-if=\"child.type == 'ingr'\" class=\"ingr\"><div ng-repeat=\"val in child.nutrition\">{{ val }}</div></div></div></div></div></div></div></div>");
}]);

angular.module("templates/actionBar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/actionBar.tpl.html",
    "<div class=\"actionbar\" ng-controller=\"activityCtrl as activity\" ng-class=\"{'drilldown':activity.backBtn}\"><div class=\"title\">{{ nav.title }}</div><div class=\"actions\"><div ng-repeat=\"item in activity.items\" class=\"container\"><div action-item=\"\" template=\"{{item}}\"></div></div></div><div class=\"menu\"><a href=\"#\" class=\"btn\" ng-if=\"!activity.backBtn\" ng-click=\"nav.open()\"><i class=\"fa fa-bars\"></i> <span class=\"title\">{{ nav.title }}</span></a><div ng-if=\"activity.backBtn\" action-item=\"\" template=\"{{activity.backBtn}}\"></div></div></div>");
}]);

angular.module("templates/buttons.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/buttons.tpl.html",
    "<action-bar></action-bar><sub-nav></sub-nav><h3>Button element</h3><button type=\"button\">Default</button><button type=\"button\" class=\"red\">Red</button><button type=\"button\" class=\"orange\">Orange</button><button type=\"button\" class=\"yellow\">Yellow</button><button type=\"button\" class=\"green\">Green</button><button type=\"button\" class=\"mint\">Mint</button><button type=\"button\" class=\"aqua\">Aqua</button><button type=\"button\" class=\"blue\">Blue</button><button type=\"button\" class=\"purple\">Purple</button><button type=\"button\" class=\"pink\">Pink</button><button type=\"button\" class=\"grey\">Grey</button><button type=\"button\" class=\"disabled\">Disabled</button><button type=\"button\" disabled=\"disabled\">Disabled</button><button type=\"button\" class=\"active\">Active</button><button type=\"button\"><i class=\"fa fa-home\"></i></button><button type=\"button\"><i class=\"fa fa-home\"></i><span>Icon</span></button><button type=\"button\"><span>Icon</span><i class=\"fa fa-home\"></i></button><hr><h3>Anchor element</h3><a href=\"#\" class=\"btn\">Default</a><a href=\"#\" class=\"btn red\">Red</a><a href=\"#\" class=\"btn orange\">Orange</a><a href=\"#\" class=\"btn yellow\">Yellow</a><a href=\"#\" class=\"btn green\">Green</a><a href=\"#\" class=\"btn mint\">Mint</a><a href=\"#\" class=\"btn aqua\">Aqua</a><a href=\"#\" class=\"btn blue\">Blue</a><a href=\"#\" class=\"btn purple\">Purple</a><a href=\"#\" class=\"btn pink\">Pink</a><a href=\"#\" class=\"btn grey\">Grey</a><a href=\"#\" class=\"btn disabled\">Disabled</a><a href=\"#\" class=\"btn active\">Active</a><a href=\"#\" class=\"btn\"><i class=\"fa fa-home\"></i></a><a href=\"#\" class=\"btn\"><i class=\"fa fa-home\"></i><span>Icon</span></a><a href=\"#\" class=\"btn\"><span>Icon</span><i class=\"fa fa-home\"></i></a><hr><h3>Input element</h3><input type=\"submit\" value=\"Default\"><input type=\"submit\" class=\"red\" value=\"Red\"><input type=\"submit\" class=\"orange\" value=\"Orange\"><input type=\"submit\" class=\"yellow\" value=\"Yellow\"><input type=\"submit\" class=\"green\" value=\"Green\"><input type=\"submit\" class=\"mint\" value=\"Mint\"><input type=\"submit\" class=\"aqua\" value=\"Aqua\"><input type=\"submit\" class=\"blue\" value=\"Blue\"><input type=\"submit\" class=\"purple\" value=\"Purple\"><input type=\"submit\" class=\"pink\" value=\"Pink\"><input type=\"submit\" class=\"grey\" value=\"Grey\"><input type=\"submit\" class=\"disabled\" value=\"disabled\"><input type=\"submit\" value=\"disabled\" disabled=\"disabled\"><input type=\"submit\" class=\"active\" value=\"Active\"><hr><h3>Dropdowns</h3><button class=\"btn\" type=\"button\" data-trigger=\"click\" data-type=\"success\" title=\"{{coolTest.title}}\" bs-tooltip=\"tooltip\">Click me</button><button class=\"btn\" type=\"button\" bs-popover=\"popoverTest\" data-animation=\"am-flip-x\" data-placement=\"bottom\" data-trigger=\"click\"><span>Click me pt 2</span></button><input class=\"form-control\" ng-model=\"billysBirthday\" data-date-format=\"yyyy-MM-dd\" data-date-type=\"number\" data-min-date=\"02/10/86\" data-max-date=\"today\" data-autoclose=\"1\" name=\"date2\" bs-datepicker=\"\"><button class=\"btn\" type=\"button\" bs-datepicker=\"\" ng-model=\"billysBirthday\" data-autoclose=\"1\" data-trigger=\"click\" data-animation=\"am-flip-x\" name=\"date1\"><span>Click me pt 2</span></button> <br><br><hr>");
}]);

angular.module("templates/foodLog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/foodLog.tpl.html",
    "<sub-nav></sub-nav><div class=\"test\"><h5>Billlllyl {{food.model.activity.mode}}</h5><div id=\"food-table\" ng-class=\"{'edit':food.model.activity.mode=='edit'}\"><div id=\"food-table-left\"><div class=\"stretcher\"><div class=\"meal-wrapper\" ng-repeat=\"meal in food.model.obj\" ng-class=\"{'empty':!meal.children.length,'selected':meal.selected}\"><div class=\"meal\" ng-click=\"food.api.toggleSelect(meal)\"><button type=\"button\" ng-click=\"meal.closed = !meal.closed\"><i ng-class=\"{'fa-chevron-right': meal.closed, 'fa-chevron-down': !meal.closed}\" class=\"fa\"></i></button> <span>{{meal.name}}</span></div><div class=\"contents\" ng-show=\"!meal.closed||food.model.activity.mode=='edit'\"><div ng-repeat=\"child in meal.children\"><div ng-if=\"child.type==1\" class=\"food-wrapper\" ng-class=\"{'empty': !child.children.length,'selected':child.selected}\"><div class=\"food\" ng-click=\"food.api.toggleSelect(child)\"><button type=\"button\" ng-click=\"child.closed = !child.closed\"><i ng-class=\"{'fa-chevron-right': child.closed, 'fa-chevron-down': !child.closed}\" class=\"fa\"></i></button> <span>{{child.name}}</span></div><div class=\"contents\" ng-show=\"!child.closed||food.model.activity.mode=='edit'\"><div ng-repeat=\"ingrChild in child.children\" class=\"ingr\" ng-class=\"{'selected':ingrChild.selected}\" ng-click=\"food.api.toggleSelect(ingrChild)\"><span class=\"name\">{{ingrChild.name}}</span><div><span class=\"brand\">{{ingrChild.brand}}</span> <span class=\"servings\">{{ingrChild.servings}}</span></div></div></div></div><div ng-if=\"child.type==2\" class=\"ingr\" ng-class=\"{'selected':child.selected}\" ng-click=\"food.api.toggleSelect(child)\"><span class=\"name\">{{child.name}}</span><div><span class=\"brand\">{{child.brand}}</span> <span class=\"servings\">{{child.servings}}</span></div></div></div></div></div></div></div><div id=\"food-table-right\" ng-if=\"food.model.activity.mode!='edit'\"><div class=\"stretcher\"><div class=\"meal-wrapper\" ng-repeat=\"meal in food.model.obj\" ng-class=\"{'empty':!meal.children.length}\"><div class=\"meal\"><div ng-repeat=\"val in meal.nutrition\">{{val}}</div></div><div class=\"contents\" ng-show=\"!meal.closed\"><div ng-repeat=\"child in meal.children\"><div ng-if=\"child.type==1\" class=\"food-wrapper\" ng-class=\"{empty: child.children.length==0}\"><div class=\"food\"><div ng-repeat=\"val in child.nutrition\">{{val}}</div></div><div class=\"contents\" ng-show=\"!child.closed\"><div ng-repeat=\"ingrObj in child.children\" class=\"ingr\"><div ng-repeat=\"val in ingrObj.nutrition\">{{val}}</div></div></div></div><div ng-if=\"child.type==2\" class=\"ingr\"><div ng-repeat=\"val in child.nutrition\">{{val}}</div></div></div></div></div></div></div></div></div>");
}]);

angular.module("templates/foodLogAddTo.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/foodLogAddTo.tpl.html",
    "<div class=\"popover\"><div class=\"arrow\"></div><div class=\"popover-content\"><h5>AAAAAHHH YYYYEEEEAAAA</h5></div></div>");
}]);

angular.module("templates/nav.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/nav.tpl.html",
    "<div class=\"nav\"><div id=\"navProfile\"><a href=\"#\" class=\"imgCircle\"><i class=\"fa fa-user\"></i></a> <button type=\"button\" bs-dropdown=\"userDropdown\" data-placement=\"bottom\"><span class=\"name\">Billy McKee8</span> <i class=\"fa fa-angle-down\"></i></button></div><ul><li ng-repeat=\"navItem in nav.siteMap\" ng-class=\"{'active':navItem.activeWhen == nav.active}\"><a ng-href=\"{{navItem.href}}\" ng-click=\"nav.close()\"><i class=\"fa fa-{{navItem.icon}}\"></i>{{navItem.label}}</a></li></ul></div>");
}]);

angular.module("templates/subNav.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/subNav.tpl.html",
    "<div id=\"subNav\" ng-if=\"nav.subNav\"><div class=\"row\"><ul class=\"menu\"><li ng-repeat=\"tab in nav.subNav\"><a ng-href=\"tab.href\" ng-class=\"{'active': tab.activeWhen == nav.activeSubNav}\">{{tab.label}}</a></li></ul></div></div>");
}]);

angular.module("templates/test.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/test.tpl.html",
    "<div class=\"popover\"><div class=\"arrow\"></div><div class=\"popover-content overflowItems\"><div ng-repeat=\"item in activity.overflowItems\"><a href=\"#\" ng-if=\"item.directive=='datepicker'\" bs-datepicker=\"\" data-placement=\"bottom-right\" data-animation=\"am-flip-x\" data-trigger=\"click\" data-autoclose=\"1\" ng-model=\"date\">{{item.label}}</a> <a href=\"#\" ng-if=\"item.directive!='datepicker'\" action-item=\"\">{{item.label}}</a></div></div></div>");
}]);

angular.module('templates.common', []);

