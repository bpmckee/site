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