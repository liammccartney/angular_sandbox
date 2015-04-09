var findModelID = function(parentId){
  return $.grep(Object.keys(Bokeh.index), function(k){
    return Bokeh.index[k].el.id === parentId
  })
}
// Used to recursively search Bokeh.index
var findViewObject = function(el, currentNode){
  if (el == currentNode.el ) {
    return currentNode;
  }
  else {
    for(key in currentNode.views){
      currentChild = currentNode.views[key]
      result = findViewObject(el, currentChild);
      if (result !== false){
        return result
      }
    }
    return false;
  }
}