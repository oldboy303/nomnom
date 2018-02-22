(function() {

  angular.module('app')
    .directive('signup', signupDirective);

  function signupDirective() {
    return {
      restrict: 'E',
      templateUrl: 'directives/signup.directive.html',
      controller: controller,
      scope: {}
    }
  }

  controller.$inject = ['$scope', 'cFactory'];

  function controller($scope, cFactory) {
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.email = '';
    $scope.password = '';
    $scope.error = null;

    $scope.signup = function() {
      cFactory.signup({
        firstName: $scope.firstName,
        lastName: $scope.lastName,
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