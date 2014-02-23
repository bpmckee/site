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