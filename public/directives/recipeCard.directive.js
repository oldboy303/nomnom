(function() {

  angular.module('app')
    .directive('recipeCard', dashboardDirective);

  function dashboardDirective() {
    return {
      restrict: 'E',
      templateUrl: 'directives/recipeCard.directive.html',
      controller: controller
    };
  }

  controller.$inject = [];

  function controller($scope, cFactory) {
    
  }

}());