
/*
function colores_google(n) {
  var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
  return colores_g[n % colores_g.length];
}
*/
function colores_google(n) {
  var colores_g = ["blue","yellow","red"];
  return colores_g[n % colores_g.length];
}

var colorTranslator = {}

colorTranslator["Hi"] = colores_google(0)
colorTranslator["Bg"] = colores_google(1)
colorTranslator["Low"] = colores_google(2)


const width_tsne = +$("#tsne_svg").width();
const heigth_tsne = +$("#tsne_svg").height();


var x_tsne = d3.scaleLinear()
    .domain([-200, 200])
    .range([0, width_tsne])

var y_tsne = d3.scaleLinear()
    .domain([-200, 200])
    .range([0, heigth_tsne])
    
const maxIter = 500,
    area = d3.area()
       .x((d,i) => i)
       .y0(heigth_tsne+90)
       .y1((d,i) => heigth_tsne + 90 - parseInt(3 * d||0));

var array2 = []
var data = []
var config = {
    delimiter: ",",  // auto-detect
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
  maxValue: 1,
  levels: 5,
  small: false,
  roundStrokes: true,
  color: color
};


var radarChartOptions1 = {
  w: 100,
  h: 100,
  margin: {top: 10, right: 10, bottom: 10, left: 10},
  maxValue: 1,
  levels: 5,
  small: true,
  roundStrokes: true,
  color: color
};

var radarCount = 0

function drawChart(d){
  url = window.location.href + d.rna_id +"|"+d.position
  //window.open(url,"_blank","width=2000,height=1000")
  radarCount += 1
  radarCount_actual = radarCount
  //console.log("drawChart : data",d)
  var clone = Object.assign({}, d);
  delete clone.scoreLabel;
  dScores = Object.keys(clone).map(function(k) { return Number(clone[k]) });
  max = Math.max.apply(Math,dScores)

  dTest = Object.keys(clone).map(function(key) { if (key != "index" &&
                                                      key != "x" &&
                                                      key != "vx" &&
                                                      key != "y" &&
                                                      key != "vy" &&
                                                      key != "id" &&
                                                      key != "sorte"  &&
                                                      key != "scoreLabel" &&
                                                      key != "score" &&
                                                      key != "rna_id" &&
                                                      key != "position" &&
                                                      key != "erreur" &&
                                                      key != "u_id" && 
                                                      key != "nts_detail" &&
                                                      key != "idTab" &&
                                                      key != "scoreTab"&&
                                                      key != "") 
                                      return {"axis":key,"value":Number(clone[key])} });

  array = dTest.filter(n => n)
  if(svgRadarSm){
    svgRadarSm.remove()
  }
  var svgRadarSm = d3.select("#_"+d.rna_id.replace(":","") +"_"+d.position+"_radar")
  RadarChart(svgRadarSm, [array], radarChartOptions1,colorTranslatorF(d.scoreLabel));

}

function drawChartToolTip(d,svg){
  url = window.location.href + d.rna_id +"|"+d.position
  //window.open(url,"_blank","width=2000,height=1000")
  radarCount += 1
  radarCount_actual = radarCount
  //console.log("drawChart : data",d)
  var clone = Object.assign({}, d);
  delete clone.scoreLabel;
  dScores = Object.keys(clone).map(function(k) { return Number(clone[k]) });
  max = Math.max.apply(Math,dScores)

  dTest = Object.keys(clone).map(function(key) { if (key != "index" &&
                                                      key != "x" &&
                                                      key != "vx" &&
                                                      key != "y" &&
                                                      key != "vy" &&
                                                      key != "id" &&
                                                      key != "sorte"  &&
                                                      key != "scoreLabel" &&
                                                      key != "score" &&
                                                      key != "rna_id" &&
                                                      key != "position" &&
                                                      key != "erreur" &&
                                                      key != "u_id" && 
                                                      key != "nts_detail" &&
                                                      key != "idTab" &&
                                                      key != "scoreTab"&&
                                                      key != "") 
                                      return {"axis":key,"value":Number(clone[key])} });

  array = dTest.filter(n => n)
  
  var svgRadarSm = svg
  return RadarChart(svgRadarSm, [array], radarChartOptions1,colorTranslatorF(d.scoreLabel));

}

var insertMeansChartSelection = function(mP){


    meansProfil = mP
    strToPost = JSON.stringify(meansProfil)
     $.post("http://majsrv1.iric.ca:3000/test",{"meansProfil": strToPost}, function(data){
            if(data === 'done')
              {
                alert("test success");
              }
          });
}

function drawProfilChart(p){
  
  console.log("drawProfilChart : data",p)
  var clone = Object.assign({}, p);
  delete clone.scoreLabel;
  dScores = Object.keys(clone).map(function(k) { return Number(clone[k]) });
  max = Math.max.apply(Math,dScores)

  dTest = Object.keys(clone).map(function(key) { if (key != "index" && key != "x" &&
                                                      key != "vx" && key != "y" &&
                                                      key != "vy" && key != "id" &&
                                                      key != "sorte"  && key != "scoreLabel" &&
                                                      key != "score" && key != "rna_id" &&
                                                      key != "position" && key != "idTab" &&
                                                      key != "scoreTab" && key != "erreur" &&
                                                      key != "u_id" && key != "nts_detail") return {"axis":key,"value":Number(clone[key])} });

  array = dTest.filter(n => n)
  
  
  insertMeansSelection = function()
  { insertMeansChartSelection(p) }
  
  
  var svgRadar = d3.select("body").append("svg").attr("width",400).attr("height",400).attr("id","svgRadarProfil").attr("class","selp")
  
  RadarChart(svgRadar, [array], radarChartOptions,"-");
  svgRadar.append("rect")
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("x", 20 -12.5)
    .attr("y", 350 -12.5)
    .attr("width", 25)
    .attr("height", 25)
    .style("fill", colorRtoB(p.scoreLabel))
	.on("click",insertMeansSelection);
}

function shuffle(array) {
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

var rectangleS_size = 20

var svgClick = function(){
  //console.log("click")
  var coordinates = [0, 0];
  coordinates = d3.mouse(this);
  var x_coord = coordinates[0];
  var y_coord = coordinates[1];
  console.log("click",x_coord,y_coord)
  svg_p = d3.select("body").select("#tsne_svg")
  svg_p.selectAll("#selectionRect").remove()
  
  svg_p.insert("rect",":first-child")
        .attr("id", "selectionRect")
        .attr("x", x_coord -rectangleS_size/2 )
        .attr("y", y_coord -rectangleS_size/2 )
        .attr("width", rectangleS_size)
        .attr("height", rectangleS_size)
        .attr("fill", "teal")
        .attr("opacity", 0.3);
  selection = svg_p.selectAll('circle').filter(function(d){
        if((x_tsne(d.x) < x_coord+rectangleS_size/2) && (x_tsne(d.x) > x_coord-rectangleS_size/2) && (y_tsne(d.y) < y_coord+rectangleS_size/2) && (y_tsne(d.y) > y_coord-rectangleS_size/2)){return true}
        else{return false}
        })
  
  
  //id = selection.map(function(d){return d.__data__.id})
  hi = selection.filter(function(d){return d.scoreLabel == "Hi"})
  low = selection.filter(function(d){return d.scoreLabel == "Low"})
  bg = selection.filter(function(d){return d.scoreLabel == "Bg"})
  
  
  divSelection = d3.select('body').append('div').style("cursor","pointer")
  d3.select("body").selectAll(".selp").remove()
  drawProfilChart(calculOneProfil(selection.data()))
  divSelectionDiv = divSelection.selectAll(".selp").data(selection.data()).enter().append("div").attr("class","selp")
                    .style("display", "inline-block")
                    .on("click", function(d) { window.open(window.location.href + d.rna_id +"|"+d.position); })
  
  divSelectionDiv.append("p").text(function(d){return d.rna_id +"|"+d.position}); 
  divSelectionDivSvg = divSelectionDiv.append("svg").attr("width",20).attr("height",20).attr("id",function(d){return d.rna_id +"|"+d.position})
  
                      
  divSelectionDivSvg2 = divSelectionDiv.append("svg").attr("width",120).attr("height",120).attr("id",function(d){return "_"+d.rna_id.replace(":","") +"_"+d.position+"_radar"})
  divSelectionDivSvg2.each(drawChart)
  
  
  console.log("hi",hi.size())
  console.log("low",low.size())
  console.log("bg",bg.size())
  console.log("ratio",ratio_hi_on_low(hi.size(),low.size()))
  //console.log("id",id)
  console.log("Selection : ",selection)
  d3.select("body").selectAll("#ratio").remove()
  d3.select("body").append("p")
              .style("font-size", "20px")
              .attr("id", "ratio")//easy to style with CSS
              .text("Ratio Hi on Low : "+ratio_hi_on_low(hi.size(),low.size()));
}



var jsonProfils = null
var jsonProfils2 = null
var ratio_hi_on_low = function(hi,low){if(low > 0){return hi/low}else{return "hi : "+hi+" | no Low"}}
var data1 = null
var circles = null

function getMeansP(d)
{
 return  JSON.parse(d["meansProfil"])
}


isC = function(key){
  if (key != "index" && key != "x" &&
      key != "vx" && key != "y" &&
      key != "vy" && key != "id" &&
      key != "sorte"  && key != "scoreLabel" &&
      key != "score" && key != "rna_id" &&
      key != "position" && key != "idTab" &&
      key != "scoreTab" && key != "erreur" &&
      key != "u_id" && key != "nts_detail" && key !=  ""){ 
    //console.log(key)
    
    return 1}
  else {return 0}
};


var myDistance = function(p,d1){
  tab = []
  //console.log(p)
  for (key in p){
      if(isC(key)){
        c = (p[key]-d1[key])*(p[key]-d1[key])
        //console.log("c : "+c)
        tab.push(c)
      }
  }
  var sum = tab.reduce((a, b) => a + b, 0)
  d = Math.sqrt(sum)
  console.log(d)
  return d
}

var filterForC = function(d1) { 
  for (p in jsonProfils2){
    di = myDistance(jsonProfils2[p],d1)
    if (di < 0.5){
      jsonProfils2[p].nts_detail.push(d1)
      return false}
  }
  return true
}

var jqxhr = function(){
  $.get( "http://majsrv1.iric.ca:3000/delete_all", function() {
    //alert( "success" );
  })
    .done(function() {
      //alert( "second success" );
    })
    .fail(function() {
      alert( "error" );
    })
    .always(function() {
      //alert( "finished" );
    });
}

var getHi = function(d){
  if(d["scoreLabel"] == "Hi"){
   return 1 
  }
  else{return 0 }
}

var getLow = function(d){
  if(d["scoreLabel"] == "Low"){
   return 1 
  }
  else{return 0 }
}

var colorRtoB = d3.scaleLinear()
        .range(["red", "blue"])
        .domain([-1, 1]);

var hiOrLow = function(tab){        
  h = tab.map(getHi).reduce((a, b) => a + b, 0);
  l = tab.map(getLow).reduce((a, b) => a + b, 0);
  return (h - l)/tab.length
}

var colorTranslatorF = function(x1){

  if(x1 in colorTranslator){
     return colorTranslator[x1]
  }
  else{
    return colorRtoB(x1)
  }
}

var svg_tt = null

var ttShow = function(d)
{
  console.log("showtt",d.x,d.y)
   svg_tt = d3.select("body").insert("svg").attr("width",400).attr("height",400).attr("id","tooltip_svg")
      .style('position', 'absolute')
      .style('opacity', 1)
      .style('pointer-events', 'all')
      .style("top",30)
      .style("left",30)
   
   drawChartToolTip(d,d3.select("#tooltip_svg"))
   
}

var ttHide = function(d)
{
   //d3.select("body").select("#tooltip_svg").remove()
}

/*
var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html();
*/    
//function(d) { console.log(d);return "!"; }
//     
function launchTsne(){
  
  d3.json("http://majsrv1.iric.ca:3000/data1",function(err,data2){


  //jsonProfils = data2["meansProfil"]
  
  jsonProfils2 = data2.map(getMeansP)
  
 
  
  //jQuery.get('/js_eterna/sample.csv', function(data) {
  jQuery.get('/CSV/experience_16_nov_2017_mfeNcm_mcff.csv', function(data) {
	  console.log("test")
  //jQuery.get('/js/SmallRNA__DMS_smallParsed_sssaa_eq_DMS_all_extended.csv', function(data) {
	  array2 = Papa.parse(data,config);
	  //array2.data = array2.data.filter(function(d){return d.id != "Bg"})
	  array2.data = array2.data.filter(function(d){return d.sorte == "G"})
      //array2.data = array2.data.filter(function(d){return d["2_2_so"] > 0.9})
      //array2.data = array2.data.filter(function(d){return d["2_2_mcff"] > 0.9})
      hi = []
      low = []
      while(hi.length + low.length <= 500){
        hi_t = shuffle(array2.data.filter(function(d){return d.scoreLabel == "Hi"})).slice(0,250)
        low_t =  shuffle(array2.data.filter(function(d){return d.scoreLabel == "Low"})).slice(0,250)
        low = low.concat(low_t.filter(filterForC))
        hi = hi.concat(hi_t.filter(filterForC))
      }
      jqxhr()
      for (p in jsonProfils2){
          insertMeansChartSelection(jsonProfils2[p])
      }
      for (p in jsonProfils2){
          jsonProfils2[p]['scoreLabel'] = hiOrLow(jsonProfils2[p]['nts_detail'])
      }
       
	  array2.data = hi.concat(low).concat(jsonProfils2)
	  console.log("array2 : ",array2 )
	  //array2.data = shuffle(array2.data).slice(0,500)
	d3.queue()
	  .defer(d3.text, 'lib/tsne.min.js')
	  .defer(d3.text, 'lib/worker.js')
	  .await(function (err, t, w) {

		  const worker = new Worker(window.URL.createObjectURL(new Blob([t + w], {
			  type: "text/javascript"
		  })));
		  //const data = d3.range(300).map(d => [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
		  //const data = array2.map(d => [d.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
		  data1 = array2.data;
		  const data2 = array2.data.slice(0);
		  //console.log("data2")
		  //console.log(data2)
		  //,colorTranslator[d.id]]
		  
		  
		  var svg = d3.select('body').select("#tsne_svg")
			  .on("click",svgClick)
		  legend_data = [{"name":"Hi","color":colores_google(0)},{"name":"Bg","color":colores_google(1),},{"name":"Low","color":colores_google(2)}]
      
  /*
		  legendG = svg.append("g")
				  .data(legend_data)
				  .attr("transform", function(d,i){return "translate(" + 0 + "," + i*20 + ")"});

		  legendG.enter().append("circle")
				  .attr("cx",10)
				  .attr("cy",10)
				  .attr("r",20) 
				  .attr("fill",function(d){return d.color})                         
		  
		  legendG.enter().append("text")
				  .attr("x", 30)
				  .attr("y", 10)
				  .style("font-size", "10px")
				  .attr("fill", "#737373")
				  .text(function(d,i) { return d.name; });
  */

		  svg.selectAll(".leg").data(legend_data).enter()
				  .append("circle")
				  .attr("class","leg")
				  .attr("cx",function(d,i){return i*50+30})
				  .attr("cy",11)
				  .attr("r",10) 
				  .attr("fill",function(d){return d.color})                         
		  
		svg.selectAll(".legText").data(legend_data).enter()
				  .append("text")
				  .attr("class","legText")
				  .attr("x", function(d,i){return i*50})
				  .attr("y", 14)
				  .style("font-size", "10px")
				  .attr("fill", "#737373")
				  .text(function(d,i) { return d.name + " :"; });

		   circles = svg.selectAll('.dot')
			  .data(data1)
			  .enter()
			  .append('circle')
			  .attr('class', "dot")
			  .attr('r', function(d){if (!(d.scoreLabel in colorTranslator)){ return 10} else {return 5}})
			  .attr('stroke-width', 0.3)
			  .attr('fill', d => colorTranslatorF(d.scoreLabel))
              .attr('stroke-width', function(d){if(d.scoreLabel in colorTranslator){return 1}else{return 3}})
			  //.attr('fill', d => d3.rgb(d[0] * 256, d[1] * 256, d[2] * 256))
			  .attr('stroke', d => "black")
			  .attr('opacity', function(d){if (!(d.scoreLabel in colorTranslator)){ return 1} else {return 0.2}})
              .on('mouseover', ttShow)
              .on('mouseout', ttHide);

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
			  .attr('cx', d => x_tsne(d.x))
			  .attr('cy', d => y_tsne(d.y));
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
	  
	  });


  });
 })
}
