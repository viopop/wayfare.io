angular.module('truncate', [])
.filter('characters', function () {
    return function (input, chars, breakOnWord) {
        if (isNaN(chars)) return input;
        if (chars <= 0) return '';
        if (input && input.length > chars) {
            input = input.substring(0, chars);

            if (!breakOnWord) {
                var lastspace = input.lastIndexOf(' ');
                //get last space
                if (lastspace !== -1) {
                    input = input.substr(0, lastspace);
                }
            }else{
                while(input.charAt(input.length-1) === ' '){
                    input = input.substr(0, input.length -1);
                }
            }
            return input + '...';
        }
        return input;
    };
})
.filter('words', function () {
    return function (input, words) {
        if (isNaN(words)) return input;
        if (words <= 0) return '';
        if (input) {
            var inputWords = input.split(/\s+/);
            if (inputWords.length > words) {
                input = inputWords.slice(0, words).join(' ') + '...';
            }
        }
        return input;
    };
});

angular.module("WayfareApp", ['truncate']).config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[').endSymbol(']}');
}]);

angular.module('WayfareApp').controller("ContactFormController", ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
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

angular.module("WayfareApp").filter('linebreaks', function() {
  return function(text) {
    return text.replace(/\n/g, '<br>');
  };
});

angular.module('WayfareApp').factory('TicketLeap', ['$http', function($http) {
  return function() {
    return $http.jsonp("http://public-api.ticketleap.com/organizations/wayfare/events?key=7331436096006273&page_size=50&callback=JSON_CALLBACK")
  };
}]);

angular.module("WayfareApp").controller("EventsController", ['$scope', 'TicketLeap', function($scope, TicketLeap) {
  $scope.events = [];
  TicketLeap().success(function(data) {
    $scope.events = data.events;
  }).error(function() {
    console.log("Error loading events");
  });
  $scope.convertToDate = function(date) {
    return Date.parse(date);
  }
  $scope.sortDate = function(event) {
    return Date.parse(event.earliest_start_local);
  }
  $scope.pastEvents = function(value, index) {
    if ($scope.convertToDate(value.earliest_start_local) < (new Date())) {
      return true;
    }
  }
  $scope.futureEvents = function(value, index) {
    if ($scope.convertToDate(value.earliest_start_local) >= (new Date())) {
      return true;
    }
  }
}]);


angular.module("WayfareApp").factory('Instagram', ['$http', function($http) {
  return function() {
    return $http.jsonp("https://api.instagram.com/v1/users/self/media/recent?access_token=1132399196.5c5985b.a93eb21d79f843e6964d05839c4b2d21&client_id=5c5985b918f54be8ae355517c35b40f6&callback=JSON_CALLBACK")
  }
}]);

angular.module("WayfareApp").controller("PhotosController", ['$scope', 'Instagram', function($scope, Instagram) {
  $scope.photos = [];
  Instagram().success(function(data) {
    $scope.photos = data.data;
  }).error(function() {
    console.log("Error loading Instagram");
  });
}]);
