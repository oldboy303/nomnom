(function() {

  angular.module('app')
    .directive('dashboard', dashboardDirective);

  function dashboardDirective() {
    return {
      restrict: 'E',
      templateUrl: 'directives/dashboard.directive.html',
      controller: controller,
      scope: {},
      link: function() {
        $(document).ready(function(){
          $('ul.tabs').tabs();
        });
      }
    };
  }

  controller.$inject = ['$scope', 'cFactory'];

  function controller($scope, cFactory) {
  
    if (!cFactory.fetch()) {
      cFactory.destroy();
    }
    else {
      cFactory.getCookbook(cFactory.fetch())
        .then(function(cookbook) {
          $scope.cookbook = cookbook;
        })
        .catch(function() {
          cFactory.destroy();
        })
    }

    $scope.recipeDelete = function(recipeId) {
      cFactory.recipeDelete(recipeId)
        .then(function(cookbook) {
          $scope.cookbook = cookbook;
        })
        .catch(function(error) {
          console.log(error);
        })
    };

    $scope.recipeSave = function(recipe) {
      cFactory.recipeSave(recipe)
        .then(function(cookbook) {
          $scope.cookbook = cookbook;
        })
        .catch(function(error) {
          console.log(error);
        })
    };

  }

}());