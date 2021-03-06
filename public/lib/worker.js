self.onmessage = function(e){
  let msg = e.data,
      currcost = 100;
  
  let model = new TSNE({
  dim: msg.dim || 2,
  perplexity: msg.perplexity || 100.0,
  earlyExaggeration: msg.earlyExaggeration || 4.0,
  learningRate: msg.learningRate || 100.0,
  nIter: msg.nIter || 500,
  metric: msg.metric || 'euclidean'
  });


var max_val = 1

function getMaxKey(n)
{
  d = {}
  for (i in msg.data)
  {
      //console.log(msg.data[i])
      tab = Object.keys(msg.data[i]).map(function(key){if (key != "index" &&
                                                            key != "x" && key != "vx" &&
                                                            key != "y" && key != "vy" &&
                                                            key != "id" && key != "sorte" &&
                                                            key != "score" && key != "scoreLabel" &&
                                                            key != "rna_id" &&
                                                            key != "position" && key != "erreur" &&
                                                            key != "u_id" && key != "idTab" &&
                                                            key != "nts_detail" && key != "scoreTab" &&
                                                            key != ""){return Number(msg.data[i][key])}else{return 0}})
      //console.log(tab)
      m = Math.max.apply(null,tab)
      //console.log("m",m)
      if (max_val < m ){
        //console.log("max_val change : ",m);
        max_val = m
      }
      for (key in msg.data[i])
      { 
        actual = Number(msg.data[i][key])
        
        
        if (key != "index" && key != "x" &&
            key != "vx" && key != "y" &&
            key != "vy" && key != "id" &&
            key != "sorte" && key != "score" &&
            key != "scoreLabel" &&
            key != "rna_id" && key != "position" &&
            key != "erreur" && key != "u_id" && 
            key != "idTab" && key != "nts_detail" && 
            key != "scoreTab" && key != ""){
          if(key in d){
            d[key] = d[key] + actual
          }
          else{
              d[key] = actual
            }
         }
      }
  }
  var sortable = [];
  for (var key in d) {
      sortable.push([key, d[key]]);
  }

  sortable.sort(function(a, b) {
      return b[1]-a[1];
  });
  //console.log(sortable[0])
  keysSorted = sortable.map(x => x[0])
  //console.log(keysSorted)
  return keysSorted.slice(0,n)
}

keysSorted1 = getMaxKey(30)
console.log("keysSorted!") 
console.log(keysSorted1) 
tabOfTab = []

for (di in msg.data)
{
  tabOfTab[di] = []
  d = msg.data[di]
  for (key in keysSorted)
  {
    tabOfTab[di].push(d[keysSorted[key]])

  }
}
console.log("max_val")
console.log(max_val)

 model.init({
  data: tabOfTab,
  type: 'dense'
 });

 model.on('progressData', function(pos){
  self.postMessage({pos: model.getOutputScaled()});
 });

 model.on('progressIter', function (iter) {
  currcost = currcost * 0.9 + iter[1];
  self.postMessage({
    iterations: iter[0],
    cost: iter[1],
    stop: currcost < 20
   });
  });
 
  let run = model.run();

  self.postMessage({
    err: run[0],
    iterations: run[1],
    stop: true
  });

};