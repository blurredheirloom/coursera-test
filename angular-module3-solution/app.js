(function () {
    'use strict'
  
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");
  
    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var narrowItCtrl = this;
        
        narrowItCtrl.narrowItDown = function (searchTerm) {
            if (searchTerm) {
                MenuSearchService.getMatchedMenuItems(searchTerm).then(function (response) {
                    narrowItCtrl.found = response;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        };

        narrowItCtrl.onRemove = function (itemIndex) {
            narrowItCtrl.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        
        service.getMatchedMenuItems = function (searchTerm) {
            return $http({method: "GET", url: (ApiBasePath + "/menu_items.json")}).then(function (result) {
                return result.data.menu_items.filter(item => item.description.indexOf(searchTerm) !== -1);
            });
        };
    }

    function FoundItemsDirective() {
        var ddo = {
          templateUrl: 'foundItems.html',
          scope: {
            items: '<',
            onRemove: '&'
          },
          controller: FoundItemsDirectiveController,
          controllerAs: 'foundCtrl',
          bindToController: true
        };
        return ddo;
      }
      
      function FoundItemsDirectiveController() {
        var foundCtrl = this;
        foundCtrl.noFound = function () {
          return foundCtrl.items && foundCtrl.items.length === 0
        };
      }

})();
  