exports.render = function(req, res) {
    res.render('indexTsne', {
        title: 'Tsne World'
    })
};

exports.render2 = function(req, res) {
	tab = req.params.id.split("|")
      if(tab.length == 3){
      res.render('indexRNA', {
          folder:tab[0],
          id: tab[1],
          pos: tab[2]
      })
      
    }
    else{
     res.render('indexRNA_gen', {
       id: tab[0],
       pos: tab[1]
    }) 
      
    }
};
exports.renderRNA_gen = function(req, res) {
	tab = req.params.id.split("|")
    res.render('indexRNA_gen', {
        id: tab[0],
    })
};
exports.renderIndexStruct = function(req, res) {
	tab = req.params.id.split("|")
    res.render('indexStruct', {
        id: tab[0],
    })
};

exports.renderNcm_mcff = function(req, res) {
    MongoClient.connect(connectionUrl, function(err, db) {
    console.log("Connected correctly to server");
    var collection = db.collection('ncmRdat2_10');
    cursor = collection.find({"ncm":req.params.id,"soft":"mcff"})
    var data = null
    //
    cursor.toArray(function(err, results) {res.send(results)})
  })
};

exports.renderNcm_so = function(req, res) {
    MongoClient.connect(connectionUrl, function(err, db) {
    console.log("Connected correctly to server");
    var collection = db.collection('ncmRdat2_10');
    cursor = collection.find({"ncm":req.params.id,"soft":"so"})
    var data = null
    //
    cursor.toArray(function(err, results) {res.send(results)})
  })
};


var assert = require('assert');
var connectionUrl = 'mongodb://localhost:27027/rdvTest'
var MongoClient = require('mongodb').MongoClient;

exports.insertR = function(ob){
  MongoClient.connect(connectionUrl, function(err, db) {
    console.log("Connected correctly to server");
    insertDocument(db, function() {
        db.close();
    },ob);
    db.close();
  })
} 

var delAll = function(db, callback) {
    db.collection('adeninerb').remove({})
};

exports.delA = function(ob){
  MongoClient.connect(connectionUrl, function(err, db) {
    console.log("Connected correctly to server");
    delAll(db, function() {
        db.close();
    });
    db.close();
  })
}      
exports.importData = function(response){
  MongoClient.connect(connectionUrl, function(err, db) {
    console.log("Connected correctly to server");
    var collection = db.collection('adeninerb');
    cursor = collection.find()
    var data = null
    //
    cursor.toArray(function(err, results) {response.send(results)})
  })
} 
