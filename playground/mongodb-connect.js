//mongo client

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


//we can incorporate object ID's wherever we like using object destructuring
// var obj = new ObjectID();

// console.log(obj);

//Object Destructuring lets you pull out properties of an object


MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',{useNewUrlParser:true}, (err, client) => {
    if(err) {
        //return prevents the function from executing
       return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert Todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));

    // });

    //Insert new doc into the Users Collection (name, age, location)

    // db.collection('Users').insertOne({
    //     name:'Silas',
    //     age:25,
    //     location:'Houston'
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert User', err)
    //     }

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    // });

    client.close();
});