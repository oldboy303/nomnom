(function() {

  angular.module('app')
    .directive('searchRecipeCard', searchRecipeCardDirective);

  function searchRecipeCardDirective() {
    return {
      restrict: 'E',
      templateUrl: 'directives/searchRecipeCard.directive.html',
      controller: controller,
      link: function() {
        $('.modal').modal();
      }
    };
  }

  controller.$inject = ['$scope', 'cFactory', '$sce'];

  function controller($scope, cFactory, $sce) {
    $scope.detail = null;
    $scope.attribution = null;
    $scope.getDetail = function(yummlyId) {
      cFactory.getRecipe(yummlyId)
        .then(function(response) {
          $scope.detail = response.data;
          console.log($scope.detail)
        })
        .catch(function(error) {
          $scope.detail = error.data;
        })
    };
    $scope.trustUrl = function(url) {
      return $sce.trustAsResourceUrl(url);
    };
    $scope.$watch('detail', function(nVal, oVal) {
      if (nVal) {
        $scope.detail = nVal
      }
    })
  }

}());