'use strict';

describe('myApp.view1 module', function() {

  var scope, ctrl, TodosService, $q;

  var mockTodos = [
    {
      "userId": 2,
      "id": 32,
      "title": "Todo item #32",
      "completed": true
    },
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

  var additionalTodos = [
    {
      "userId": 2,
      "id": 35,
      "title": "Todo item #35",
      "completed": false
    },
    {
      "userId": 2,
      "id": 36,
      "title": "Todo item #36",
      "completed": true
    }
  ];

  beforeEach(module('myApp.view1'));

  beforeEach(inject(function($controller, $rootScope, _$http_, _$q_, _TodosService_) {

        $q = _$q_;

        var stubTodosService = {
            getTodoItems: function(options) {
                var deferred = $q.defer();

                if (options && options.badRequest) {
                  deferred.reject('mockErrorMessage');
                } else if (options && options.clearCache) {
                  deferred.resolve(additionalTodos);
                } else {
                  deferred.resolve(mockTodos);
                }

                return deferred.promise;
            },
            getTodoItem: function(id) {
                var deferred = $q.defer();
                if (typeof id === 'string' || !id) {
                    deferred.reject('Bad param');
                } else {
                    deferred.resolve(mockTodos[0]);
                }
                return deferred.promise;
            }
        };

        scope = $rootScope.$new();
        ctrl = $controller('View1Controller', {$scope: scope, TodosService: stubTodosService});
    })
  );

  describe('View1Controller', function(){

    it ('should initialize the controller with the Todo items', function() {
        expect(ctrl.todos).toBeUndefined();
        //Init calls to get the To-do items from the service
        scope.$apply();
        expect(ctrl.todos).toBe(mockTodos);
    });

    describe('getAllItems', function() {
        it('should get all the Todo Items', function () {
            ctrl.getAllItems();
            scope.$apply();
            expect(ctrl.todos).toBe(mockTodos);
        });
    });

    describe('getItems', function() {
        it('should get the completed Todo items', function () {
            ctrl.getItems(true);
            scope.$apply();
            expect(ctrl.todos.length).toBe(2);
        });

        it('should get the uncompleted Todo items', function () {
            ctrl.getItems(false);
            scope.$apply();
            expect(ctrl.todos.length).toBe(1);
        });
    });

    describe('getItem', function() {
        it('should get the specific item', function () {
            ctrl.getItem(1);
            scope.$apply();
            expect(ctrl.currentItem).toBe(mockTodos[0]);
        });

        it('should return an error if id is not an integer', function () {
            ctrl.getItem('eh');
            scope.$apply();
            expect(ctrl.error).toBe('Bad param');
        });

        it('should return an error if no id specified', function () {
            ctrl.getItem();
            scope.$apply();
            expect(ctrl.error).toBe('Bad param');
        });
    });

  });
});