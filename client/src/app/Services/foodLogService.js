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