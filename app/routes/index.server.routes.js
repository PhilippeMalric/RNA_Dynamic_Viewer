module.exports = function(app) {
	
	var index = require('../controllers/index.server.controller');
	

    
	function route(req,res){
	  console.log("req.params.id : ",req.params.id)
	  if(req.params.id == "indexStruct"){
		return index.renderIndexStruct(req,res)
	  }
	  
	  tab = req.params.id.split("|")
	  if(tab.length > 1 && tab[1] != "-1"){
		  return index.render2(req,res)
	  }
	 }

	function route_mcff(req,res){
      console.log("req.params.id : ",req.params.id)
      if(req.params.id.indexOf("pos") != -1){
        console.log("data : "+req.params.id)
        return index.renderNcm_mcff(req,res)
      }
     }

    function route_so(req,res){
    console.log("req.params.id : ",req.params.id)
    if(req.params.id.indexOf("pos") != -1){
      console.log("data : "+req.params.id)
      return index.renderNcm_so(req,res)
      }
    }
	 
	 
    app.post('/test',function(request,response){
      var query1=request.body.meansProfil;
      index.insertR({meansProfil:query1})
      index.render(request,response)
    });
    
    app.get('/delete_all',function(request,response){
      index.delA()
      response.send("!")
      response.status(200)
    });
    
    app.get('/data1', function(request,response){
      index.importData(response)
    })
    
    app.get('/mcff_detail/:id', route_mcff);
    app.get('/so_detail/:id', route_so);
    
    app.get('/:id', route);
	app.get('/', index.render);


};