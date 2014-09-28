angular.module("WayfareApp", []).config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[').endSymbol(']}');
}]).controller("ContactFormController", ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  $scope.contactInfo = {}
  $scope.submit = function() {
    $http.post("/contact.json", $scope.contactInfo).success(function() {
      $scope.submitSuccess = true;
      $scope.contactInfo = {}
      $timeout(function() {
        $scope.submitSuccess = null;
      }, 3000)
    }).error(function(response) {
      $scope.error = response.error;
    });
  }
}]);
