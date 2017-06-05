(function(){
    'use strict';
    
    angular.module('tcc').controller('RouteController', RouteController);
    
    RouteController.$inject = ['$scope', '$rootScope','$state','SETTINGS', 'UserFactory'];
    
    function RouteController($scope, $rootScope, $state, SETTINGS, UserFactory){
        Activate();

        function Activate(){

        SETTINGS.USERID = null;

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

				$rootScope.userData = response.data; 
                SETTINGS.USERID = response.data.id;

				//$rootScope.pw.finish();
                
                if($rootScope.userData.isAdmin == true)
                    $state.go("admin.dashboard");                    
                else if($rootScope.userData.isAdmin == false && $rootScope.userData.isActive == true)
                    $state.go("ClienteAdministrador.dashboard");                                     
                else
                     $state.go("account.logout");                    
                
                                
			}
			
			function fail(err)
			{
                if(err.status == 401)
                    $state.go("account.logout");
                else
				    console.log(err);
			}
		}


    }
})();