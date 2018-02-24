(function() {
  'use strict';

  const dependencies = ['ui.router', 'ngSanitize'];

  angular.module('app', dependencies)
    .config(config)
    .run(['$window', '$state', function($window, $state) {
      if ($window.localStorage['nToken']) {
        $state.go('dashboard');
      }
    }]);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
    
    if(!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.common = {};
    }          

    $httpProvider.defaults.headers.common["If-Modified-Since"] = "0";
    $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";     
    $httpProvider.defaults.headers.common.Pragma = "no-cache"; 
    
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