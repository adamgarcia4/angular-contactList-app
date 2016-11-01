var express = require('express');

var app = express();

// var mongoose = require('mongoose');
// mongoose.connect('mongodb')
var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']); //DB, Collections

app.use(express.static(__dirname + "/public")); //where to find static files.

var bodyParser = require('body-parser')


app.use(bodyParser.json());
// app.get('/', function(req, res) {
//     res.send('Hello World!');
// });


app.get('/contactList', function (req, res) {
    console.log('I recieved a get request!');

    db.contactList.find(function (err, docs) {
        // console.log(docs);
        res.json(docs);
    });
    // console.log(contactList);
    // res.json(contactList);
})

app.get('/contactList/:id', function (req, res) {
    // console.log(req.params.id);
    var id = req.params.id;
    db.contactList.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    })
})

app.post('/contactList', function (req, res) {
    console.log(req.body);
    db.contactList.insert(req.body, function (err, doc) {
        res.json(doc);
    });
})

app.delete('/contactList/:id', function (req, res) {
    // console.log('in here');
    // console.log(req.params.id);
    var id = req.params.id;
    //console.log(req.body);
    db.contactList.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    });
});

app.put('/contactList/:id', function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var num = req.body["number"];
    // console.log(id, name, email, num);

    console.log(req.body.name);
    db.contactList.findAndModify({
        query: {
            _id: mongojs.ObjectId(id)
        }
    ,
        update: {
            $set: {
                name: req.body.name,
                email: req.body.email,
                number: req.body.number
            }
        },
        new: true
    }, function (err, doc) {
            console.log('doc', doc);
            res.json(doc);
        });
});

app.listen(3000);
console.log('server running on 3000.');