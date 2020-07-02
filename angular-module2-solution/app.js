(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var needItems = this;
      needItems.items = ShoppingListCheckOffService.getNeedItems();
      needItems.buy = function(index) {
        ShoppingListCheckOffService.buy(index);
      };
    }
    
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var boughtItems = this;
      boughtItems.items = ShoppingListCheckOffService.getBoughtItems();
    
    }
    
    function ShoppingListCheckOffService() {
      var service = this;
      var needItems = [
        { name: "Cigarettes", quantity: 1 },
        { name: "Water", quantity: 24 },
        { name: "Coca Cola", quantity: 2},
        { name: "Beers", quantity: 6 },
        { name: "Newspaper", quantity: 1 }];
    
      var boughtItems = [];
    
      service.buy = function(index) {
        boughtItems.push(needItems[index]);
        needItems.splice(index, 1);
      };
    
      service.getNeedItems = function () {
        return needItems;
      };
    
      service.getBoughtItems = function () {
        return boughtItems;
      };
    }
    
    })();