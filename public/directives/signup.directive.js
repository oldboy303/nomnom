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

  controller.$inject = [];

  function controller() {

  }
  
}());