/**
 * Express setup used to test cluster and worker threads
 */
const express = require('express');
const crypto = require('crypto');

// Child instances contain server logic
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        res.send('Hello there');
    }); 
});

app.get('/fast', (req, res) => {
    res.send('This is fast');
});

app.listen(port, () => {
    console.log(`Server alive on port: ${port}`);
});