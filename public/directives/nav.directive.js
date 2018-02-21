(function() {

  angular.module('app')
    .directive('nNav', navDirective);

  function navDirective() {
    return {
      restrict: 'E',
      templateUrl: 'directives/nav.directive.html',
      controller: controller
    }
  }

  controller.$inject = ['$scope', 'cFactory'];

  function controller($scope, cFactory) {
    $scope.authStatus = cFactory.fetch();
    $scope.logout = function() {
      $scope.authStatus = null;
      cFactory.destroy();
    };
    $scope.$watch(
      cFactory.fetch,
      function(nV) {
        if (nV) $scope.authStatus = nV;
      }
    );
  }

}());