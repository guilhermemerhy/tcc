(function(){
	'use strict';
	
    angular.module('tcc').config(AppRoute);
    
    AppRoute.$inject = ['$routeProvider','$stateProvider','$urlRouterProvider','$provide'];
	
    function AppRoute($routeProvider, $stateProvider,$urlRouterProvider, $provide) {
			
        var cacheBuster = Date.now().toString();
        function templateFactoryDecorator($delegate) {
            var fromUrl = angular.bind($delegate, $delegate.fromUrl);
            $delegate.fromUrl = function (url, params) {
                if (url !== null && angular.isDefined(url) && angular.isString(url)) {
                    url += (url.indexOf("?") === -1 ? "?" : "&");
                    url += "v=" + cacheBuster;
                }

                return fromUrl(url, params);
            };

            return $delegate;
        }
        
        $provide.decorator('$templateFactory', ['$delegate', templateFactoryDecorator]);
        
        $stateProvider
        
        .state('home', {
            url: '/home',                     
            controller: 'HomeController',
            templateUrl: 'pages/home.html',
            controllerAs:'vm'
        })

            .state('details', {
            url: '/details',
            controller: 'DetailsController',
            templateUrl: 'pages/details.html',
            controllerAs:'vm'
        })
        

        //   .state('route.details', {
        //     url: '/details',
        //     views: {
        //         'conteudo': {
        //             templateUrl: 'pages/details.html',
        //             controller: 'DetailsController',
        //             controllerAs:'vm'
        //         }
        //     }
        // })
       
             
        ;
        
        // #################################################
        // #####  INI OTHERWISE                         ####
        // #################################################
        $urlRouterProvider.otherwise('/home');
    }
})();