const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const options = {
        method: 'GET',
        hostname: 'latest-mutual-fund-nav.p.rapidapi.com',
        port: null,
        path: '/latest?Scheme_Type=Open',
        headers: {
            'x-rapidapi-key': '213e739d75msh60c95be7cf3b135p1c0988jsnf111eb40091f',
            'x-rapidapi-host': 'latest-mutual-fund-nav.p.rapidapi.com'
        }
    };

    const apiReq = https.request(options, function (response) {
        const chunks = [];

        response.on('data', function (chunk) {
            chunks.push(chunk);
        });

        response.on('end', function () {
            const body = Buffer.concat(chunks);
            const mutualFunds = JSON.parse(body.toString());
            // res.render('mutualFunds', { mutualFunds });
            res.send(mutualFunds);
        });
    });

    apiReq.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    apiReq.end();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});