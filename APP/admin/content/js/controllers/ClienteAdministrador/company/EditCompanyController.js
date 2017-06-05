(function(){
    'use strict';
    
    angular.module('tcc').controller('PS_EditCompanyController', PS_EditCompanyController);
    
    PS_EditCompanyController.$inject = ['$rootScope', '$state', 'CompanyFactory', 'SETTINGS', '$stateParams', 'brCidadesEstados', 'viaCEP'];
    
    function PS_EditCompanyController($rootScope, $state, CompanyFactory, SETTINGS, $stateParams, brCidadesEstados, viaCEP){
        
        var vm = this;
           vm.company = {
            Id: null,
            name:null,
            description:null,
            segmentId:null,
            address: null,
            addressComplement: null,
            postCode: null,
            city: null,
            state: null,
            district: null
        };
                        
        vm.btnSave = Save;
		vm.btnCancel = Cancel;  
        vm.segmentType = $rootScope.segment;      
        
        vm.states = brCidadesEstados.estados;     
        vm.buscarCidadesPorSigla = buscarCidadesPorSigla;
        vm.cities = [];
        vm.buscarCEP = buscarCEP;
  
        GetById();
        
        
        function GetById(){
            if(SETTINGS.USERID != null){
                CompanyFactory.getById($stateParams.id)
                    .then(success)
                    .catch(fail);
                    
                function success(data){  
                    
                    vm.company = data.data;   
                    buscarCidadesPorSigla(vm.company.state);
                }
                
                function fail(error){
                    for(var x = 0; x < error.data.errors.length; x++)
                        toastr.error(error.data.errors[x].value, error.data.errors[x].key);
                }
            }
        }

        
        
        function Save(){    
            
            CompanyFactory.edit(vm.company)
                .then(success)
                .catch(fail);
                
            function success(data){
                toastr.success(data,"Sucesso");
                $state.go("ClienteAdministrador.company");
            }
            
            function fail(error){
                for(var x = 0; x < error.data.errors.length; x++)
                    toastr.error(error.data.errors[x].value, error.data.errors[x].key);
            }
        }
        
        function Cancel(){
            $state.go("ClienteAdministrador.company");
        }

        function buscarCidadesPorSigla(sigla){

            vm.cities = brCidadesEstados.buscarCidadesPorSigla(sigla);
        }

           function buscarCEP(cep){
            if(cep != undefined){
                if(cep.length == 8 ){
                    viaCEP.get(cep).then(function(response){
    
                        vm.company.address = response.logradouro;
                        vm.company.district = response.bairro;                        
                        vm.company.state = response.uf;
                        buscarCidadesPorSigla(response.uf);
                        vm.company.city = response.localidade;
                    });
                }
            }
        }
    }
})();