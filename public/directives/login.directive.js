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

  controller.$inject = ['$scope', '$http', 'cFactory', '$state'];

  function controller($scope, $http, cFactory, $state) {
   
    $scope.email = '';
    $scope.password = '';

    $scope.login = function() {
      $http.post(
        '/api/v1/cookbooks/login',
        {
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