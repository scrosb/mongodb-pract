const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const port = process.env.PORT || 3000;

let app = express();

app.use(bodyParser.json());

//resource creation
app.post('/todos', (req, res) => {
   var todo = new Todo({
    text:req.body.text
   });

   todo.save().then((doc) => {
    res.send(doc);
   }, (e) => {
    res.status(400).send(e);
   });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos,
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    // console.log(req.params.id);
    //Check if valid
    if(!ObjectID.isValid(id)){
        return res.status(404).send(' ');
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send(' ');
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send(' ');
    });
});

app.delete('/todos/:id', (req, res) => {
    //get the id
    var deleteId = req.params.id;
    //validate the ID 

    if(!ObjectID.isValid(deleteId)){
        return res.status(404).send(' ');
    }
    //remove todo by ID
    Todo.findByIdAndRemove(`${deleteId}`).then((todo) => {
        if(!todo){
            return res.status(404).send(' ');
        }

        res.status(200).send(todo);
    }).catch((e) => {
        res.status(400).send(' ');
    });


});





app.listen(port, () => {
    console.log(`Started up at port: ${port}`);
})

//export app for testing
module.exports = {app};