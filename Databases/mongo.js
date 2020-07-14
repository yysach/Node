var express = require('express');
var mongo = require('mongodb');
var assert = require('assert');
var app =express();

 
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myproject';


const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }

// Use connect method to connect to the server
mongo.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
   
    const db = client.db(dbName);

    insertDocuments(db, function() {
        client.close();
    });
});
app.listen(3000,'localhost',()=>{
    console.log("listening on port 3001");
});