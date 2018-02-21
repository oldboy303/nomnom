(function() {

  angular.module('app')
    .directive('login', loginDirective);

  function loginDirective() {
    return {
      restrict: 'E',
      templateUrl: 'directives/login.directive.html',
      controller: controller
    }
  }

  controller.$inject = ['$scope', 'cFactory'];

  function controller($scope, cFactory) {
   
    $scope.email = '';
    $scope.password = '';
    $scope.error = null;

    $scope.login = function() {
      cFactory.login({
        email: $scope.email,
        password: $scope.password
      })
      .then(function(response) {
        if (response) {
          $scope.error = response.error;
        }
      })
      .catch(function(error) {
        $scope.error = error;
      });
    };
  }
  
}());