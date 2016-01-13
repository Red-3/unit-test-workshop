(function() {

    'use strict';

    /**
     * Test suite for Todos service.
     *
     *  @author Alan Biggs
     */

    describe('TodosService', function() {

        var API_ROOT = 'http://jsonplaceholder.typicode.com';

        var service;
        var $httpBackend;
        var $cacheFactory;

        var mockTodos = [
            {
                "userId": 2,
                "id": 33,
                "title": "Todo item #33",
                "completed": true
            },
            {
                "userId": 2,
                "id": 34,
                "title": "Todo item #34",
                "completed": false
            }
        ];

        var additionalTodo = {
            "userId": 2,
            "id": 35,
            "title": "Todo item #35",
            "completed": false
        };

        beforeEach(module('services'));

        beforeEach(inject(function (_$http_, _$httpBackend_, _$cacheFactory_, $injector) {

            // Set up the mock http service responses
            $httpBackend = _$httpBackend_;
            $cacheFactory = _$cacheFactory_;
            service = $injector.get('TodosService');

            _$http_.defaults.headers.common = null;
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();

        });

        describe('getTodoItems', function() {

            it('will get all todo items', function() {

                $httpBackend.expectGET(API_ROOT + '/todos').respond(200, mockTodos);

                service.getTodoItems().then(
                    function(result) {
                        expect(result).toEqual(mockTodos);
                    }
                );

                $httpBackend.flush();

            });

            //it('will raise an error if there was a problem on the server', function() {
            //
            //    $httpBackend.expectGET(API_ROOT + '/todos').respond(500);
            //
            //    service.getTodoItems().then(undefined, function(err) {
            //        expect(err.status).toBe(500);
            //    });
            //
            //    $httpBackend.flush();
            //
            //});

            //it('will raise an error if there is no response (e.g. timeout condition)', function() {
            //
            //    $httpBackend.expectGET(API_ROOT + '/todos').respond(undefined);
            //
            //    service.getTodoItems().then(function(result) {
            //        expect(result).toBeUndefined();
            //    });
            //
            //    $httpBackend.flush();
            //
            //});
        });

    });
}());
