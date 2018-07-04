
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',{useNewUrlParser:true}, (err, client) => {
    if(err) {
        //return prevents the function from executing
       return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

//    delete many
    // db.collection('Users').deleteMany({name:'Silas'}).then((result) => {
    //     console.log(result);
    // });

   //Delete one
//    db.collection('Todos').deleteOne({text:'Eat Lunch'}).then((result) => {
//     console.log(result);
//     });

    //Find one and update
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5b3d1c8fef92c2cb70493c3a")
    }, {
      $set:{
          name: 'Silas'
      },
      
      $inc:{age:1}
    
      },
      {
          returnOriginal:false
      }).then((result) => {
        console.log(result);
      });




   //find one and delete


   // client.close();
});