'use strict';

describe('myApp.view1 module', function() {

  var scope;

  beforeEach(module('myApp.view1'));

  beforeEach(
      inject(function($rootScope) {
        scope = $rootScope.$new();
      })
  );

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('View1Ctrl', {$scope: scope});
      expect(view1Ctrl).toBeDefined();
    }));

  });
});