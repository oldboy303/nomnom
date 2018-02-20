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
        q: queryBuilder($scope.terms, $scope.diet, $scope.allergy)
      };
      $http.post('/api/v1/recipes/search', query)
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error.data);
        })
    }
  }

  function queryBuilder(terms, diet, allergy) {
    var qString = '';
    var allergyArr = [];
    for (var key in allergy) {
      if (allergy[key]) {
        allergyArr.push(allergy[key]);
      }
    }
    if (terms) {
      qString += terms;
    }
    if (diet) {
      qString += '&allowedDiet[]=' + diet;
    }
    if (allergyArr.length > 0) {
      for(var i = 0; i < allergyArr.length; i++) {
        qString += '&allowedAllergy[]=' + allergyArr[i];
      }
    }
    return qString;
  }

}());