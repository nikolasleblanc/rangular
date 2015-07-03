var $q = require("q");

var $http = {
  "get": function(url) {
      var randomResponseTime = Math.floor(Math.random() * (3000 - 1000)) + 1000;
      var someResponse;
      if (url.indexOf("/api/productReviews/") >= 0) {
        someResponse = [
          {
            "reviewTitle": "My review title",
            "reviewBody": "My review body"
          },
          {
            "reviewTitle": "My other review title",
            "reviewBody": "My other review body"
          }
        ];
      }
      else
      {
        someResponse = {
          "title": "My product",
          "description": "My product description"
        };
      }
      return {
        success: function(callback) {
          setTimeout(function() {
            return callback(someResponse);
          }, randomResponseTime);
        }
      };
  }
};

var vm = this;

loadProduct(1)
  .then(function (product) {
    vm.product = product;
    console.log(vm.product);
  });

function loadProduct(productId) {
  var finalProduct = $q.defer();

  function getProductDetails() {
    var deferred = $q.defer();
    $http.get('/api/product/' + productId)
      .success(function (productData) {
        deferred.resolve(productData);
      });
    return deferred.promise;
  }

  function getProductReviews() {
    var deferred = $q.defer();
    $http.get('/api/productReviews/' + productId)
      .success(function (productReviews) {
        deferred.resolve(productReviews);
      });
    return deferred.promise;
  }

  return $q.all([getProductDetails(), getProductReviews()])
    .then(function(res) {
      return {
        product: res[0],
        reviews: res[1]
      }
    })

  return finalProduct.promise;
}