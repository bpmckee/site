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