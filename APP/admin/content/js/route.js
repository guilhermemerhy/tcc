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
        
        .state('route', {
            url: '/route',
            controller: 'RouteController'
        })
        
        // #################################################
        // #####  INI ACCOUNT                           ####
        // #################################################
        .state('account', {
            url: '/account',
            abstract: 'true',
            templateUrl: 'pages/account/_template.html'
        })
        
        .state('account.login', {
            url: '/login',
            views: {
                'conteudo': {
                    templateUrl: 'pages/account/login.html',
                    controller: 'LoginController'
                }
            }
        })

        .state('account.register', {
            url: '/register',
            views: {
                'conteudo': {
                    templateUrl: 'pages/account/register.html',
                    controller: 'RegisterController'
                }
            }
        })
        
        .state('account.logout', {
            url: '/logout',
            views: {
                'conteudo': {
                    controller: 'LogoutController'
                }
            }
        })
        
        // #################################################
        // #####  INI ADMIN                             ####
        // #################################################
        
        .state('admin',{
            url: '/admin',
            abstract: 'true',
            templateUrl: 'pages/admin/_template.html',
            controller: 'AD_TemplateController'
        })
        
        .state('admin.dashboard', {
            url: '/dashboard',
            views: {
                'conteudo': {
                    templateUrl: 'pages/admin/dashboard/dash.html',
                    controller: 'AD_DashboardController'
                }
            }
        })
        
        .state('admin.user', {
            url: '/user',
            views: {
                'conteudo': {
                    templateUrl: 'pages/admin/registers/user/index.html',
                    controller: 'AD_ListUserController'
                }
            }
        })
        
        .state('admin.userCreate', {
            url: '/user/create',
            views: {
                'conteudo': {
                    templateUrl: 'pages/admin/registers/user/create.html',
                    controller: 'AD_CreateUserController'
                }
            }
        })
        
        .state('admin.company', {
            url: '/company',
            views: {
                'conteudo': {
                    templateUrl: 'pages/admin/registers/company/index.html',
                    controller: 'AD_ListCompanyController',
                     controllerAs:'vm'
                }
            }
        })
      
        
       
        
        // #################################################
        // #####  INI ClienteAdministrador               ####
        // #################################################
        
        .state('ClienteAdministrador',{
            url: '/ClienteAdministrador',
            abstract: 'true',
            templateUrl: 'pages/ClienteAdministrador/_template.html',
            controller: 'PS_TemplateController'
        })
        
        .state('ClienteAdministrador.dashboard', {
            url: '/dashboard',
            views: {
                'conteudo': {
                    templateUrl: 'pages/ClienteAdministrador/dashboard/dash.html',
                    controller: 'PS_DashboardController'
                }
            }
        })

        .state('ClienteAdministrador.company', {
            url: '/company',
            views: {
                'conteudo': {
                    templateUrl: 'pages/ClienteAdministrador/registers/company/index.html',
                    controller: 'PS_ListCompanyController',
                    controllerAs:'vm'
                }
            }
        })
        
        .state('ClienteAdministrador.companyCreate', {
            url: '/companyCreate',
            views: {
                'conteudo': {
                    templateUrl: 'pages/ClienteAdministrador/registers/company/create.html',
                    controller: 'PS_CreateCompanyController',
                    controllerAs:'vm'
                }
            }
        })

         .state('ClienteAdministrador.companyEdit', {
            url: '/companyEdit/:id',
            views: {
                'conteudo': {
                    templateUrl: 'pages/ClienteAdministrador/registers/company/edit.html',
                    controller: 'PS_EditCompanyController',
                    controllerAs:'vm'
                }
            }
        })
        

        .state('ClienteAdministrador.contact', {
                    url: '/contact',
                    views: {
                        'conteudo': {
                            templateUrl: 'pages/ClienteAdministrador/registers/contact/index.html',
                            controller: 'PS_ListContactController',
                            controllerAs:'vm'
                        }
                    }
                })


        .state('ClienteAdministrador.contactCreate', {
            url: '/contactCreate',
            views: {
                'conteudo': {
                    templateUrl: 'pages/ClienteAdministrador/registers/contact/create.html',
                    controller: 'PS_CreateContactController',
                    controllerAs:'vm'
                }
            }
        })
        
        
        .state('ClienteAdministrador.contactEdit', {
            url: '/contactEdit/:contactId',
            views: {
                'conteudo': {
                    templateUrl: 'pages/ClienteAdministrador/registers/contact/edit.html',
                    controller: 'PS_EditContactController',
                    controllerAs:'vm'
                }
            }
        })
        
        ;
        
        // #################################################
        // #####  INI OTHERWISE                         ####
        // #################################################
        $urlRouterProvider.otherwise('/route');
    }
})();