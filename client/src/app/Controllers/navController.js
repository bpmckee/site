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