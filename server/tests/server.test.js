const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} =  require('./../models/todo');


const todos = [{
    _id:new ObjectID,
    text:'Walk the dog'
} , {
    _id:new ObjectID, 
    text: 'second test todo'
}];

//before each sets up test code to make sure the database is empty
beforeEach((done) => {
    Todo.remove({}).then(() => {
      return  Todo.insertMany(todos);
    }).then(() => {
        done();
    })
});


describe('POST /todos', () => {
    //done for async tests
    it('should create a new todo', (done) => {
        var text = 'Test Todo Text';
        //the send object will automatically transform to JSON
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        })
        
    });
    //test for bad data
    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            })
    });

});

describe('Get /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
            //no need to provide a function to end, since not doing anything asynchronous

    });
});

describe('Get /todos/:id', () => {
    it('should return todo doc', (done) => {
        //to hex string converts object id to a string
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        const samid = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${samid}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/abc123`)
            .expect(404)
            .end(done);
    });
});