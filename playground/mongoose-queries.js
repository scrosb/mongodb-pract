const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} =  require('./../server/models/todo');
const {User} = require('./../server/models/user');


var id = '5b3d661d86ce240eb2ab73e7';

if(!ObjectID.isValid(id)){
    console.log('Id not valid');
}

User.findById(id).then((user) => {
    if(!user) {
        return console.log('user not found');
    }
    console.log('User found', JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e);
})

// if(!ObjectID.isValid(id)){
//     console.log('Id not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// //use find one, you get back the document instead of an array of just one doc
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todos', todo);
// });

//just one doc using the ID, when the ID is incorrect it will still fire the success case
// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

