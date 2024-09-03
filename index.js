// index.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;


const { NseIndia } = require("stock-nse-india");
const nseIndia = new NseIndia()

// Set EJS as the templating engine
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    try {
        res.render('main');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/stocks/all', async (req, res) => {
    try {
        const symbols = await nseIndia.getAllStockSymbols();
        console.log(symbols);
        res.render('all_stocks', { symbols });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/stocks/:symbol', async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const stockDetails = await nseIndia.getEquityDetails(symbol);
        // const stockDetails = await nseIndia.getEquityHistoricalData(symbol);

        console.log(stockDetails);
        res.render('stock', { stockDetails });
        // res.send(stockDetails);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/crypto/assets', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://api.coincap.io/v2/assets',
        headers: {
            'Accept-Encoding': 'gzip, deflate',
            'Authorization': 'Bearer 1a793104-d0e8-4533-a983-c0972e36c157'
        }
    };

    try {
        const response = await axios(options);
        console.log(response.data);
        res.render('crypto', response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/crypto/assets/:id', async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    res.render('graph-data', {id: id});
});



app.get('/crypto/assets/:id/historical-data', async (req, res) => {
    const id = req.params.id;
    const options = {
        method: 'GET',
        url: `https://api.coincap.io/v2/assets/${id}/history?interval=d1`,
        headers: {
            'Accept-Encoding': 'gzip, deflate',
            'Authorization': 'Bearer 1a793104-d0e8-4533-a983-c0972e36c157'
        }
    };

    try {
        const response = await axios(options);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the data.');
    }

    // res.send('hello');
});

app.get('/mutualfunds/all', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://api.mfapi.in/mf',
        headers: {
            'Accept-Encoding': 'gzip, deflate'
        }
    };

    try {
        const response = await axios(options);
        console.log(response.data);
        // res.render('mutualFunds', response.data);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});     