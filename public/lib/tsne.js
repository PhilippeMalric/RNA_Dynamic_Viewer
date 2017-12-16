
function colores_google(n) {
  var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
  return colores_g[n % colores_g.length];
}
function drawChart(d){
  console.log("drawChart : data",d)
  var clone = Object.assign({}, d);
  delete clone.id;
  dScores = Object.keys(clone).map(function(k) { return Number(clone[k]) });
  max = Math.max.apply(Math,dScores)

  dTest = Object.keys(clone).map(function(key) { if (key != "index" && key != "x" && key != "vx" && key != "y" && key != "vy" && key != "id") return {"axis":key,"value":Number(clone[key])/20} });

  array = dTest.filter(n => n)
  svgRadar = d3.select("#radar_svg")
  RadarChart(svgRadar, [array], radarChartOptions,d.id);

}

function shuffle2(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var array2 = []

function callTsne(svgTsne){
  var colorTranslator = {}

  colorTranslator["mcff_Hi"] = colores_google(0)
  colorTranslator["mcff_Low"] = colores_google(1)
  colorTranslator["mcff_Bg"] = colores_google(2)

  colorTranslator["so_Hi"] = colores_google(3)
  colorTranslator["so_Low"] = colores_google(4)
  colorTranslator["so_Bg"] = colores_google(5)


  const maxIter = 500,
      width = svgTsne.attr("width"),
      x = d3.scaleLinear()
      .domain([-200, 200])
      .range([0, width]),
      area = d3.area()
        .x((d,i) => i)
        .y0(width+90)
        .y1((d,i) => width + 90 - parseInt(3 * d||0));

  
  var data = []
  var config = {
      delimiter: ";",  // auto-detect
      newline: "",    // auto-detect
      quoteChar: '"',
      header: true,
      dynamicTyping: false,
      preview: 0,
      encoding: "",
      worker: false,
      comments: false,
      step: undefined,
      complete: undefined,
      error: undefined,
      download: false,
      skipEmptyLines: false,
      chunk: undefined,
      fastMode: undefined,
      beforeFirstChunk: undefined,
      withCredentials: undefined
  }



  var color = d3.scaleOrdinal()
                  .range(["#EDC951","#CC333F","#00A0B0"]);
                  
  var radarChartOptions = {
    w: 250,
    h: 250,
    margin: {top: 100, right: 10, bottom: 10, left: 80},
    maxValue: 20,
    levels: 5,
    roundStrokes: true,
    color: color
  };


  svgTest = d3.select("body").append("svg").attr("width",400).attr("height",400).attr("id","svgTest")




  jQuery.get('/js/experience_4_oct_2017__24Call_extended.csv', function(data) {
      array2 = Papa.parse(data,config);
      array2.data = shuffle2(array2.data).slice(0,500)
    d3.queue()
      .defer(d3.text, 'lib/tsne.min.js')
      .defer(d3.text, 'lib/worker.js')
      .await(function (err, t, w) {

          const worker = new Worker(window.URL.createObjectURL(new Blob([t + w], {
              type: "text/javascript"
          })));
          //const data = d3.range(300).map(d => [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
          //const data = array2.map(d => [d.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
          const data1 = array2.data
          const data2 = array2.data.slice(0)
          console.log("data2")
          console.log(data2)
          //,colorTranslator[d.id]]
          svgTsne
          const svg = svgTsne

          const circles = svg.selectAll('circle')
              .data(data1)
              .enter()
              .append('circle')
              .attr('r', 5)
              .attr('stroke-width', 0.3)
              .attr('fill', d => colorTranslator[d.id])
              //.attr('fill', d => d3.rgb(d[0] * 256, d[1] * 256, d[2] * 256))
              .attr('stroke', d => colorTranslator[d.id])
              .attr('opacity', 0.7)
              .on("click",drawChart);

          const cost = svg.append('path')
              .attr('fill', '#aaa');            

          let pos = data1.map(d => [Math.random() - 0.5, Math.random() - 0.5]);
          let costs = [];
    
          let s = 0, c = 1;

          const forcetsne = d3.forceSimulation(data1)
          .alphaDecay(0)
          .alpha(0.1)
          .force('tsne', function(alpha){
            data1.forEach((d,i) => {
              d.x += alpha * (150*pos[i][0] - d.x);
              d.y += alpha * (150*pos[i][1] - d.y);
            });
          })
          .force('collide', d3.forceCollide().radius(d => 1 + d.r))
          .on('tick', function () {
            circles
              .attr('cx', d => x(d.x))
              .attr('cy', d => x(d.y));
            //debug: show costs graph
            cost.attr('d', area(costs));
          });

          
          worker.onmessage = function (e) {
              if (e.data.pos) {
                  pos = e.data.pos;
                }
              if (e.data.iterations) { 
                costs[e.data.iterations] = e.data.cost;
              }
              if (e.data.stop) { 
                console.log("stopped with message", e.data);
                forcetsne.alphaDecay(0.02);
                worker.terminate();
              }
          };
          worker.postMessage({
              nIter: maxIter,
              // dim: 2,
              perplexity: 20.0,
              // earlyExaggeration: 4.0,
              // learningRate: 100.0,
              metric: 'euclidean',// 'manhattan', //,
              data: data2
          });
      //await end
      });

  // jquery get end
  });
}
