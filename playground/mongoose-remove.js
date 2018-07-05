const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} =  require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove({}) --removes everything from the collection

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({})

Todo.findOneAndRemove({_id:'5b3df65def92c2cb70498e9e'}).then((todo) => {
    console.log(todo);
});
//Todo.findByIdAndRemove()
Todo.findByIdAndRemove('5b3df65def92c2cb70498e9e').then((todo) => {
    console.log(todo);
});