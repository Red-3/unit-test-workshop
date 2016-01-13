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

        var successHandler = jasmine.createSpy('success');
        var errorHandler = jasmine.createSpy('error');

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

            successHandler.calls.reset();
            errorHandler.calls.reset();
        });

        describe('getTodoItems', function() {

            describe('when the data is available', function() {

                beforeEach(function() {
                    $httpBackend.expectGET(API_ROOT + '/todos').respond(200, mockTodos);
                });

                it('will get all todo items', function() {

                    service.getTodoItems().then(successHandler, errorHandler);

                    $httpBackend.flush();

                    expect(successHandler).toHaveBeenCalledWith(mockTodos);

                });

                it('will cache the todo items', function() {

                    service.getTodoItems();

                    $httpBackend.flush();

                    expect(service._cachedItems).toEqual(mockTodos);

                });

                it('will clear the cache if I ask it to', function() {
                    // We want to prove that the cache was cleared,
                    // by showing that the cache remove function was called by the function under test
                    var cache = $cacheFactory.get('$http');
                    spyOn(cache, 'remove');

                    service.getTodoItems({clearCache: true});

                    $httpBackend.flush();

                    expect(cache.remove).toHaveBeenCalledWith(API_ROOT + '/todos');
                });

            });

            it('will raise an error if there was a problem on the server', function() {

                $httpBackend.expectGET(API_ROOT + '/todos').respond(500);

                service.getTodoItems().then(successHandler, errorHandler);

                $httpBackend.flush();

                expect(errorHandler).toHaveBeenCalled();
                expect(errorHandler.calls.mostRecent().args[0].status).toBe(500);

            });

            it('will raise an error if there is no response (e.g. timeout condition)', function() {

                $httpBackend.expectGET(API_ROOT + '/todos').respond(0, undefined);

                service.getTodoItems().then(successHandler, errorHandler);

                $httpBackend.flush();

                expect(errorHandler).toHaveBeenCalled();
                expect(errorHandler.calls.mostRecent().args[0].status).toBe(0);
                expect(errorHandler.calls.mostRecent().args[0].data).toBeUndefined();
            });
        });

    });
}());
