(function() {

  angular.module('app')
    .directive('signup', signupDirective);

  function signupDirective() {
    return {
      restrict: 'E',
      templateUrl: 'directives/signup.directive.html',
      controller: controller
    }
  }

  controller.$inject = ['$scope', '$http', 'cFactory', '$state'];

  function controller($scope, $http, cFactory, $state) {
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.email = '';
    $scope.password = '';

    $scope.signup = function() {
      $http.post(
        '/api/v1/cookbooks/register',
        {
          firstName: $scope.firstName,
          lastName: $scope.lastName,
          email: $scope.email,
          password: $scope.password
        }
      )
        .then(function(response) {
          cFactory.save(response.data.token);
          cFactory.cookbook = response.data.cookbook;
          console.log(cFactory.cookbook);
          $state.go('dashboard');
        })
        .catch(function(error) {
          this.error = error.data.error;
          console.log(this.error);
        })
    }

  }
  
}());