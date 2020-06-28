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
      for (var idx in array) {
        if (array[idx].trim().length != 0) {
          count++;
        }
      }
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

  function bgColor() {
    if (num === 0) {
      return 'background-color: red';
    }
    else 
        return 'background-color: green';
  }
}

})();
