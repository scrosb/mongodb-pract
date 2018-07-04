
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',{useNewUrlParser:true}, (err, client) => {
    if(err) {
        //return prevents the function from executing
       return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    //{completed:false} finds all the todos that have not been completed
    // db.collection('Todos').find({
    //     _id: new ObjectID('5b3c0aae5788ca64efc58c6f')
    
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));

    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // })

    //counts the number of todos
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos Count: ${count}`);
        

    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // })

    
    db.collection('Users').find({name: 'Silas'}).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));

    }, (err) => {
        console.log('Unable to fetch todos', err);
    })

    // client.close();
});