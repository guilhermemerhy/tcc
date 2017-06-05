(function(){
    'use strict';
    
    angular.module('tcc').controller('AD_TemplateController', AD_TemplateController);
    
    AD_TemplateController.$inject = ['$scope', '$state', '$rootScope', 'UserFactory'];
    
    function AD_TemplateController($scope, $state, $rootScope, UserFactory){
        
        Activate();
        
        function Activate(){
            if ($rootScope.user == null) {
                $state.go("account.login");
            } else {
                GetCurrentUserProfile();
            }
        }
        
        function GetCurrentUserProfile(){
			//$rootScope.pw = pleaseWait({ logo: "images/loader.gif", backgroundColor: '#f1f1f1', loadingHtml: "Estamos carregando tudo por aqui!"});
			UserFactory.getCurrentProfile($rootScope.user)
				.then(success)
				.catch(fail);
			
			function success(response)
			{
				$rootScope.userData = response;
				//$rootScope.pw.finish();
                
                // switch(response.userType){
                //     case 1:
                //         // TODO : Não faz nada
                //         break;
                //     default:
                //         $state.go("account.logout");
                // }
			}
			
			function fail(err)
			{
				console.log(err);
			}
		}
    }
})();