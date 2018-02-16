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

  controller.$inject = ['$rootScope', '$window'];

  function controller($rootScope, $window) {
    $rootScope.authStatus = null;
    $rootScope.$watch(function() {
      return $window.localStorage['nToken'];
    }, function(nVal, oVal) {
      if (nVal) $rootScope.authStatus = nVal;
    });
  }

}());