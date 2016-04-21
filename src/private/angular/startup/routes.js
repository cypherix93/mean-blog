(function ()
{
    'use strict';

    angular
        .module('app')
        .config(configureRoutes);

    function configureRoutes($stateProvider, $urlRouterProvider)
    {
        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: '<h1>Hello from ui router</h1>'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html'
            })
            .state('blog', {
                url: '/blog',
                templateUrl: 'views/blog.html'
            })
            .state('projects', {
                url: '/projects',
                templateUrl: 'views/projects.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/signup.html'
            });
    }
})();