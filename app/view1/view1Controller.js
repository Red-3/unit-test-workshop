(function() {
    'use strict';

    angular.module('myApp.view1')
    .controller('View1Controller', [
        'TodosService',
        View1Controller]);

    function View1Controller (
        TodosService
    ) {
        var vm = this;
        vm.listTitle = 'All the things';

        //Public Functions
        vm.getItems = getItems;
        vm.getAllItems = getAllItems;
        vm.getItem = getItem;
        vm._init = init;

        function init() {
            getAllItems();
        }

        /**
         * Get all available To-Do Items
         */
        function getAllItems() {
            TodosService.getTodoItems().then(function(todos) {
                vm.todos = todos;
                vm.listTitle = 'All ' + todos.length + ' things';
            });
        }

        /**
         * Get items completed or not
         * @param done - If true get completed items
         */
        function getItems(done) {
            TodosService.getTodoItems().then(function(todos) {
                vm.todos = _filterTodoItems(todos, done);
                vm.listTitle = vm.todos.length + ' things ' + (done?'Completed':'to do');
            });
        }

        /**
         * Get a specific item by id
         * @param id
         */
        function getItem(id) {
            TodosService.getTodoItem(id).then(
                function(item) {
                    vm.currentItem = item;
                },
                function(err) {
                    vm.error = err;
                }
            );
        }

        /**
         * Filter out To-Do items that are completed or pending
         * @param todoList Full list of items
         * @param completed Y or N
         * @returns {Array} Filtered list
         * @private
         */
        function _filterTodoItems(todoList, completed) {
            var todoListOut = [];
            for (var todo in todoList) {
                if (todoList[todo].completed === completed) {
                    todoListOut.push(todoList[todo]);
                }
            }
            return todoListOut;
        }

        init();

    }

}());