(function() {

  angular.module('app')
    .directive('dashboard', dashboardDirective);

  function dashboardDirective() {
    return {
      restrict: 'E',
      templateUrl: 'directives/dashboard.directive.html',
      controller: controller
    };
  }

  controller.$inject = ['$scope', 'cFactory', '$window', '$http'];

  function controller($scope, cFactory, $window, $http) {
    if(!cFactory.cookbook) {
      if($window.localStorage['nToken']) {
        $http.get('/api/v1/cookbooks/' + $window.localStorage['nToken'])
          .then(function(response) {
            cFactory.cookbook = response.data.cookbook;
            $scope.cookbook = cFactory.cookbook;
          })
          .catch(function(error) {
            cFactory.destroy();
          })
      }
      else {
        cFactory.destroy();
      }
    }
    else {
      $scope.cookbook = cFactory.cookbook;
    }
  }

}());