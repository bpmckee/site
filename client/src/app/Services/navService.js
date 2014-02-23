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