(function() {
  'use strict';

  const dependencies = ['ui.router', 'ngSanitize'];

  angular.module('app', dependencies)
    .config(setupRoutes)

  setupRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function setupRoutes($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: 'This is the Landing page'
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