const express = require('express');
const session = require('express-session'); // for session ids
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;

// middleware
app.use(express.json());  // Middleware to parse JSON requests
app.use(session({ // Setup express-session middleware
    secret: 'clearsignal_proto2024',    // Use a random string for production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // For development. Set to true if using HTTPS in production
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, `public`)));


app.get('/', (req, res) => {
    console.log("Session ID:", req.sessionID);

    res.sendFile(path.join(__dirname, `public`, 'sign_in.html'));
});

app.post('/sign-in', async (req, res) => {
    try {
        let data = req.body
        req.session.username = data['username']
        req.session.password = data['password']

        // auth logic here and send straight to dash board if user and pass matches
        res.send({"res": "Y"}) // redirects to GET /pref-page in the html file
    } catch(err) {
        console.log(err)
    }
})

app.get('/pref-page', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, `public`, 'prefs.html'));
    } catch(err) {
        console.log(err)
    }
})

app.post('/update-prefs', async (req, res) => {
    try {
        let data = req.body['prefs']
        req.session.prefs = data

        res.send({"res": "Y"})
    } catch(err) {
        console.log(err)
    }
})

app.get('/dashboard', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, `public`, 'dashboard.html'));
    } catch(err) {
        console.log(err)
    }
})

app.listen('3010', () => {
    console.log(`Server is running on http://localhost:3000`);
});
