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