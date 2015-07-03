angular.module('product', [])
  .controller('ProductCtrl', function ProductCtrl($http, $q) {
    var vm = this;

    loadProduct(1)
      .then(function (product) {
        vm.product = product;
      });

    function loadProduct(productId) {
      var finalProduct = $q.defer();

      function getProduct() {
        var deferred = $q.defer();
        $http.get('/api/product/' + productId)
          .success(function (productData) {
            deferred.resolve(productData);
          });
        return deferred.promise;
      }

      function getProductReviews(productData) {
        var deferred = $q.defer();
        $http.get('/api/productReviews/' + productId)
          .success(function (productReviews) {
            var product = {
              product: productData,
              reviews: productReviews
            };
            deferred.resolve(product);
          });
        return deferred.promise;
      }

      getProduct()
        .then(function(productData) {
          return getProductReviews(productData);
        })
        .then(function(product) {
          return finalProduct.resolve(product);
        });

      return finalProduct.promise;
    }
});