(function() {
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', configureRoutes]);

    function configureRoutes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: '<h1>Hello from ui router</h1>'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/app/templates/about.html'
            })
            .state('blog', {
                url: '/blog',
                templateUrl: '/app/templates/blog.html'
            })
            .state('projects', {
                url: '/projects',
                templateUrl: '/app/templates/projects.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/app/templates/login.html'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: '/app/templates/signup.html'
            });
    }
})();