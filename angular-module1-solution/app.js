(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.checkDishes = function () {
    var num = countDishes($scope.dishes);
    $scope.message = getMessage(num);
    $scope.num = num;
  };

  function countDishes(dishes) {
    var count = 0;
    if (dishes) {
      var array = dishes.split(',');
      array.forEach((item) => {
        if (item != false) {
            count++;
        }
      });
    }
    return count;
  }

  function getMessage(num) {
    $scope.color='green';
    if (num === 0) {
        $scope.color='red';
        return 'Please enter data first';
    }
    else if (num <= 3) {
      return 'Enjoy!';
    } else {
      return 'Too much!';
    }
  }
}

})();
