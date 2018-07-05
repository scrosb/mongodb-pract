var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email:{
        type: String,
        required: true,
        trim: true,
        minlength:1
    }
  });

module.exports = {User};



  // var newUser = new User({
//     email: '    4'
// })

// newUser.save().then((doc) => {
//     console.log('saved User', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Unable to save user', e);
// })