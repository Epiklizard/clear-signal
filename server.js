const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;

// middleware
app.use(express.json());  // Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, `public`)));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `public`, 'sign_in.html'));
});

app.get('/load', async (req, res) => {
    try {
        const chatsList = await readFiles();
        res.send({"data": chatsList})
    } catch(err) {
        console.log(err)
    }
})

app.post('/get-chat-history', async (req, res) => {
    try {
        let data = req.body
    
        res.send({'payload': data});
    } catch(err) {
        console.log(err)
    }
})


app.listen('3010', () => {
    console.log(`Server is running on http://localhost:3000`);
});
