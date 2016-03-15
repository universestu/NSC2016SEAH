var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/data';

fs = require('fs');

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('data');

    //Create some users
    var data = {node: 1 , value: "Hello"};
    
    // Insert some users
    collection.insert([data], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
      //Close connection
      db.close();
    });
  }
});



var MicroGear = require('microgear');

  const KEY = "Djmh3H2yte6CIrW";
  const SECRET = "43J9u4sJmMe34omGvLdu51JF74prLT";
  const APPID = "NSC2016SEAH";

var microgear = MicroGear.create({
    key : KEY,
    secret : SECRET
});

microgear.on('connected', function() {
    console.log('Connected...');
    microgear.setalias("Server_index");
    microgear.setname('controllerplug');
    
});


microgear.on('message', function(topic,body) {
    console.log('incoming : '+topic+' : '+body);
    console.log('insert DATA : '+body);

  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    

    // Get the documents collection
    var collection = db.collection('data');

    //Create some users
   
    var data = { "value1" : parseInt(body,10) , "time": Date.now() } ;
    
    fs.writeFile('data_light.json', JSON.stringify(data) , function (err) {
  if (err) return console.log(err);
  console.log('data.json create');
});
    collection.insert([data], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log( data);
      }
      //Close connection
      db.close();
    });
  }
});

});


microgear.on('closed', function() {
    console.log('Closed...');
});

microgear.connect(APPID);