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

  controller.$inject = [];

  function controller() {

  }
  
}());