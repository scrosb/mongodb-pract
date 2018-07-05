var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text:{
     type:String,
     required: true,
     minlength: 1,
     trim:true
    },
    completed:{
     type: Boolean,
     default:false
    },
    completedAt:{
     type: Number,
     default: null
    }
});

//export model

module.exports = {Todo};

//Todo model


// //Create one todo
// var newTodo = new Todo({
//     text: 'Cook Dinner',
// });

// //Saves to mongodb database
// newTodo.save().then((doc) => {
//     console.log('saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo');
// });

//save new something
// var otherTodo = new Todo({
//     text:true
// });

// otherTodo.save().then((doc) => {
//     console.log('saved todo', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Unable to save todo', e);
// });

//User
//Email