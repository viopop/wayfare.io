//= require vendor/jquery.backstretch.min
//= require vendor/jquery.poptrox.min
//= require vendor/jquery.equal-heights
//= require vendor/retina
//= require vendor/fotorama
//= require vendor/angular-1.3.0-rc.2.min
//= require vendor/bigslide

$(function() {
  $('.big-slide-link').bigSlide({
    menu: "#big-slide-panel",
    push: ".big-slide-push",
    side: "right",
    easyClose: true});
});

$(document).on("click", "[data-scroll-to]", function(e) {
  var scrollTo = $(e.target).data("scroll-to");
  if (!scrollTo) return;
  var targetTop = $(scrollTo).offset().top;
  var scrollOffset = $(e.target).data("scroll-offset");
  if (scrollOffset) {
    var scrollTop = targetTop + scrollOffset;
  } else {
    var scrollTop = targetTop;
  }
  $("html, body").animate({ scrollTop: scrollTop }, 650);
});


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

angular.module("WayfareApp").filter('linebreaks', function() {
  return function(text) {
    return text.replace(/\n/g, '<br>');
  };
});

angular.module("WayfareApp").filter('https', function() {
  return function(text) {
    return text.replace(/^http:\/\//, 'https://');
  };
});

angular.module('WayfareApp').factory('TicketLeap', ['$http', function($http) {
  return function() {
    return $http.jsonp("https://public-api.ticketleap.com/organizations/wayfare/events?key=7331436096006273&page_size=50&callback=JSON_CALLBACK")
  };
}]);

angular.module("WayfareApp").factory('Instagram', ['$http', function($http) {
  return function() {
    return $http.jsonp("https://api.instagram.com/v1/users/self/media/recent?access_token=1132399196.5c5985b.a93eb21d79f843e6964d05839c4b2d21&client_id=5c5985b918f54be8ae355517c35b40f6&callback=JSON_CALLBACK")
  }
}]);
