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

  controller.$inject = ['$rootScope', '$window', 'cFactory', '$state'];

  function controller($rootScope, $window, cFactory, $state) {
    $rootScope.authStatus = null;
    $rootScope.$watch(function() {
      return $window.localStorage['nToken'];
    }, function(nVal, oVal) {
      if (nVal) $rootScope.authStatus = nVal;
    });
    $rootScope.logout = function() {
      cFactory.destroy();
      $rootScope.authStatus = null;
      $state.go('home');
    }
  }

}());