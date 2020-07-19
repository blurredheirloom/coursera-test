(function () {
  'use strict';
  angular.module('data').service('MenuDataService', MenuDataService);
  MenuDataService.$inject = ['$http', 'API'];
  function MenuDataService($http, API) {
    var service = this;
    const endpointAll = API + "/" + "categories.json";
    const endpointCat = API + "/" + "menu_items.json";

    service.getAllCategories = function() {
      return $http({
          method: "GET",
          url: endpointAll
      }).then(function (response) {
        return response.data;
      });
    };

    service.getItemsForCategory = function(categoryShortName) {
      return $http({
          method: "GET",
          url: endpointCat,
          params: {
              category: categoryShortName
          }
      }).then(function (response) {
        return response.data;
      });
    };
  }
})();
