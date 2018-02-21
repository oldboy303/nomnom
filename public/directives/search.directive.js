(function() {

  angular.module('app')
    .directive('search', searchDirective);

  function searchDirective() {
    return {
      restrict: 'E',
      templateUrl: 'directives/search.directive.html',
      controller: controller
    };
  }

  controller.$inject = ['$scope', '$http'];

  function controller($scope, $http) {
    $scope.advanced = false;
    $scope.searchResults = [];
    $scope.terms = '';
    $scope.diet = '';
    $scope.allergy = {
      peanut: '',
      nut: '',
      gluten: '',
      seafood: '',
      dairy: '',
      soy: ''
    };
    $scope.search = function() {
      var query = {
        q: $scope.terms,
        diet: $scope.diet,
        allergy: $scope.allergy
      };

      $http.post('/api/v1/recipes/search', query)
        .then(function(response) {
          $scope.advanced = false;
          $scope.searchResults = response.data.matches;
          console.log($scope.searchResults)
        })
        .catch(function(error) {
          console.log(error.data);
        })
    };

    $scope.$watch('searchResults', function(nVal, oVal) {
      $scope.searchResults = nVal;
    })
  }

}());