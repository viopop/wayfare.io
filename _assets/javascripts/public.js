angular.module("WayfareApp", []).config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[').endSymbol(']}');
}]).controller("ContactFormController", ['$http', '$timeout', function($http, $timeout) {
  this.contactInfo = {}
  this.submit = function() {
    $http.post("/contact.json", this.contactInfo).then(function() {
      this.submitSuccess = true;
      this.contactInfo = {}
      $timeout(function() {
        this.submitSuccess = null;
      }, 3000)
    }, function(response) {
      // Bad stuff happened
    });
  }
}]);
