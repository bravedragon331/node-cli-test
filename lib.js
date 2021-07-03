const https = require('https');

var loadHistory = async function (start, end, base, symbol) {
    return new Promise((resolve, reject) => {
        https.get(`https://api.frankfurter.app/${start}..${end}?from=${base}&to=${symbol}`, (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(JSON.parse(data))
            });

        }).on("error", (err) => {
            reject(err);
        });
    })
};

var convert = async function (date, base, symbol, amount) {
    return new Promise((resolve, reject) => {
        https.get(`https://api.frankfurter.app/${date}?amount=${amount}&from=${base}&to=${symbol}`, (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(JSON.parse(data))
            });

        }).on("error", (err) => {
            reject(err);
        });
    })
}

module.exports = {
    loadHistory, convert
}