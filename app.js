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
        gridItems.push({
          id:"123456789",
          js_src:"js/line_2.js",
          sizeX: 4,
          sizeY: 4
      })
      };
    }
  }])

  app.controller('dashCtrl', ['$scope', function($scope){

    $scope.items = gridItems

    $scope.gridsterOpts = {
      columns: 8,
      margins: [10, 10],
      pushing: false,
      minColumns: 1, // the minimum columns the grid must have
      minRows: 2, // the minimum height of the grid, in rows
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
         enabled: false
      }
    };

    $scope.rearrangeGrid = function(){
      if (this.gridsterOpts.draggable.enabled == true) {
        this.gridsterOpts.draggable.enabled = false
        this.gridsterOpts.pushing = false
      }
      else{
        this.gridsterOpts.draggable.enabled = true
        this.gridsterOpts.pushing = true
      }
    }

    $scope.sizeElements = function(){
      for (key in Bokeh.index){
        for (plotId in Bokeh.index[key].views){
          $parent = $("#"+Bokeh.index[key].el.id)
          Bokeh.index[key].views[plotId].canvas._set_dims([$parent.width()-25, $parent.height()-25])
        }
      }
    }

    $scope.$watch(function(){return Bokeh.Collections("Plot").models.length}, function(){$scope.sizeElements()})

    $scope.$on('gridster-resized', function(event){
      $scope.sizeElements()
    });
  }])

})();