(function(){
    'use strict';
    
    angular.module('tcc').controller('PS_ListCompanyController', PS_ListCompanyController);
    
    PS_ListCompanyController.$inject = ['$rootScope', '$state', 'CompanyFactory', 'SegmentFactory', 'SETTINGS', '$stateParams'];
    
    function PS_ListCompanyController($rootScope,  $state, CompanyFactory, SegmentFactory, SETTINGS, $stateParams){
        var vm = this;
        
        vm.companys = [];
        vm.sortType = 'name';
		vm.sortReverse = false;
		vm.searchText = '';
        
        vm.btnNew = New;
        vm.btnEditar = Edit;
        vm.btnActive = Active;
        vm.btnDesactivate = Desactivate;
        

        if(SETTINGS.USERID != null){
            ListCompany();
            ListSegment();
        }
        
        
        function ListCompany(){
            CompanyFactory.GetCompanyByUser(SETTINGS.USERID)
				.then(success)
				.catch(fail);
			
			function success(data)
			{

				vm.companys = data.data;
                $rootScope.company = data.data;                
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


         
                        
        function ListSegment(){
            SegmentFactory.GetSegment()
                .then(success)
                .catch(error);
                
            function success(data){
                $rootScope.segment = data.data;
                
            }
            
            function error(error){
                if(error.status == 401){
                        toastr.error("Acesso não autorizado pelo servidor", error.statusText);
                         $state.go("account.logout");
                    }else
                        for(var x = 0; x < error.data.errors.length; x++)
                            toastr.error(error.data.errors[x].value, error.data.errors[x].key);
            }
        }
        
        function New(){
            $state.go("ClienteAdministrador.companyCreate");
        }
        
        function Edit(id){
            $state.go("ClienteAdministrador.companyEdit", {id:id});            
        }
        
        function Active(model){            
             CompanyFactory.activate(model.id)
				.then(success)
				.catch(fail);
			
			function success(data)
			{
                model.isActive = true;                                
				toastr.success("Empresa ativada com sucesso", "Sucesso!");
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
        
        function Desactivate(model){            
             CompanyFactory.desactivate(model.id)
				.then(success)
				.catch(fail);
			
			function success(data)
			{
                model.isActive = false;                  
				toastr.success("Empresa desativada com sucesso", "Sucesso!");
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
    }
})();