(function() {

    'use strict';

    /**
     * Service for retrieving To-Do items
     * This service hides the REST implementation details and offers a logical API to the underlying implementation.
     *
     * @author Alan Biggs
     */

    angular.module('services')
        .service('TodosService', [
            '$http',
            '$q',
            '$cacheFactory',
            TodosService
        ]);

    function TodosService(
        $http,
        $q,
        $cacheFactory
    ) {
        var API_ROOT = 'http://jsonplaceholder.typicode.com';

        var thisService = this;

        // Public APIs
        this.getTodoItems = getTodoItems;
        this.getTodoItem = getTodoItem;

        // Function definitions

        /**
         * Retrieves a list of TO-DO items.
         * Returns the to-do items array data structure from the response.
         * @param {*} options clearCache: true|false
         * @return Function promise
         */
        function getTodoItems(options) {
            var endPoint = API_ROOT + '/todos';

            var deferred = $q.defer();

            if (options && options.clearCache) {
                //Clear out the $http cache entry based on the end-point
                var cache = $cacheFactory.get('$http');
                cache.remove(endPoint);
            }

            $http.get(endPoint, {timeout: 10000, cache: true})
                .then(
                function successHandler(response) {
                    //console.log('RESPONSE SUCCESS', response);
                    if (response.data) {
                        thisService._cachedItems = response.data;
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject('No response');
                    }
                },
                function errorHandler(response) {
                    //console.log('RESPONSE FAILURE', response);
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function getTodoItem(id) {
            var deferred = $q.defer();

            //Reject if id is not an integer
            if (!typeof id === 'number' || !((id%1) === 0)) {
                //console.log('Not an int');
                deferred.reject('id must be an integer');

            } else {

                var endPoint = API_ROOT + '/todos/' + id;

                $http.get(endPoint, {timeout: 10000})
                    .then(
                    function successHandler(response) {
                        thisService._cachedItems = response.data;
                        deferred.resolve(response.data);
                    },
                    function errorHandler(response) {
                        deferred.reject(response);
                    }
                );
            }
            return deferred.promise;
        }

    }

}());