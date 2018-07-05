const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} =  require('./../models/todo');


const todos = [{text:'Walk the dog'} , {text: 'second test todo'}];

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

    })
})