process.env.UV_THREADPOOL_SIZE = 3;
const crypto = require('crypto');

const start = Date.now();
const iterations = 4

function runTest () {
    for (i=0; i < iterations; i++) {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            console.log('1: ', Date.now() - start);
        });
    }
}

runTest();
