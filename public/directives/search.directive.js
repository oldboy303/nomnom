(function() {

  angular.module('app')
    .directive('search', searchDirective);

  function searchDirective() {
    return {
      restrict: 'E',
      templateUrl: 'directives/search.directive.html',
      controller: controller,
      scope: {
        recipeSave: '&'
      }
    };
  }

  controller.$inject = ['$scope', '$http', 'cFactory'];

  function controller($scope, $http, cFactory) {

    $scope.error = '';

    $scope.advanced = false;

    $scope.start = 0;

    $scope.maxResult = 24;

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
        allergy: $scope.allergy,
        start: $scope.increment * 24,
        maxResult: $scope.increment * 24 || 24
      };

      cFactory.search(query)
        .then(function(response) {
          if (response.error) {
            $scope.error = response.error;
          } 
          else if (response.data.matches.length === 0){
            $scope.error = 'Sorry... your search didn\'t find anything';
          }
          else {
            $scope.error = '';
            $scope.advanced = false;
            $scope.searchResults = $scope.searchResults.concat(response.data.matches);
          }       
        })
        .catch(function(error) {
          console.log(error.data);
        })
    };

    $scope.clear = function() {
      $scope.advanced = false;
      $scope.start = 0;
      $scope.maxResult = 0;
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
    };

    $scope.incrementSearch = function() {
      $scope.start += 24;
      $scope.maxResult += 24;
      $scope.search();
    };

  }

}());