(function() {
  'use strict';

  const dependencies = ['ui.router', 'ngSanitize'];

  angular.module('app', dependencies)
    .config(setupRoutes)
    .run(['$window', '$state', function($window, $state) {
      if ($window.localStorage['nToken']) {
        $state.go('dashboard');
      }
    }]);

  setupRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function setupRoutes($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<div class="home-container"><img src="style/images/home_image.jpg"><h4>find great food</h4></div>'
      })
      .state('signup', {
        url: '/signup',
        template: '<signup></signup>'
      })
      .state('login', {
        url: '/login',
        template: '<login></login>'
      })
      .state('dashboard', {
        url: '/dashboard',
        template: '<dashboard></dashboard>'
      })


    $locationProvider.html5Mode(true);
  }

})();