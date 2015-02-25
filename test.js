Bokeh.$(function() {
  var modelid = "44aa1122-2807-4c00-926e-28ee24a6a212";
  var modeltype = "PlotContext";
  var elementid = "612f802b-5c65-4399-96f2-6a034db34a7f";
  var model = Bokeh.Collections(modeltype).get(modelid);
  var view = new model.default_view({model: model, el: '#scatter'});
  Bokeh.index[modelid] = view
});