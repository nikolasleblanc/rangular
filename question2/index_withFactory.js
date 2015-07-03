angular.module('product', [])
  .factory('productService', function($http) {
    return {
      getDetails: function(id) {
        return $http.get('/api/product/' + id)
          .then(function(result){
            return result.data;
          });
      },
      getReviews: function(id) {
        return $http.get('/api/productReviews/' + id)
          .then(function(result){
            return result.data;
          });
      }
    };
  })
  .controller('ProductCtrl', function ProductCtrl($http, $q) {
    var vm = this;

    loadProduct(1)
      .then(function (product) {
        vm.product = product;
      });

    function loadProduct(productId) {
      return $q.all([productService.getDetails(productId), productService.getReviews(productId)])
        .then(function(res) {
          return {
            product: res[0],
            reviews: res[1]
          };
        });
    }
});