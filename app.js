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

    $scope.addItem = function(index){
      if (gridItems.length < 16) {
        gridItems.push(sideItems[index])
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
      var plots = Bokeh.Collections("Plot")
      var plotContexts = Bokeh.Collections("PlotContext")
      plotContexts.each(function(plotContext){
        var plotContextView = Bokeh.index[plotContext.id]
        var plotsToSize = plots.filter(function(e){return e.attributes.doc === plotContext.attributes.doc})
        plotsToSize.forEach(function(p){
          p.set("plot_width", $(plotContextView.el).width() - 25 )
          p.set("plot_height", $(plotContextView.el).height() -25 )
        })
      })

      var dataTableElements = $(".bk-data-table")
      dataTableElements.each(function(index, tableElement){
        var modelId = findModelID($(tableElement).closest(".plotdiv")[0].id)
        var dataTableView = findViewObject(tableElement, Bokeh.index[modelId])
        dataTableView.model.attributes.width = dataTableView.$el.closest('.plotdiv').width() - 25
        dataTableView.model.attributes.height = dataTableView.$el.closest('.plotdiv').height() - 40
        dataTableView.render()
        console.log('data table resized!')
      })
    }

    $scope.$watch(function(){return Bokeh.Collections("Plot").models.length}, function(){$scope.sizeElements()})

    $scope.$on('gridster-resized', function(event){
      $scope.sizeElements()
    });
  }])

})();