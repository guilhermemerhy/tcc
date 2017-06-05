(function(){
    'use strict';
    
    angular.module('tcc').controller('PS_CreateContactController', PS_CreateContactController);
    
    PS_CreateContactController.$inject = ['$rootScope','$state', 'ContactFactory', 'CompanyFactory', 'SETTINGS'];
    
    function PS_CreateContactController($rootScope, $state, ContactFactory, CompanyFactory, SETTINGS){
        var vm = this;
        vm.contact = null;
        vm.companys = [];

        vm.btnSave = Save;
		vm.btnCancel = Cancel;
        if($rootScope.company.length == 0)
            GetCompany();
        else
            vm.companys = $rootScope.company;

        function GetCompany(){
            CompanyFactory.GetCompanyByUser(SETTINGS.USERID)
				.then(success)
				.catch(fail);
			
			function success(data)
			{

                vm.companys = data.data;  
                $rootScope.company = vm.companys;                 
			}
			
			function fail(error){
                    if(error.status == 401){
                        toastr.error("Acesso não autorizado pelo servidor", error.statusText);
                        $state.go("account.logout");        
                    }else
                        for(var x = 0; x < error.data.errors.length; x++)
                            toastr.error(error.data.errors[x].value, error.data.errors[x].key);
                }
        }
        
        function Save(){
            vm.contact.userId = SETTINGS.USERID; 
            ContactFactory.create(vm.contact)
                .then(success)
                .catch(fail);
                
            function success(data){
                toastr.success("Contato criada com sucesso.","Sucesso");
                $state.go("ClienteAdministrador.contact");
            }
            
            function fail(error){
                for(var x = 0; x < error.data.errors.length; x++)
                    toastr.error(error.data.errors[x].value, error.data.errors[x].key);
            }
        }
        
        function Cancel(){
            $state.go("ClienteAdministrador.contact");
        }
    }
})();