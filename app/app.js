Bokeh.set_log_level('warn')

var app = angular.module('app', ['gridster', 'snap', 'ngDragDrop'])

app.config(function(snapRemoteProvider) {
  snapRemoteProvider.globalOptions = {
    disable: 'right',
    touchToDrag: false
  }

});

app.controller('sideBarCtrl', ['$scope', '$rootScope', 'gridItemsService', 'getAvailableViews', function($scope, $rootScope, gridItemsService, getAvailableViews){
  $scope.name = 'sidebar'
  getAvailableViews.success(function(data){
    $scope.items = data
  })
  console.log($scope.items)
  $scope.addItem = function(index){
    gridItemsService.prepForBroadcast($scope.items[index])
  }
}])

app.controller('dashCtrl', ['$scope', '$rootScope', 'gridItemsService', 'getAvailableViews', function($scope, $rootScope, gridItemsService, getAvailableViews){

  $scope.items = [];
  $scope.bokehPlotCount = Bokeh.Collections("Plot").length
  $scope.gridsterOpts = {
    columns: 16,
    margins: [10, 10],
    pushing: false,
    minColumns: 1,
    minRows: 2,
    defaultSizeX: 1,
    defaultSizeY: 1,
    minSizeX: 1,
    maxSizeX: null,
    minSizeY: 1,
    maxSizeY: null,
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
    })
  }

  $scope.$watch(function() {return Bokeh.Collections("Plot").length}, function(newVal, oldVal, scope){
    scope.sizeElements();
  })

  $scope.$on('gridster-resized', function(event){
    $scope.sizeElements()
  });

  $scope.$on("gridItemsPassing", function(){
    if ($scope.items.filter(function(v){return v === gridItemsService.itemToPass}).length === 0) {
      $scope.items.push(gridItemsService.itemToPass)
    };
  })

}])

app.factory('gridItemsService', ['$rootScope', function($rootScope){
  var gridItemsService = {};
  gridItemsService.itemToPass = {}
  gridItemsService.prepForBroadcast = function(item){
    this.itemToPass = item
    this.broadcastItems();
  }
  gridItemsService.broadcastItems = function(){
    $rootScope.$broadcast('gridItemsPassing')
  }
  return gridItemsService;
}])

app.factory('getAvailableViews', ['$http', function($http){
  return $http.get('/items.json')
  .success(function(data){
    return data
  }).error(function(err){
    return err
  })
}])