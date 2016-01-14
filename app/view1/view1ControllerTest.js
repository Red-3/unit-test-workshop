'use strict';

describe('myApp.view1 module', function() {

    var ctrl, TodosService;

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

    beforeEach(module('myApp.view1'));

    beforeEach(inject(function($controller, _$http_, _TodosService_) {
        TodosService = _TodosService_;
        ctrl = $controller('View1Controller', {'TodosService': TodosService});
    }));

    describe('View1Controller', function(){

      it ('should initially have no todo items defined', function() {
          expect(ctrl.todos).toBeUndefined();
      });

      describe('functions getting all items from the service', function() {

          beforeEach(function() {
              spyOn(TodosService, 'getTodoItems').and.callFake(function() {
                  return {
                      //Simulate a promise - note this is NOT an async callback
                      then: function(successCallback) {
                          console.log('Fake implementation called');
                          return successCallback(mockTodos);
                      }
                  }
              });
          });

          describe('init', function() {
              it('should initialize the controller with the Todo items', function () {
                  ctrl._init();
                  expect(ctrl.todos).toBe(mockTodos);
              });
          });

          describe('getAllItems', function() {

              it('should get all the Todo Items', function () {
                  ctrl.getAllItems();
                  //NOTE: No need to call $scope.apply() since the fake promise returns immediately
                  //expect(TodosService.getTodoItems).toHaveBeenCalled();
                  expect(ctrl.todos).toEqual(mockTodos);
              });
          });

          describe('getItems', function() {
              it('should get the completed Todo items', function () {
                  ctrl.getItems(true);
                  //expect(TodosService.getTodoItems).toHaveBeenCalled();
                  expect(ctrl.todos.length).toBe(2);
              });

              it('should get the uncompleted Todo items', function () {
                  ctrl.getItems(false);
                  //expect(TodosService.getTodoItems).toHaveBeenCalled();
                  expect(ctrl.todos.length).toBe(1);
              });
          });
      });

    describe('getItem', function() {

        beforeEach(function() {
            spyOn(TodosService, 'getTodoItem').and.callFake(function(id) {
                return {
                    //Simulate a promise - note this is NOT an async callback
                    then: function(successCallback, errorCallback) {
                        console.log('Fake getTodoItem called', id);
                        if (typeof id === 'string' || !id) {
                            return errorCallback("Bad param");
                        }
                        return successCallback(mockTodos[0]);
                    }
                }
            });
        });

        it('should get the specific item', function () {
            ctrl.getItem(1);
            expect(ctrl.currentItem).toBe(mockTodos[0]);
        });

        it('should return an error if id is not an integer', function () {
            ctrl.getItem('eh');
            expect(ctrl.error).toBe('Bad param');
        });

        it('should return an error if no id specified', function () {
            ctrl.getItem();
            expect(ctrl.error).toBe('Bad param');
        });
    });

  });
});