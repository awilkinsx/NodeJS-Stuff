/**
 * Express setup used to test cluster and worker threads
 */
process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');
const express = require('express');
const crypto = require('crypto');

// Is the file being executed in master mode
if (cluster.isMaster) {
    console.log('Master up');
    // Cause server.js to be executed again but in child mode
    cluster.fork();
    cluster.fork();
} else {
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
};