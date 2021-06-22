const jwt = require('jsonwebtoken');
var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const PORT = 3000;
const jwt_secret = 'tecsup2021';
var testUser = { email: 'tecsup@mail.com', password: '123456' };

app.post('/api/authenticate', function (req, res) {
    if (req.body) {
        var user = req.body
        console.log(user)
        if (testUser.email === req.body.email && testUser.password === req.body.password) {
            var token = jwt.sign(user, jwt_secret);
            res.status(200).send({
                signed_user: user,
                token: token
            });
        } else {
            res.status(403).send({
                errorMessage: 'Authorization required!'
            });
        }
    } else {
        res.status(403).send({
            errorMessage: 'Please provide email and password'
        });
    }
});

app.listen(PORT, () => { console.log('Server listening on port %s', PORT); });