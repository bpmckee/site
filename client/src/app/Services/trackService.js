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