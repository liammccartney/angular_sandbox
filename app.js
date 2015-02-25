(function() {
  var app = angular.module('app', ['gridster', 'snap', 'ngDragDrop'])

  app.config(function(snapRemoteProvider) {
    snapRemoteProvider.globalOptions = {
      disable: 'right',
      touchToDrag: false
    }
  });

  app.controller('sideBarCtrl', ['$scope', function($scope){
    $scope.name = 'sidebar'
    $scope.items = sideItems
    $scope.addItem = function(){
      if (gridItems.length < 16) {
        gridItems.push({letter:"I"})
      };
    }
  }])

  app.controller('dashCtrl', ['$scope', function($scope){
    $scope.items = gridItems

    $scope.gridsterOpts = {
      columns: 4, // the width of the grid, in columns
      minColumns: 1, // the minimum columns the grid must have
      minRows: 2, // the minimum height of the grid, in rows
      maxRows: 4,
      defaultSizeX: 1, // the default width of a gridster item, if not specifed
      defaultSizeY: 1, // the default height of a gridster item, if not specified
      minSizeX: 1, // minimum column width of an item
      maxSizeX: null, // maximum column width of an item
      minSizeY: 1, // minumum row height of an item
      maxSizeY: null, // maximum row height of an item
      resizable: {
         enabled: false
      },
      draggable: {
         enabled: true, // whether dragging items is supported
         handle: '.my-class', // optional selector for resize handle
         start: function(event, $element, widget) {}, // optional callback fired when drag is started,
         drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
         stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
      }
    };
  }])

})();